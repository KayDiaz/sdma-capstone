export const COLORS = {
  bg: "#1F2D38",
  panel: "rgba(255,255,255,0.10)",
  panelDark: "#263541",
  border: "rgba(255,255,255,0.18)",
  text: "#F8FAFC",
  muted: "#CBD5E1",
  gold: "#E8C27A",
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 55,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.navy,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
};