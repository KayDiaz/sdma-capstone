import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function LoginScreen({ onLogin, onGoToSignUp }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>UniDiscipline</Text>
        <Text style={styles.school}>New Era University</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.smallText}>
          Sign in to continue to your account
        </Text>

        <Text style={styles.label}>Email:</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#2F3B62"
        />

        <Text style={styles.label}>Password:</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#2F3B62"
          secureTextEntry
        />

        <Pressable style={styles.whiteButton}>
          <Text style={styles.whiteButtonText}>
            Sign in with Google
          </Text>
        </Pressable>

        <Pressable
          style={styles.whiteButton}
          onPress={onGoToSignUp}
        >
          <Text style={styles.whiteButtonText}>Sign Up</Text>
        </Pressable>

       <Pressable
         style={styles.loginButton}
         onPress={() =>
       onLogin({
         fullName: "Paolo Jhay Landicho",
          role: "student",
          student_id: "14-14138-745",
         department: "Information Technology",
              })
          }
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>
        Student Discipline Management App
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4869D8",
    paddingHorizontal: 34,
  },

  header: {
    alignItems: "center",
    marginTop: 150,
    marginBottom: 62,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 43,
    fontWeight: "bold",
  },

  school: {
    color: "#DDE5FF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },

  card: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 44,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  title: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },

  smallText: {
    color: "#2F3B62",
    fontSize: 10,
    marginBottom: 26,
  },

  label: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    color: "#000000",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
  },

  whiteButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingVertical: 5,
    alignItems: "center",
    marginBottom: 7,
  },

  whiteButtonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    borderRadius: 9,
    paddingVertical: 5,
    paddingHorizontal: 22,
    marginTop: 20,
  },

  loginButtonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    color: "#263B73",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 14,
  },
});