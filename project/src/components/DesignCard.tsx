import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface DesignCardProps {
  title: string;
  description: string;
  image?: string;
  category: string;
  link: string;
  figmaEmbed?: string;
}

export function DesignCard({
  title,
  description,
  image,
  category,
  link,
  figmaEmbed,
}: DesignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-gray-700/30 backdrop-blur-sm"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {figmaEmbed ? (
        <div className="relative h-full w-full">
          <iframe
            src={figmaEmbed}
            className="absolute inset-0 w-full h-full"
            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
            allow="fullscreen; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-popups"
            allowFullScreen
          />
          {/* Fallback Image in Case Figma Embed Fails */}
          <noscript>
            <img
              src={`https://api.figma.com/v1/images/${figmaEmbed}?format=png`}
              alt="Figma Preview"
              className="w-full h-full object-cover"
            />
          </noscript>
        </div>
      ) : (
        image && (
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )
      )}

      {/* Card Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
        <span className="inline-block px-3 py-1 mb-3 text-sm rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/20">
          {category}
        </span>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <a
          href={link}
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>View Design</span>
          <ExternalLink className="w-4 h-4" />
        </a>
        {/* Figma Open in New Tab */}
        {figmaEmbed && (
          <a
            href={figmaEmbed}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-400 hover:text-blue-300 transition-colors text-center mt-4"
          >
            Open in Figma
          </a>
        )}
      </div>
    </motion.div>
  );
}
