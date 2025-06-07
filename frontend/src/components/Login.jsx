import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("tester12@email.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message);
      setError(error.response?.data?.message || "login failed");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-2xl font-semibold text-center mb-6  uppercase tracking-wider">
       StratoScope Bot
      </h1>
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 uppercase tracking-wider">
          Admin Login
        </h2>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-right text-lg font-semibold text-amber-500 pt-4">
        Made By @Mrinal Singha
      </p>
    </div>
  );
};

export default Login;
