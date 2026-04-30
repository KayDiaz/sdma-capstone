export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  const handleLogout = () => {
    setUser(null);
  };

  if (user.role === "admin") {
    return <AdminScreen user={user} onLogout={handleLogout} />;
  }

  if (user.role === "professor") {
    return <ProfessorScreen user={user} onLogout={handleLogout} />;
  }

  return <StudentScreen user={user} onLogout={handleLogout} />;
}