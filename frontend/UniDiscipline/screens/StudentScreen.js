import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";

export default function StudentScreen({ user, onLogout }) {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    fetchViolations();
  }, []);

  const fetchViolations = async () => {
    try {
      const res = await fetch(
        "http://10.253.57.149:5000/api/violations/my-records",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message);
        return;
      }

      setViolations(data);
    } catch (error) {
      Alert.alert("Error", "Cannot fetch violations");
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        Welcome {user.fullName}
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        My Violations
      </Text>

      <FlatList
        data={violations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              marginVertical: 5,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text>Type: {item.violationType}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Severity: {item.severity}</Text>
          </View>
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
}