import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import EditorPage from "./pages/EditorPage";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar isAuthenticated={isAuthenticated} />
              <LandingPage />
            </>
          }
        />
        <Route path="/login" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <>
              <DashboardPage />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <CreatePage />
            </>
          }
        />
        <Route
          path="/editor"
          element={
            <>
              <EditorPage />
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <HistoryPage />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <AdminPage />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <SettingsPage />
            </>
          }
        />

        {/* Logout Route Helper */}
        <Route
          path="/logout"
          element={
            <Logout setIsAuthenticated={setIsAuthenticated} />
          }
        />
      </Routes>
    </Router>
  );
}

function Logout({ setIsAuthenticated }: { setIsAuthenticated: (val: boolean) => void }) {
  useEffect(() => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    window.location.href = "/";
  }, [setIsAuthenticated]);
  return null;
}

export default App;
