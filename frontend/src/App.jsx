import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import {  useAuth } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { authenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={authenticated ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={!authenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
