import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";

export default function StudentProfileScreen({
  user,
  onLogout,
  goHome,
  goToViolations,
  goToScanner,
  goToHistory,
}) {
  const fullName = user?.fullName || "Paolo Jhay Landicho";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.appName}>UniDiscipline</Text>
              <Text style={styles.school}>New Era University</Text>
            </View>

            <Text style={styles.roleBadge}>Student</Text>

            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>{initials}</Text>
            </View>
          </View>

          <Text style={styles.title}>My Profile</Text>

          <View style={styles.studentCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View>
              <Text style={styles.studentName}>{fullName}</Text>
              <Text style={styles.studentId}>
                {user?.student_id || "2019-1-007"}
              </Text>

              <View style={styles.studentBadge}>
                <Text style={styles.studentBadgeText}>Student</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>PERSONAL INFORMATION</Text>

          <InfoRow icon="♙" label="Full Name" value={fullName} />
          <InfoRow icon="✉" label="Email" value="paolojhay.landicho@neu.edu.ph" />
          <InfoRow icon="☎" label="Phone" value="+63 912 345 6789" />
          <InfoRow icon="▣" label="Department" value={user?.department || "CICS"} />
          <InfoRow icon="▣" label="Year Level" value="3rd Year" last />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>NOTIFICATION PREFERENCES</Text>

          <SettingRow title="Push Notification" subtitle="Violation update and alerts" />
          <SettingRow title="Email Alerts" subtitle="Receive emails for case updates" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>SETTINGS & HELP</Text>

          <MenuRow icon="▣" title="Change Password" />
          <MenuRow icon="?" title="Help & FAQ" />
          <MenuRow icon="◉" title="Privacy Policy" last />
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={onLogout}>
          <Text style={styles.signOutText}>⇱ Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavItem label="Home" onPress={goHome} />
        <NavItem label="Violations" onPress={goToViolations} />
        <NavItem label="Scanner" onPress={goToScanner} />
        <NavItem label="History" onPress={goToHistory} />
        <NavItem label="Profile"/>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <View style={[styles.infoRow, last && styles.noBorder]}>
      <View style={styles.smallIcon}>
        <Text>{icon}</Text>
      </View>

      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function SettingRow({ title, subtitle }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.smallIcon}>
        <Text>🔔</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>

      <Switch value />
    </View>
  );
}

function MenuRow({ icon, title, last }) {
  return (
    <TouchableOpacity style={[styles.menuRow, last && styles.noBorder]}>
      <View style={styles.smallIcon}>
        <Text>{icon}</Text>
      </View>

      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function NavItem({ label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Text style={[styles.navIcon, active && styles.activeNav]}>
        {label === "Home"
          ? "⌂"
          : label === "Violations"
          ? "ⓘ"
          : label === "Scanner"
          ? "⌗"
          : label === "History"
          ? "◷"
          : "♙"}
      </Text>

      <Text style={[styles.navText, active && styles.activeNav]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5E5E5" },
  scrollContent: { paddingBottom: 90 },

  header: {
    backgroundColor: "#4869D8",
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 12,
  },
  topRow: { flexDirection: "row", alignItems: "center" },
  appName: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  school: { color: "#DDE5FF", fontSize: 10 },
  roleBadge: {
    backgroundColor: "#95A4D7",
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
    overflow: "hidden",
  },
  profileCircle: {
    marginLeft: "auto",
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: { color: "#FFFFFF", fontWeight: "bold" },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 48,
  },

  studentCard: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#A5B5EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },
  studentName: { color: "#FFFFFF", fontSize: 17, fontWeight: "bold" },
  studentId: { color: "#DDE5FF", fontSize: 12 },
  studentBadge: {
    backgroundColor: "#A5B5EA",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  studentBadgeText: { color: "#FFFFFF", fontSize: 9, fontWeight: "bold" },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 28,
    marginTop: 14,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D0D0D0",
  },
  cardTitle: {
    color: "#999999",
    fontSize: 12,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
  },
  smallIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  infoLabel: { color: "#777777", fontSize: 10 },
  infoValue: { color: "#000000", fontWeight: "bold", fontSize: 12 },
  noBorder: { borderBottomWidth: 0 },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
  },
  settingSubtitle: { color: "#999999", fontSize: 10 },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
  },
  menuTitle: { color: "#000000", fontWeight: "bold", fontSize: 12 },

  signOutButton: {
    backgroundColor: "#F7C9C9",
    marginHorizontal: 28,
    marginTop: 18,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  signOutText: { color: "#FF0000", fontWeight: "bold" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center" },
  navIcon: { fontSize: 18, color: "#000000" },
  navText: { fontSize: 10, color: "#000000" },
  activeNav: { color: "#405CFF" },
});