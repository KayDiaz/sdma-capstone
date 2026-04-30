import { View, Text, Button } from "react-native";

export default function ProfessorScreen({ user, onLogout }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>Professor Dashboard</Text>
      <Text>Welcome {user.fullName}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
}