import React from "react";
import { ExternalLink, Github, Star, GitFork, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  github,
  demo,
  stars = 0,
  forks = 0,
  lastUpdated = "",
}: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl h-full flex flex-col"
    >
      <div className="relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          {/* GitHub stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            {stars > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {stars}
              </span>
            )}
            {forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {forks}
              </span>
            )}
            {lastUpdated && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(lastUpdated)}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex space-x-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Code</span>
            </a>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
