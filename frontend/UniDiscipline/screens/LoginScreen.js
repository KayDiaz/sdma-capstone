import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";

const API_URL = "http://10.204.98.149:5000";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
        return;
      }

      onLogin({ ...data.user, token: data.token });
    } catch (error) {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>UniDiscipline</Text>
      <Text style={styles.subtitle}>Student Discipline Management App</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.smallText}>Sign in to continue</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#CBD5E1"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#CBD5E1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2D38",
    padding: 20,
    paddingTop: 90,
  },
  appName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  subtitle: {
    color: "#E8C27A",
    marginBottom: 35,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  smallText: {
    color: "#CBD5E1",
    marginTop: 4,
    marginBottom: 24,
  },
  label: {
    color: "#E8C27A",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#F8FAFC",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: "#E8C27A",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#1F2D38",
    fontWeight: "bold",
    fontSize: 15,
  },
});