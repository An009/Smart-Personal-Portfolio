import React, { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle.tsx";
import { Menu, X } from "lucide-react";
import { NavLink } from "./NavLink.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(globalThis.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      if (totalHeight > 0) {
        setScrollProgress((scrolled / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate(`/${href}`);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 text-gray-100${
        isScrolled
          ? "bg-gray-100 dark:bg-gray-800/50 backdrop-blur-md rounded-lg shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink
            href="#Hero"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
              handleNavClick(e, "#Hero")
            }
          >
            <span className="text-3xl font-bold text-gray-400 dark:text-white">
              ⵣ
            </span>
          </NavLink>

          <nav className="hidden md:flex space-x-12">
            <NavLink
              href="#about"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, "#about")
              }
              className="text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              about
            </NavLink>
            <NavLink
              href="#skills"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, "#skills")
              }
              className="text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              skills
            </NavLink>
            <NavLink
              href="#projects"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, "#projects")
              }
              className="text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              projects
            </NavLink>
            <NavLink
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, "#contact")
              }
              className="text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              contact
            </NavLink>
            <Link
              to="/resume"
              className="uppercase tracking-wider text-sm font-medium relative group text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              resume
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/blog"
              className="uppercase tracking-wider text-sm font-medium relative group text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden hover:text-blue-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-300 dark:border-gray-800">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <NavLink
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="block py-3 px-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 rounded-lg text-gray-500 dark:text-gray-300"
            >
              about
            </NavLink>
            <NavLink
              href="#skills"
              onClick={(e) => handleNavClick(e, "#skills")}
              className="block py-3 px-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 rounded-lg text-gray-500 dark:text-gray-300"
            >
              skills
            </NavLink>
            <NavLink
              href="#projects"
              onClick={(e) => handleNavClick(e, "#projects")}
              className="block py-3 px-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 rounded-lg text-gray-500 dark:text-gray-300"
            >
              projects
            </NavLink>
            <NavLink
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="block py-3 px-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 rounded-lg text-gray-500 dark:text-gray-300"
            >
              contact
            </NavLink>
            <Link
              to="/resume"
              className="block py-3 px-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 rounded-lg uppercase tracking-wider text-sm font-medium text-gray-500 dark:text-gray-300"
            >
              resume
            </Link>
            <Link
              to="/blog"
              className="block py-3 px-4 hover:bg-gray-200 dark:hover:bg-gray-800/50 rounded-lg uppercase tracking-wider text-sm font-medium text-gray-500 dark:text-gray-300"
            >
              blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      )}
      {/* Scroll Progress Line */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}