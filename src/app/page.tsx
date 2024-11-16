'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

// Define the type for GitHub repositories
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const Home = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<GitHubRepo[]>(
          'https://api.github.com/users/SARojk1234/repos'
        );
        setRepos(response.data);
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white py-4 shadow-lg">
        <div className="flex justify-between max-w-6xl mx-auto px-4">
          <div className="text-2xl font-bold">My Projects</div>
          <div className="flex space-x-6">
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <div className="w-full max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          GitHub Repositories
        </h1>
        {loading ? (
          <p className="text-xl text-gray-600 text-center">Loading repositories...</p>
        ) : (
          <table className="table-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo, index) => (
                <tr
                  key={repo.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-gray-200 transition`}
                >
                  <td className="px-4 py-2 text-gray-900">{repo.name}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {repo.description || 'No description available.'}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on GitHub
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default Home;
