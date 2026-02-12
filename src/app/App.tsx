// import LoginScreen from "../../MobileApp_UI";
import { WhatsAppChat } from "./components/whatsapp-chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginScreen />} /> */}
         <Route
          path="/whatsapp"
          element={

              <WhatsAppChat />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

