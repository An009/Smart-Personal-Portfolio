import React, { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleAnimation } from "./ParticleAnimation.tsx";
import { HeroBackground } from "./HeroBackground.tsx";
import { ProfileImage } from "./ProfileImage.tsx";
import Purpplep from "../assets/purpplep.png";

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
  const subtitle = "CREATIVE COMMUNITY";

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
          <motion.span className="inline-block animate-gradient bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
          <br />
          <motion.span
            variants={titleVariants}
            className="block text-3xl md:text-5xl mt-4 animate-gradient bg-gradient-to-r from-teal-300 to-blue-500 bg-clip-text text-transparent"
          >
            {subtitle.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mx-auto mb-8 animate-pulse-slow"
        >
          <ProfileImage alt="Profile" size="w-64 h-64" src={Purpplep} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center space-x-6 mb-12"
        >
          {[
            { Icon: Github, href: "https://github.com/An009" },
            {
              Icon: Linkedin,
              href: "https://www.linkedin.com/in/tizgui-anouar-081439183/",
            },
            { Icon: Mail, href: "#contact" },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              whileHover={{
                scale: 1.2,
                rotate: 5,
                boxShadow: "0 0 15px rgba(129, 140, 248, 0.7)",
              }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-300 hover:text-blue-400 transition-all duration-300 rounded-full"
              target={href.startsWith("#") ? "_self" : "_blank"}
              rel={href.startsWith("#") ? "" : "noopener noreferrer"}
            >
              <Icon className="w-7 h-7" />
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
            scale: 1.03,
            boxShadow: "0 0 25px rgba(59, 130, 246, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-bold relative overflow-hidden group text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="relative z-10">Get In Touch</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </motion.div>
    </section>
  );
}
