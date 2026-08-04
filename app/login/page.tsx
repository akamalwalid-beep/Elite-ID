"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!username || !password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      setLoading(false);

      if (!res.ok) {
        alert("Invalid username or password.");
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Login failed.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6 text-white">

      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#111111] p-10">

        <h1 className="text-center text-4xl font-bold">
          Admin Login
        </h1>

        <p className="mt-3 text-center text-zinc-500">
          Sign in to continue
        </p>

        <div className="mt-10 space-y-5">

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-lime-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-lime-400"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-lime-400 py-4 text-lg font-bold text-black transition hover:scale-105 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </div>

      </div>

    </main>
  );
}