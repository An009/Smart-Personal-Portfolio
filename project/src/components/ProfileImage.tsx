import React from "react";
import { motion } from "framer-motion";
import earth from "@/assets/purppleP.png";

interface ProfileImageProps {
  alt: string;
  size?: string;
  src: string;
}

export function ProfileImage({ alt, size = "w-64 h-64" }: ProfileImageProps) {
  return (
    <div className={`relative ${size} mx-auto mb-8`}>
      <div className="absolute inset-[80px] bg-gray-800 rounded-full z-100" />
      {/* Spinning image */}
      <motion.img
        src={earth}
        alt={alt}
        className="absolute inset-0 w-full h-full rounded-full object-cover z-30"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        }}
      />
    </div>
  );
}
