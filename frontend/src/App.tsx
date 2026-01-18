import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import EditorPage from "./pages/EditorPage";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar isAuthenticated={false} />
              <LandingPage />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar isAuthenticated={true} />
              <DashboardPage />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <Navbar isAuthenticated={true} />
              <CreatePage />
            </>
          }
        />
        <Route
          path="/editor"
          element={
            <>
              <Navbar isAuthenticated={true} />
              <EditorPage />
            </>
          }
        />
        <Route
          path="/history"
          element={
            <>
              <Navbar isAuthenticated={true} />
              <HistoryPage />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <Navbar isAuthenticated={true} />
              <AdminPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
