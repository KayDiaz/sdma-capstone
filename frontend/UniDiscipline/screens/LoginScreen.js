import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👇 THIS is handleLogin (no separate file)
  const handleLogin = async () => {
    try {
      const res = await fetch("http://10.253.57.149:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.message);
        return;
      }

      onLogin ({ ...data.user, token: data.token }); // 👈 send user to App.js

    } catch (error) {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Pressable
        onPress={handleLogin} // 👈 this uses it
        style={{ backgroundColor: "#003366", padding: 15 }}
      >
        <Text style={{ color: "white" }}>Login</Text>
      </Pressable>
    </View>
  );
}