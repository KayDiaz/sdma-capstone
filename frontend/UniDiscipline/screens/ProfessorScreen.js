import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProfessorScreen({ user, onLogout }) {
  const [studentId, setStudentId] = useState("");
  const [violationType, setViolationType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://10.204.98.149:5000";

  const submitViolation = async () => {
    if (!studentId || !violationType || !description) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/violations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          student: studentId,
          violationType,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Failed to report violation.");
        return;
      }

      Alert.alert("Success", "Violation reported successfully.");

      setStudentId("");
      setViolationType("");
      setDescription("");
    } catch (error) {
      Alert.alert("Error", "Network request failed. Check your IP and backend.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>UniDiscipline</Text>
      <Text style={styles.role}>Professor Panel</Text>

      <View style={styles.header}>
        <Text style={styles.title}>Report Violation</Text>
        <Text style={styles.subtitle}>Submit a discipline report</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Student</Text>
        <TextInput
          style={styles.input}
          placeholder="Student MongoDB ID"
          placeholderTextColor="#CBD5E1"
          value={studentId}
          onChangeText={setStudentId}
        />

        <Text style={styles.label}>Violation Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Inappropriate Hair Color"
          placeholderTextColor="#CBD5E1"
          value={violationType}
          onChangeText={setViolationType}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write the details here..."
          placeholderTextColor="#CBD5E1"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabledButton]}
          onPress={submitViolation}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? "Submitting..." : "Submit Violation"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2D38",
    padding: 20,
    paddingTop: 55,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  role: {
    color: "#E8C27A",
    marginBottom: 28,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  subtitle: {
    color: "#CBD5E1",
    marginTop: 4,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
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
  textArea: {
    height: 110,
    textAlignVertical: "top",
  },
  primaryButton: {
    backgroundColor: "#E8C27A",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  primaryButtonText: {
    color: "#1F2D38",
    fontWeight: "bold",
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  logoutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E8C27A",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#E8C27A",
    fontWeight: "bold",
  },
});