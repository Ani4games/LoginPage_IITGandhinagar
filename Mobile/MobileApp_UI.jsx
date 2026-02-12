import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter email & password");
      return;
    }

    try {
      const res = await axios.post(
        "http://YOUR_PC_IP:5000/login",
        {
          email: email,
          password: password,
        }
      );

      await AsyncStorage.setItem(
        "token",
        res.data.token
      );

      Alert.alert("Login Success");

      console.log("TOKEN:", res.data.token);
      checkToken();

    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed");
    }
  
  };

  const checkToken = async () => {
  const token = await AsyncStorage.getItem("token");

  console.log("STORED TOKEN:", token);

  if (token) {
    Alert.alert("Token Found ✅");
  } else {
    Alert.alert("No Token ❌");
  }
};

const checkLogin = async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    Alert.alert("Already Logged In ✅");


    console.log("TOKEN:", token);

  
  } else {
    console.log("No token found");
  }
};
  useEffect(() => {
    checkLogin();
  }, []);





  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        
        
        <Text style={styles.title}>QR INVENTORY APP</Text>

        
        <View style={styles.qrContainer}>
          <MaterialIcons name="qr-code-scanner" size={60} color="#333" />
        </View>

        
        <View style={styles.inputContainer}>
          <Icon name="mail" size={20} color="#555" style={styles.leftIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#555"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#555" style={styles.leftIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#555"
            style={styles.input}
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
          >
            <Icon
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

      
        <TouchableOpacity style={styles.loginBtn}
          onPress={handleLogin}
          >

          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d6c3", // outer background
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "80%",
    backgroundColor: "#F2A65A", // orange card
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
  },

  qrContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 25,
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: 15,
  },

  leftIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 45,
    color: "#000",
  },

  loginBtn: {
    backgroundColor: "#d9d9d9",
    borderRadius: 25,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});