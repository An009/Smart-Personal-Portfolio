import React from "react";
import heroBg from "@/assets/Etheron.png";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: 0.2,
        }}
      />
      <div className="absolute inset-0 bg-gray-900/70" />{" "}
    </div>
  );
}
