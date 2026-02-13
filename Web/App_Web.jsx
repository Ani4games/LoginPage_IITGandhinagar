import { useState, useEffect } from "react";
import axios from "axios";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { MdQrCodeScanner } from "react-icons/md";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Success ✅");
      console.log("TOKEN:", res.data.token);

      checkToken();
    } catch (error) {
      console.log(error);
      alert("Login Failed ❌");
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");

    console.log("STORED TOKEN:", token);

    if (token) {
      alert("Token Found ✅");
    } else {
      alert("No Token ❌");
    }
  };

  const checkLogin = () => {
    const token = localStorage.getItem("token");

    if (token) {
      alert("Already Logged In ✅");
      console.log("TOKEN:", token);
    } else {
      console.log("No token found");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d9d6c3]">
      <div className="w-[350px] bg-[#F2A65A] p-6 rounded-lg shadow-lg text-center">

        <h2 className="text-xl font-semibold mb-5 text-black">
          QR INVENTORY APP
        </h2>

        {/* QR Icon */}
        <div className="bg-white p-4 rounded-lg mb-6 inline-block">
          <MdQrCodeScanner size={60} color="#333" />
        </div>

        {/* Email Input */}
        <div className="flex items-center bg-gray-300 rounded-full px-4 mb-4">
          <FiMail className="mr-2 text-gray-600" />
          <input
            type="email"
            placeholder="Email"
            className="flex-1 bg-transparent py-3 outline-none text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center bg-gray-300 rounded-full px-4 mb-4">
          <FiLock className="mr-2 text-gray-600" />
          <input
            type={secureText ? "password" : "text"}
            placeholder="Password"
            className="flex-1 bg-transparent py-3 outline-none text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setSecureText(!secureText)}>
            {secureText ? (
              <FiEyeOff className="text-gray-600" />
            ) : (
              <FiEye className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-gray-300 rounded-full py-3 w-full font-semibold text-black mt-2 hover:bg-gray-400 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
