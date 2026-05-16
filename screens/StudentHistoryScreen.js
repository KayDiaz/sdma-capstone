import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function StudentHistoryScreen({
  user,
  onLogout,
  goHome,
  goToViolations,
  goToScanner,
  goToProfile,
}) {
  const fullName = user?.fullName || "Paolo";

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

            <TouchableOpacity style={styles.profileCircle} onPress={onLogout}>
              <Text style={styles.profileText}>{initials}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.pageTitle}>Service History</Text>

          <Text style={styles.pageSubtitle}>
            Log community service time-in & time-out
          </Text>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View style={styles.progressIcon}>
                <Text>🏅</Text>
              </View>

              <Text style={styles.progressTitle}>
                Service Progress
              </Text>
            </View>

            <View style={styles.hoursRow}>
              <Text style={styles.hoursText}>0h</Text>
              <Text style={styles.percentText}>0%</Text>
            </View>

            <View style={styles.hoursBottom}>
              <Text style={styles.requiredText}>
                of 12h required
              </Text>

              <Text style={styles.leftText}>12h left</Text>
            </View>

            <View style={styles.progressBackground}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatBox value="3" label="Sessions" color="#FF6B6B" />
          <StatBox value="0h" label="Completed" color="#8BFF84" />
          <StatBox value="7h" label="Remaining" color="#FFB347" />
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningIcon}>⚠</Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>
              12h still required
            </Text>

            <Text style={styles.warningText}>
              Scan in at an approved service location to log your hours.
            </Text>
          </View>
        </View>

        <View style={styles.logsCard}>
          <Text style={styles.logsTitle}>SERVICE LOGS</Text>

          <ServiceLog
            place="Library"
            date="Apr 22, 2026 • 08:02AM • In progress"
            hours="0h"
            blue
          />

          <ServiceLog
            place="Campus Grounds"
            date="Apr 22, 2026 • 01:15PM • 06:15PM"
            hours="1h"
            green
          />

          <ServiceLog
            place="OSA Office"
            date="Apr 22, 2026 • 08:00AM • In progress"
            hours="0h"
            blue
          />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavItem label="Home" onPress={goHome} />
        <NavItem label="Violations" onPress={goToViolations} />
        <NavItem label="Scanner" onPress={goToScanner} />
        <NavItem label="History" active />
        <NavItem label="Profile" onPress={goToProfile} />
      </View>
    </SafeAreaView>
  );
}

function StatBox({ value, label, color }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ServiceLog({ place, date, hours, blue, green }) {
  return (
    <View style={styles.logRow}>
      <View
        style={[
          styles.logIcon,
          blue && { backgroundColor: "#C8D2FF" },
          green && { backgroundColor: "#C8FFC9" },
        ]}
      >
        <Text>{blue ? "➜" : "✓"}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.logPlace}>{place}</Text>
        <Text style={styles.logDate}>{date}</Text>
      </View>

      <Text style={styles.logHours}>{hours}</Text>
    </View>
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

  scrollContent: {
    paddingBottom: 90,
  },

  header: {
    backgroundColor: "#4869D8",
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 20,
    elevation: 5,
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

  profileText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  pageTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 52,
  },

  pageSubtitle: {
    color: "#DDE5FF",
    marginTop: 4,
    fontSize: 12,
  },

  progressCard: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#FFE27A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  progressTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  hoursText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "bold",
  },

  percentText: {
    color: "#FFB100",
    fontSize: 32,
    fontWeight: "bold",
  },

  hoursBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  requiredText: {
    color: "#FFFFFF",
    fontSize: 11,
  },

  leftText: {
    color: "#FFB100",
    fontSize: 11,
    fontWeight: "bold",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E2E2E2",
    borderRadius: 10,
    marginTop: 12,
  },

  progressFill: {
    width: "0%",
    height: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 22,
  },

  statBox: {
    width: 104,
    height: 82,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    fontSize: 30,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#777777",
    fontSize: 12,
    marginTop: 4,
  },

  warningCard: {
    backgroundColor: "#F6E8B4",
    marginHorizontal: 24,
    marginTop: 18,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E0C75C",
    flexDirection: "row",
    alignItems: "center",
  },

  warningIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  warningTitle: {
    color: "#7B5D00",
    fontWeight: "bold",
  },

  warningText: {
    color: "#7B5D00",
    fontSize: 11,
    marginTop: 2,
  },

  logsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    padding: 14,
  },

  logsTitle: {
    color: "#999999",
    fontSize: 12,
    marginBottom: 10,
  },

  logRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },

  logIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logPlace: {
    fontWeight: "bold",
    color: "#000000",
  },

  logDate: {
    color: "#777777",
    fontSize: 11,
    marginTop: 3,
  },

  logHours: {
    fontWeight: "bold",
    color: "#000000",
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