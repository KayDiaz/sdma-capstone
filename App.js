import React, { useState } from "react";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import StudentHomeScreen from "./screens/StudentHomeScreen";
import StudentViolationsScreen from "./screens/StudentViolationsScreen";
import StudentScannerScreen from "./screens/StudentScannerScreen";
import StudentHistoryScreen from "./screens/StudentHistoryScreen";
import StudentProfileScreen from "./screens/StudentProfileScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("login");

  const handleLogout = () => {
    setUser(null);
    setScreen("login");
  };

  if (!user && screen === "signup") {
    return <SignUpScreen onGoToLogin={() => setScreen("login")} />;
  }

  if (!user) {
    return (
      <LoginScreen
        onLogin={(loggedUser) => {
          setUser(loggedUser);
          setScreen("home");
        }}
        onGoToSignUp={() => setScreen("signup")}
      />
    );
  }

  if (screen === "violations") {
    return (
      <StudentViolationsScreen
        user={user}
        onLogout={handleLogout}
        goHome={() => setScreen("home")}
        goToScanner={() => setScreen("scanner")}
        goToHistory={() => setScreen("history")}
        goToProfile={() => setScreen("profile")}
      />
    );
  }

  if (screen === "scanner") {
    return (
      <StudentScannerScreen
        user={user}
        onLogout={handleLogout}
        goHome={() => setScreen("home")}
        goToViolations={() => setScreen("violations")}
        goToHistory={() => setScreen("history")}
        goToProfile={() => setScreen("profile")}
      />
    );
  }

  if (screen === "history") {
    return (
      <StudentHistoryScreen
        user={user}
        onLogout={handleLogout}
        goHome={() => setScreen("home")}
        goToViolations={() => setScreen("violations")}
        goToScanner={() => setScreen("scanner")}
        goToProfile={() => setScreen("profile")}
      />
    );
  }

  if (screen === "profile") {
    return (
      <StudentProfileScreen
        user={user}
        onLogout={handleLogout}
        goHome={() => setScreen("home")}
        goToViolations={() => setScreen("violations")}
        goToScanner={() => setScreen("scanner")}
        goToHistory={() => setScreen("history")}
      />
    );
  }

  return (
    <StudentHomeScreen
      user={user}
      onLogout={handleLogout}
      goToViolations={() => setScreen("violations")}
      goToScanner={() => setScreen("scanner")}
      goToHistory={() => setScreen("history")}
      goToProfile={() => setScreen("profile")}
    />
  );
}