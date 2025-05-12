import React, { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleAnimation } from "./ParticleAnimation.tsx";
import { HeroBackground } from "./HeroBackground.tsx";
import { ProfileImage } from "./ProfileImage.tsx";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const title = "ⴰⵣⵓⵍ";
  const subtitle = "Creative People";

  return (
    <section
      id="Hero"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <HeroBackground />
      <ParticleAnimation />
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 text-center relative z-0"
      >
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
              style={{
                background: `linear-gradient(${
                  i * 10
                }deg,rgb(209, 218, 230), #A855F7)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <br />
          <motion.span
            variants={titleVariants}
            className="block text-3xl md:text-5xl mt-4"
          >
            {subtitle.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block"
                style={{
                  background: `linear-gradient(${
                    i * 10
                  }deg,rgb(239, 246, 247),rgb(9, 78, 103))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        <ProfileImage
          alt="Profile"
          size="w-64 h-64"
          src="/path/to/profile-image.jpg"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center space-x-6 mb-12"
        >
          {[
            { Icon: Github, href: "https://github.com" },
            { Icon: Linkedin, href: "https://linkedin.com" },
            { Icon: Mail, href: "#contact" },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:text-blue-400"
            >
              <Icon className="w-8 h-8" />
            </motion.a>
          ))}
        </motion.div>

        <motion.a
          href="#contact"
          onClick={handleContactClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold relative overflow-hidden group"
        >
          <span className="relative z-10">Get In Touch</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </motion.div>
    </section>
  );
}
