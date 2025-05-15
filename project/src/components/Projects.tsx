import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ProjectCard } from "./ProjectCard.tsx";
import { DesignCard } from "./DesignCard.tsx";
import { Search, GitBranch, User, Loader } from "lucide-react";
import { Octokit } from "@octokit/rest";
import githunlogo from "@/assets/githunlogo.png";
import gitlogo2 from "@/assets/gitlogo2.png";
import gitlogo3 from "@/assets/gitlogo3.png";
import gitlogo4 from "@/assets/gitlogo4.png";
import acahouse from "@/assets/DesignCardAssests/acahouse.png";
import frestica from "@/assets/DesignCardAssests/frestica.png";
import styla from "@/assets/DesignCardAssests/styla.png";
import backpack from "@/assets/DesignCardAssests/backpack.png";

type ProjectType = "development" | "design";

interface GitHubProject {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  isOwn: boolean;
  image?: string;
}

export function Projects() {
  const [activeType, setActiveType] = useState<ProjectType>("development");
  const [searchQuery, setSearchQuery] = useState("");
  const [devProjects, setDevProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [technologies, setTechnologies] = useState<string[]>(["All"]);
  const [activeTab, setActiveTab] = useState<"own" | "contributed">("own");
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "forks" | "name">(
    "updated"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const githubUsername = "An009";

  // Default images for projects designed by An009
  const defaultImages = [githunlogo, gitlogo2, gitlogo3, gitlogo4];

  const designProjects = [
    {
      title: "ACA House Website",
      description:
        "Interactive prototype for ACA House website with modern design and seamless user experience",
      image: acahouse,
      category: "UI/UX Design",
      link: "https://www.figma.com/proto/pZSVeK9mibtuosmvaOvZqH/ACA-House-Website",
    },
    {
      title: "Styla Store",
      description:
        "A dynamic and visually appealing interactive prototype for Styla Store",
      image: styla,
      category: "UI/UX Design",
      link: "https://www.figma.com/proto/sArhXdiFze37Zy3b9jttYp/Styla",
    },
    {
      title: "Frestica Landing Page",
      description: "Modern and minimalist landing page design for Frestica",
      image: frestica,
      category: "UI/UX Design",
      link: "https://www.figma.com/proto/X2kgwEGbpiv5Dr0XBbi5Co/Frestica",
    },
    {
      title: "Visual Mobile App Store",
      description: "Modern and minimalist landing page design for Visual",
      image: backpack,
      category: "UI/UX Design",
      link: "https://www.figma.com/proto/QCgWee44sZ2ezhCwOpUY1O",
    },
  ];

  const fetchGitHubProjects = useCallback(async () => {
    setLoading(true);
    try {
      const octokit = new Octokit({
        auth: import.meta.env.VITE_GITHUB_TOKEN,
      });

      const { data: repos } = await octokit.repos.listForUser({
        username: githubUsername,
        sort: "updated",
        per_page: 100,
      });

      const projects = await Promise.all(
        repos.map(async (repo, index) => {
          // Get default image (cycle through available images)
          const imageIndex = index % defaultImages.length;
          const image = defaultImages[imageIndex];

          return {
            title: repo.name,
            description: repo.description || "No description available",
            technologies: repo.topics || [],
            github: repo.html_url,
            demo: repo.homepage || undefined,
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            lastUpdated: repo.updated_at || repo.pushed_at || "",
            isOwn: !repo.fork,
            image,
          };
        })
      );

      setDevProjects(projects);

      // Extract all unique technologies
      const allTechs = Array.from(
        new Set(projects.flatMap((project) => project.technologies))
      );
      setTechnologies(["All", ...allTechs]);
    } catch (err) {
      setError("Failed to fetch projects from GitHub");
      console.error("GitHub API error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubProjects();
  }, [fetchGitHubProjects]);

  const filteredProjects = useMemo(() => {
    if (activeType === "design") {
      // Filter design projects
      const projects = designProjects;
      if (!searchQuery) return projects;

      const query = searchQuery.toLowerCase();
      return projects.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          (project.category && project.category.toLowerCase().includes(query))
      );
    } else {
      // Filter GitHub projects
      let filtered = [...devProjects];

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            project.technologies.some((tech) =>
              tech.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
      }

      // Filter by technology
      if (filter !== "All") {
        filtered = filtered.filter((project) =>
          project.technologies.includes(filter)
        );
      }

      // Filter by ownership
      filtered = filtered.filter((project) =>
        activeTab === "own" ? project.isOwn : !project.isOwn
      );

      // Sort projects
      return filtered.sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case "stars":
            comparison = b.stars - a.stars;
            break;
          case "forks":
            comparison = b.forks - a.forks;
            break;
          case "updated":
            comparison =
              new Date(b.lastUpdated).getTime() -
              new Date(a.lastUpdated).getTime();
            break;
          case "name":
            comparison = a.title.localeCompare(b.title);
            break;
        }
        return sortOrder === "asc" ? -comparison : comparison;
      });
    }
  }, [
    activeType,
    searchQuery,
    devProjects,
    designProjects,
    filter,
    activeTab,
    sortBy,
    sortOrder,
  ]);

  const resetAllFilters = () => {
    setFilter("All");
    setActiveTab("own");
    setSortBy("updated");
    setSortOrder("desc");
    setSearchQuery("");
  };

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-transparent transition-colors duration-300"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          PROJECTS
        </h2>

        <div className="flex justify-center space-x-4 mb-12">
          <button
            type="button"
            onClick={() => setActiveType("development")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeType === "development"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700/70"
            }`}
          >
            DEVELOPMENT
          </button>
          <button
            type="button"
            onClick={() => setActiveType("design")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeType === "design"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700/70"
            }`}
          >
            DESIGN
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col items-center justify-center w-full mb-12 gap-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-3 bg-white dark:bg-white/10 backdrop-blur-sm border-2 border-gray-200 dark:border-transparent rounded-full text-gray-800 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 w-5 h-5" />
          </div>

          {activeType === "development" && (
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "stars" | "updated" | "forks" | "name"
                    )
                  }
                  className="px-3 py-2 rounded-lg bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                >
                  <option value="updated">Last Updated</option>
                  <option value="stars">Stars</option>
                  <option value="forks">Forks</option>
                  <option value="name">Name</option>
                </select>

                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="p-2 rounded-lg bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-blue-500/50 dark:hover:border-blue-500/50 w-9 h-9 flex items-center justify-center transition-colors"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
              >
                <option value="All">All Technologies</option>
                {technologies
                  .filter((tech) => tech !== "All")
                  .map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
              </select>

              <button
                onClick={resetAllFilters}
                className="px-3 py-2 rounded-lg bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-blue-500/50 dark:hover:border-blue-500/50 flex items-center gap-1.5 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Clear All
              </button>
            </div>
          )}

          {activeType === "development" && (
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setActiveTab("own")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "own"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700/50"
                }`}
              >
                <User size={16} />
                My Projects
              </button>
              <button
                onClick={() => setActiveTab("contributed")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "contributed"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800/50 text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700/50"
                }`}
              >
                <GitBranch size={16} />
                Contributed
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeType === "development"
              ? filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    tags={"technologies" in project ? project.technologies : []}
                    github={"github" in project ? project.github || "" : ""}
                    demo={"demo" in project ? project.demo : undefined}
                    image={project.image || "https://via.placeholder.com/150"}
                    stars={"stars" in project ? project.stars : 0}
                    forks={"forks" in project ? project.forks : undefined}
                    lastUpdated={
                      "lastUpdated" in project ? project.lastUpdated : undefined
                    }
                  />
                ))
              : filteredProjects.map((project, index) => (
                  <DesignCard key={index} {...project} />
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
