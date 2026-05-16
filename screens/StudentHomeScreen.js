import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function StudentHomeScreen({
  user,
  onLogout,
  goToViolations,
  goToScanner,
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

          <Text style={styles.greeting}>Good afternoon,</Text>
          <Text style={styles.firstName}>
            {fullName.split(" ")[0]}
          </Text>

          <TouchableOpacity style={styles.notificationCircle}>
            <Text style={styles.notificationIcon}>◌</Text>
          </TouchableOpacity>

          <View style={styles.studentCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.studentName}>{fullName}</Text>

              <Text style={styles.studentInfo}>
                {user?.student_id || "14-14138-745"}
              </Text>

              <Text style={styles.studentInfo}>
                {user?.department || "Information Technology"} • 3rd Year
              </Text>

              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>
                  ⚠ Active Case
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatBox value="3" label="Violations" color="#FF8B8B" />
          <StatBox value="1h" label="Served" color="#6C8DFF" />
          <StatBox value="1" label="Cleared" color="#73E46B" />
        </View>

        <View style={styles.serviceCard}>
          <View style={styles.serviceTop}>
            <View style={styles.serviceLeft}>
              <View style={styles.serviceIcon}>
                <Text>🏅</Text>
              </View>

              <Text style={styles.serviceTitle}>
                Community Service
              </Text>
            </View>

            <Text style={styles.serviceHours}>1 / 17h</Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.completedText}>
              12% completed
            </Text>

            <Text style={styles.remainingText}>
              16h remaining
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            ↗ Recent Violations
          </Text>

          <Text style={styles.viewAll}>
            View all &gt;
          </Text>
        </View>

        <ViolationCard
          title="Tardiness"
          status="Serving"
          statusColor="#E9B4FF"
          statusTextColor="#C000FF"
          date="Apr 20, 2026"
          hours="3h community service"
        />

        <ViolationCard
          title="Dress Code"
          status="Completed"
          statusColor="#B7FFB2"
          statusTextColor="#149600"
          date="Apr 15, 2026"
          hours="2h community service"
        />
      </ScrollView>

      <View style={styles.bottomNav}>
       <NavItem label="Home" active />
        <NavItem label="Violations" onPress={goToViolations} />
        <NavItem label="Scanner" onPress={goToScanner} />
        <NavItem label="History" onPress={goToHistory} />
        <NavItem label="Profile" onPress={goToProfile}/>
      </View>
    </SafeAreaView>
  );
}

function StatBox({ value, label, color }) {
  return (
    <View style={styles.statBox}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Text style={styles.statIconText}>◉</Text>
      </View>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ViolationCard({
  title,
  status,
  statusColor,
  statusTextColor,
  date,
  hours,
}) {
  return (
    <View style={styles.violationCard}>
      <View style={styles.violationTop}>
        <View style={styles.dot} />

        <View style={{ flex: 1 }}>
          <Text style={styles.violationTitle}>{title}</Text>

          <View style={styles.violationRow}>
            <Text style={styles.minorText}>Minor</Text>
            <Text style={styles.codeText}>V-2026-001</Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColor },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: statusTextColor },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.violationBottom}>
        <Text style={styles.metaText}>▣ {date}</Text>
        <Text style={styles.metaText}>◷ {hours}</Text>
      </View>
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

      <Text style={[styles.navLabel, active && styles.activeNav]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E7E7",
  },

  scrollContent: {
    paddingBottom: 90,
  },

  header: {
    backgroundColor: "#4869D8",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 18,
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
    color: "#DCE3FF",
    fontSize: 10,
    marginTop: 2,
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

  greeting: {
    color: "#DCE3FF",
    marginTop: 28,
    fontSize: 13,
  },

  firstName: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 6,
  },

  notificationCircle: {
    position: "absolute",
    right: 18,
    top: 125,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  studentCard: {
    marginTop: 28,
    borderWidth: 1.3,
    borderColor: "#FFFFFF",
    borderRadius: 16,
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
    marginRight: 16,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  studentName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  studentInfo: {
    color: "#CFD8FF",
    fontSize: 12,
  },

  activeBadge: {
    backgroundColor: "#D49A35",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 8,
  },

  activeBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 22,
  },

  statBox: {
    width: 104,
    height: 104,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    alignItems: "center",
    justifyContent: "center",
  },

  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  statIconText: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  statValue: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
  },

  statLabel: {
    color: "#777777",
    fontSize: 12,
    marginTop: 5,
  },

  serviceCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginTop: 22,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D4D4D4",
  },

  serviceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  serviceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  serviceIcon: {
    backgroundColor: "#FFE27A",
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  serviceTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },

  serviceHours: {
    color: "#777777",
    fontWeight: "bold",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
    marginTop: 14,
  },

  progressFill: {
    width: "24%",
    height: 8,
    backgroundColor: "#2C47FF",
    borderRadius: 10,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  completedText: {
    color: "#777777",
    fontSize: 11,
    fontWeight: "bold",
  },

  remainingText: {
    color: "#F2B400",
    fontSize: 11,
    fontWeight: "bold",
  },

  sectionHeader: {
    marginHorizontal: 24,
    marginTop: 22,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: "#555555",
    fontWeight: "bold",
    fontSize: 16,
  },

  viewAll: {
    color: "#405CFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  violationCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    marginBottom: 12,
  },

  violationTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#F5A623",
    marginTop: 5,
    marginRight: 12,
  },

  violationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },

  violationRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },

  minorText: {
    color: "#F5A623",
    fontWeight: "bold",
    fontSize: 11,
  },

  codeText: {
    color: "#888888",
    fontSize: 11,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "bold",
  },

  violationBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  metaText: {
    color: "#777777",
    fontSize: 12,
    fontWeight: "bold",
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

  navLabel: {
    fontSize: 10,
    color: "#000000",
  },

  activeNav: {
    color: "#405CFF",
  },
});