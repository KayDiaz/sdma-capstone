import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const API_URL = "http://10.204.98.149:5000";

export default function StudentScreen({ user, onLogout }) {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchViolations = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/violations/my-records`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Cannot fetch violations");
        return;
      }

      setViolations(data);
    } catch (error) {
      Alert.alert("Error", "Cannot fetch violations. Check IP/backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>UniDiscipline</Text>
      <Text style={styles.role}>Student Panel</Text>

      <View style={styles.header}>
        <Text style={styles.title}>My Violation Records</Text>
        <Text style={styles.subtitle}>Review your discipline status</Text>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, loading && styles.disabledButton]}
        onPress={fetchViolations}
        disabled={loading}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "Loading..." : "Refresh Records"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={violations}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No violations found</Text>
            <Text style={styles.emptyText}>Your record is currently clear.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.violationType}</Text>
              <Text style={styles.statusBadge}>{item.status || "pending"}</Text>
            </View>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{item.description}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Severity</Text>
            <Text style={styles.value}>{item.severity || "Pending"}</Text>

            <Text style={styles.label}>Punishment</Text>
            <Text style={styles.value}>{item.punishment || "Pending"}</Text>

            <Text style={styles.label}>Community Service Hours</Text>
            <Text style={styles.value}>{item.communityServiceHours || 0}</Text>
          </View>
        )}
      />

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
  primaryButton: {
    backgroundColor: "#E8C27A",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  primaryButtonText: {
    color: "#1F2D38",
    fontWeight: "bold",
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#F8FAFC",
  },
  statusBadge: {
    backgroundColor: "rgba(232,194,122,0.15)",
    color: "#E8C27A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    overflow: "hidden",
  },
  label: {
    color: "#E8C27A",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 3,
  },
  value: {
    color: "#F8FAFC",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 12,
  },
  emptyCard: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    marginTop: 20,
  },
  emptyTitle: {
    color: "#F8FAFC",
    fontWeight: "bold",
    fontSize: 18,
  },
  emptyText: {
    color: "#CBD5E1",
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 12,
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