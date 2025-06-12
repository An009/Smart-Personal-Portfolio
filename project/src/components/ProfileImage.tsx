import React from "react";
import { motion } from "framer-motion";
import purpplep from "@/assets/purpplep.png";

interface ProfileImageProps {
  alt: string;
  size?: string;
  src?: string;
}

export function ProfileImage({ alt, size = "w-64 h-64" }: ProfileImageProps) {
  return (
    <div className={`relative ${size} mx-auto mb-8`}>
      <motion.img
        src={purpplep}
        alt={alt}
        className="absolute inset-[12px] w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-full object-cover z-10"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      />
    </div>
  );
}
