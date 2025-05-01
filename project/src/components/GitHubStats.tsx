"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Book, Star, Users, UserPlus } from "lucide-react";

interface RepoData {
  name: string;
  stargazers_count: number;
  language: string;
}

interface LanguageData {
  name: string;
  value: number;
  percentage?: string;
}

interface UserData {
  public_repos: number;
  followers: number;
  following: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const GitHubStats: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch("https://api.github.com/users/An009");
        const userData = await userResponse.json();
        setUserData({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        });

        // Fetch repositories
        const reposResponse = await fetch(
          "https://api.github.com/users/An009/repos?per_page=100"
        );
        const reposData = await reposResponse.json();
        setRepos(
          reposData.map((repo: any) => ({
            name: repo.name,
            stargazers_count: repo.stargazers_count ?? 0,
            language: repo.language ?? "",
          }))
        );

        // Calculate language statistics
        const languageCounts: { [key: string]: number } = {};
        let totalLanguages = 0;

        reposData.forEach((repo: any) => {
          if (repo.language) {
            languageCounts[repo.language] =
              (languageCounts[repo.language] || 0) + 1;
            totalLanguages++;
          }
        });

        const languageData = Object.entries(languageCounts)
          .map(([name, value]) => ({
            name,
            value,
            percentage: ((value / totalLanguages) * 100).toFixed(0) + "%",
          }))
          .sort((a, b) => b.value - a.value);

        setLanguages(languageData);
      } catch (err) {
        setError("Failed to fetch GitHub data");
        console.error("Error fetching GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading)
    return <div className="text-center py-4">Loading GitHub stats...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const stats = [
    {
      label: "Repositories",
      value: userData?.public_repos || 0,
      icon: <Book className="w-5 h-5 text-blue-400" />,
    },
    {
      label: "Stars",
      value: totalStars,
      icon: <Star className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Followers",
      value: userData?.followers || 0,
      icon: <Users className="w-5 h-5 text-green-400" />,
    },
    {
      label: "Following",
      value: userData?.following || 0,
      icon: <UserPlus className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <div className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 h-full transition-colors mt-4 border border-white/20 dark:border-gray-700/50 shadow-lg">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-3">
        GitHub Stats
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/20 dark:bg-gray-800/50 backdrop-blur-xs rounded-lg p-2 transition-colors hover:bg-white/30 dark:hover:bg-gray-700/50 border border-white/20 dark:border-gray-700/50"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="text-gray-700 dark:text-gray-300">
                {stat.icon}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white/20 dark:bg-gray-800/50 backdrop-blur-xs rounded-lg p-3 transition-colors border border-white/20 dark:border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Most Used Languages
        </h3>
        <div className="h-[210px]">
          {languages.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languages}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name} ${percentage}`}
                >
                  {languages.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(23, 23, 23, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-700 dark:text-gray-300">
              No language data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
