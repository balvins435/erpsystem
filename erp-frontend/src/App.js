import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import Procurement from "./pages/Procurement";

function App() {
  const [darkMode, setDarkMode] = useState(() => {  
    return localStorage.getItem("theme") === "dark"; // Load saved preference
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light"); // Save preference
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Button 
        onClick={() => setDarkMode(!darkMode)}
        variant="contained"
        style={{ position: "fixed", top: 10, right: 10 }}
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </Button>

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/*  Register route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/procurement" element={<Procurement />} />
          {/* <Route path="/dashboard" element={<ProtectedRoute role="Admin"><Dashboard /></ProtectedRoute>} /> */}
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
