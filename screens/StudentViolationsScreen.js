import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function StudentViolationsScreen({
  user,
  onLogout,
  goHome,
  goToScanner,
  goToHistory,
  goToProfile,
}) {
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
            <Text style={styles.profileText}>PL</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>My Violations</Text>
        <Text style={styles.subtitle}>Track your violation records</Text>

        <View style={styles.statsRow}>
          <StatBox value="3" label="Total Cases" color="#FF3B30" />
          <StatBox value="7h" label="Served" color="#F5A623" />
          <StatBox value="1" label="Pending" color="#6B7FDB" faded />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.filterRow}>
          <Filter label="All" count="3" active />
          <Filter label="Pending" count="2" />
          <Filter label="Serving" count="1" />
          <Filter label="Done" count="0" />
        </View>

        <ViolationCard title="Tardiness" date="Apr 20, 2026" hours="3h community service" />
        <ViolationCard title="Dress Code" date="Apr 15, 2026" hours="2h community service" />
        <ViolationCard title="Academic Dishonesty" date="Apr 15, 2026" hours="2h community service" pending />
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavItem label="Home" onPress={goHome} />
         <NavItem label="Violations" active />
        <NavItem label="Scanner" onPress={goToScanner} />
        <NavItem label="History" onPress={goToHistory} />
        <NavItem label="Profile" onPress={goToProfile}/>
        </View>
    </SafeAreaView>
  );
}

function StatBox({ value, label, color, faded }) {
  return (
    <View style={[styles.statBox, faded && { opacity: 0.35 }]}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Text style={styles.statIconText}>◉</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Filter({ label, count, active }) {
  return (
    <TouchableOpacity style={[styles.filterButton, active && styles.activeFilter]}>
      <Text style={[styles.filterText, active && styles.activeFilterText]}>{label}</Text>
      <Text style={styles.filterCount}>{count}</Text>
    </TouchableOpacity>
  );
}

function ViolationCard({ title, date, hours, pending }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={styles.codeRow}>
            <Text style={styles.minor}>Minor</Text>
            <Text style={styles.code}>V-2026-001</Text>
          </View>
        </View>

        {pending && <Text style={styles.pendingBadge}>Pending Review</Text>}
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.meta}>▣ {date}</Text>
        <Text style={styles.meta}>◷ {hours}</Text>
        {pending && <Text style={styles.arrow}>⌄</Text>}
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
      <Text style={[styles.navText, active && styles.activeNav]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5E5E5" },
  header: {
    backgroundColor: "#345BD4",
    paddingHorizontal: 22,
    paddingTop: 42,
    paddingBottom: 22,
  },
  topRow: { flexDirection: "row", alignItems: "center" },
  appName: { color: "#FFFFFF", fontSize: 17, fontWeight: "bold" },
  school: { color: "#DDE5FF", fontSize: 10 },
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
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: { color: "#FFFFFF", fontWeight: "bold" },
  title: { color: "#FFFFFF", fontSize: 31, fontWeight: "bold", marginTop: 62 },
  subtitle: { color: "#DDE5FF", fontSize: 12 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 28 },
  statBox: {
    width: "29%",
    height: 96,
    borderWidth: 1.2,
    borderColor: "#FFFFFF",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  statIcon: {
    width: 25,
    height: 25,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  statIconText: { color: "#FFFFFF" },
  statValue: { fontSize: 25, fontWeight: "bold", marginTop: 8 },
  statLabel: { color: "#E8EDFF", fontSize: 13 },
  content: { paddingHorizontal: 28, paddingTop: 18, paddingBottom: 85 },
  filterRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  filterButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: "row",
    gap: 5,
  },
  activeFilter: { backgroundColor: "#17134E" },
  filterText: { color: "#000000", fontWeight: "bold", fontSize: 12 },
  activeFilterText: { color: "#FFFFFF" },
  filterCount: {
    backgroundColor: "#E6E6E6",
    color: "#555555",
    fontSize: 8,
    paddingHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#000000" },
  codeRow: { flexDirection: "row", gap: 18, marginTop: 6 },
  minor: { color: "#F59E0B", fontWeight: "bold", fontSize: 11 },
  code: { color: "#777777", fontSize: 11 },
  pendingBadge: {
    color: "#F59E0B",
    backgroundColor: "#FFF3CD",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
    alignItems: "center",
  },
  meta: { color: "#777777", fontSize: 12, fontWeight: "bold" },
  arrow: { fontSize: 22, color: "#777777" },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 52,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center" },
  navIcon: { fontSize: 18, color: "#000000" },
  navText: { fontSize: 10, color: "#000000" },
  activeNav: { color: "#4A63FF" },
});