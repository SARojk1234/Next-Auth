"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      toast.success("Signup successful! Redirecting to login...");
      router.push("/signin");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      {/* Main Signup Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>

        <label
          htmlFor="username"
          className="block text-gray-700 font-medium mb-2"
        >
          Username
        </label>
        <input
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          Password
        </label>
        <input
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Create a password"
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={onSignUp}
          disabled={buttonDisabled || loading}
          className={`w-full p-3 font-bold rounded-lg transition ${
            buttonDisabled || loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-500 hover:underline font-medium"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
