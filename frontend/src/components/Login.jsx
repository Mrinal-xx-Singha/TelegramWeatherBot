import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-violet-200 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-800 tracking-wide mb-8 uppercase">
          StratoScope Bot
        </h1>
        <h2 className="text-xl font-medium text-center text-gray-600 mb-6">
          Admin Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Admin Login email */}
          <label className="text-sm font-semibold">
            Email:tester12@email.com
          </label>
          <input
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Admin login password */}
          <label className="text-sm font-semibold">Password:123456</label>
          <input
            type="password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold text-lg tracking-wide transition duration-300"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm font-semibold text-gray-500 mt-6">
          Made By{" "}
          <span className="font-semibold text-red-400">@Mrinal Singha</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
