"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signin", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl px-6 lg:space-x-12">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-grow mb-8 lg:mb-0">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Next-Auth</h1>
          <p className="text-lg lg:text-xl font-light drop-shadow-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, aliquid?
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Log in to Access
          </h2>

          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email address"
          />

          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <button
            onClick={onLogin}
            disabled={buttonDisabled || loading}
            className={`w-full p-3 font-bold rounded-lg transition ${
              buttonDisabled || loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="text-center mt-4">
            <Link
              href="/signup"
              className="text-blue-500 hover:underline font-medium"
            >
              Create a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
