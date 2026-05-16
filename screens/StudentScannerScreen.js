import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function StudentScannerScreen({
  user,
  onLogout,
  goHome,
  goToViolations,
  goToHistory,
  goToProfile,
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
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.appName}>UniDiscipline</Text>
            <Text style={styles.school}>New Era University</Text>
          </View>

          <Text style={styles.roleBadge}>Student</Text>

          <TouchableOpacity style={styles.profileCircle} onPress={onLogout}>
            <Text style={styles.profileText}>{initials}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>QR Scanner</Text>
        <Text style={styles.subtitle}>Scan your community service QR code</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scannerBox}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />

          <Text style={styles.qrIcon}>▦</Text>
          <Text style={styles.scanText}>Scanner Preview</Text>
          <Text style={styles.scanSubtext}>
            Camera scanner will appear here
          </Text>
        </View>

        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Start Scanning</Text>
        </TouchableOpacity>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Reminder</Text>
          <Text style={styles.noteText}>
            Scan the QR code during time-in and time-out to record your community
            service hours.
          </Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <NavItem label="Home" onPress={goHome} />
        <NavItem label="Violations" onPress={goToViolations} />
        <NavItem label="Scanner" active />
        <NavItem label="History" onPress={goToHistory} />
        <NavItem label="Profile" onPress={goToProfile}/>
      </View>
    </SafeAreaView>
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

      <Text style={[styles.navText, active && styles.activeNav]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  header: {
    backgroundColor: "#4869D8",
    paddingHorizontal: 20,
    paddingTop: 42,
    paddingBottom: 35,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  school: {
    color: "#DDE5FF",
    fontSize: 10,
  },
  roleBadge: {
    backgroundColor: "#8494D6",
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 12,
    overflow: "hidden",
  },
  profileCircle: {
    marginLeft: "auto",
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 60,
  },
  subtitle: {
    color: "#DDE5FF",
    fontSize: 13,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 35,
  },
  scannerBox: {
    height: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4869D8",
    position: "relative",
  },
  qrIcon: {
    fontSize: 80,
    color: "#4869D8",
  },
  scanText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111111",
    marginTop: 15,
  },
  scanSubtext: {
    color: "#777777",
    marginTop: 5,
  },
  cornerTopLeft: {
    position: "absolute",
    top: 18,
    left: 18,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#4869D8",
  },
  cornerTopRight: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: "#4869D8",
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 18,
    left: 18,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#4869D8",
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 18,
    right: 18,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "#4869D8",
  },
  scanButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 25,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#D4D4D4",
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 6,
  },
  noteText: {
    color: "#666666",
    lineHeight: 20,
  },
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
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    fontSize: 18,
    color: "#000000",
  },
  navText: {
    fontSize: 10,
    color: "#000000",
  },
  activeNav: {
    color: "#405CFF",
  },
});