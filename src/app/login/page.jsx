"use client";

import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/services/api";
import AuthLayout from "@/components/esummit/auth/AuthLayout";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/utils/firebase/firebase"; // your firebase.js

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem("login") === "true") {
      window.location.href = "/dashboard"; // Redirect to home or dashboard if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login response:", response);

      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      const idToken = await response.user.getIdToken();
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/Login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      // Set login status in localStorage if login is successful
      localStorage.setItem("login", "true");

      // Navigate based on user role
      if (response.user.role === "admin") {
        navigate.push("/admin-dashboard");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
      console.error("Login error:", err);
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="rounded-2xl shadow-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-white mb-1">Sign In</h2>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-0.5 text-xs pl-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded px-4 py-2 bg-[#181818] text-white border border-gray-600 focus:border-green-500 outline-none placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="accent-green-600"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-400">
              Show Password
            </label>
          </div>
        </div>

        <div className="text-right mb-1">
          <a
            href="/forgot-password"
            className="text-sm text-white hover:text-green-400 hover:underline"
          >
            Forgot your password?
          </a>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-1 bg-[#2F8D46] hover:bg-[#256e36] text-black font-semibold rounded py-2 transition"
          >
            {loading ? "Signing in..." : "LOGIN"}
          </button>
          <a
            href="/register"
            className="flex items-center justify-center gap-1 bg-transparent hover:bg-white/10 text-white font-semibold rounded py-2 transition"
          >
            CREATE NEW ACCOUNT
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
