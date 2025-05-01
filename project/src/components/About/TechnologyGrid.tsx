import React from "react";
import {
  Code2,
  FileType,
  Atom,
  Zap,
  Palette,
  BarChart3,
  Server,
  Database,
  GitBranch,
  Github,
  Box,
  Code,
  Rocket,
  Bot,
  Link,
} from "lucide-react";

interface Technology {
  name: string;
  icon: React.ReactNode;
}

export function TechnologyGrid() {
  const technologies: Technology[] = [
    { name: "JavaScript", icon: <Code2 /> },
    { name: "TypeScript", icon: <FileType /> },
    { name: "React", icon: <Atom /> },
    { name: "Next.js", icon: <Zap /> },
    { name: "Tailwind CSS", icon: <Palette /> },
    { name: "Node.js", icon: <Server /> },
    { name: "MongoDB", icon: <Database /> },
    { name: "Git", icon: <GitBranch /> },
    { name: "GitHub", icon: <Github /> },
    { name: "Docker", icon: <Box /> },
    { name: "VS Code", icon: <Code /> },
    { name: "Astro", icon: <Rocket /> },
    { name: "OpenAI", icon: <Bot /> },
    { name: "Web3", icon: <Link /> },
    { name: "Analytics", icon: <BarChart3 /> },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Technologies
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
              {tech.icon}
            </div>
            <span className="text-sm text-center text-gray-700 dark:text-gray-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
