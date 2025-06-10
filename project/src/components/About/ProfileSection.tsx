import profile from "../../assets/profile-bg.png";
import React from "react";

export function ProfileSection() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div className="w-48 h-48 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow" />
        <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
        <img
          src={profile}
          alt="Profile"
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Hey there, I'm Anouar
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          A Full Stack Developer based in Morocco. I dive deep into JavaScript
          and love crafting sleek, efficient web apps. With an eye for detail
          and a hunger for learning, I'm all about delivering high-quality
          solutions that meet both user needs and business objectives.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
          Email Marketing? Oh, that's my jam. I geek out on building campaigns
          that convert and drive results.
        </p>
      </div>
    </div>
  );
}
