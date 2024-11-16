'use client';

import Link from "next/link";

export default function AboutPage() {
  const project = {
    name: "My Website",
    description: "This is the repository for my personal website built with Next.js and React.",
    link: "https://github.com/SARojk1234/next-auth", // Replace with your actual repository link
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">MyWebsite</div>
          <div className="flex space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">About This Project</h1>
        <p className="text-lg text-center mb-12">
          Learn more about the project that powers this website:
        </p>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
