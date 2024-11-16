"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/signin");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      toast.success("User details retrieved successfully!");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to fetch user details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">MyWebsite</div>
          <div className="flex space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg text-gray-800">
          <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
          <hr className="border-gray-300 my-4" />

          <div className="text-center">
            <p className="text-lg font-medium mb-4">Your Profile Information:</p>
            <h2 className="text-lg p-2 bg-green-500 text-white rounded-lg">
              {data === "nothing" ? (
                "No details available"
              ) : (
                <Link href={`/profile/${data}`} className="hover:underline">
                  {data}
                </Link>
              )}
            </h2>
          </div>

          <hr className="border-gray-300 my-6" />

          <button
            onClick={getUserDetails}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition w-full"
          >
            Fetch User Details
          </button>
        </div>
      </div>
    </div>
  );
}
