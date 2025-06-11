import React from "react";
import Languages from "../components/Languages.tsx";
import Hobbies from "../components/Hobbies.tsx";
import resumePDF from "../assets/resume.pdf";

const featuredProjects = [
  {
    title: "Smart Personal Portfolio",
    description:
      "A modern developer portfolio with an integrated AI assistant, dynamic content, and GitHub API stats. Features dark mode, responsive UI, markdown blog, and project cards with live data.",
    technologies: ["React", "TypeScript", "TailwindCSS", "OpenAI API"],
    github: "https://github.com/An009/Smart-Personal-Portfolio",
    demo: "https://anouarcodes.tech",
    stars: 20,
    forks: 3,
    lastUpdated: "2025-05-30",
  },
  {
    title: "Online Shopping App (Redux Thunk)",
    description:
      "A full-featured e-commerce web app with product catalog, cart, and authentication, using React, Redux Thunk for async state, and a modern shopping UI.",
    technologies: ["React", "Redux Thunk", "CSS3", "JavaScript"],
    github: "https://github.com/An009/Online-Shoping-App-redux-thunk",
    demo: "",
    stars: 10,
    forks: 2,
    lastUpdated: "2024-11-14",
  },
  {
    title: "Wordio",
    description:
      "A fun word game web app inspired by Wordle. Challenging logic and vocabulary with a clean, interactive UI and daily puzzles.",
    technologies: ["React", "TypeScript", "CSS3"],
    github: "https://github.com/An009/wordio",
    demo: "",
    stars: 7,
    forks: 1,
    lastUpdated: "2025-03-01",
  },
  {
    title: "Stock Manager GUI (Tkinter)",
    description:
      "A desktop inventory and stock management system built in Python using Tkinter. Easily add, update, and monitor product stock with a simple GUI.",
    technologies: ["Python", "Tkinter", "SQLite"],
    github: "https://github.com/An009/stockManager_gui_tkinter",
    demo: "",
    stars: 5,
    forks: 1,
    lastUpdated: "2024-09-10",
  },
];

export function Resume() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-transparent transition-colors duration-300 flex items-center justify-center pt-20">
      <div className="relative max-w-6xl w-full p-8 bg-white/80 dark:bg-[#1c1a2e]/90 rounded-3xl shadow-2xl mt-10 mb-10 backdrop-blur-lg border border-gray-200 dark:border-[#35316a] flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-1">
              Tizgui Anouar
            </h1>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Web Developer <span className="mx-2 text-gray-400">|</span> Email
              Marketer
            </h2>
            <div className="flex flex-wrap gap-2 text-base mb-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full shadow">
                📞 +212 690334225
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full shadow">
                📍 Al Irfane 1, Boukhalef, Tanger
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full shadow">
                ✉️ tizguianouar@gmail.com
              </span>
            </div>
            <div className="flex flex-wrap gap-3 items-center mt-2">
              <a
                href={resumePDF}
                download="Anouar_Tizgui_Resume.pdf"
                className="group relative inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-xl overflow-hidden transition-all duration-300 hover:from-pink-500 hover:to-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <svg
                  className="mr-2 w-5 h-5 text-white group-hover:text-gray-100 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12"
                  />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* About Me */}
        <section>
          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            🧑‍💼 About Me
          </h3>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
            Passionate Web Developer and Email Marketer with a strong foundation
            in software development, UI/UX design, and marketing automation.
            Skilled in React, Laravel, and Python with a problem-solving mindset
            and a passion for building efficient, responsive web experiences.
            Fluent in four languages and ready to contribute to innovative
            teams.
          </p>
        </section>

        {/* Projects Section */}
        <section>
          <h3 className="text-2xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            🚀 Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {featuredProjects.map((project, _idx) => (
              <div
                key={project.title}
                className={`flex flex-col justify-between group relative rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 h-full bg-gradient-to-br from-blue-200/60 via-purple-200/60 to-pink-200/60 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40
                  backdrop-blur-md overflow-hidden hover:scale-[1.025] hover:shadow-2xl transition-transform duration-200`}
                style={{
                  boxShadow:
                    "0 4px 32px 0 rgba(80,56,211,0.07), 0 2.5px 12px 0 rgba(176,67,255,0.08)",
                }}
              >
                <div>
                  <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-1 drop-shadow">
                    {project.title}
                  </h4>
                  <p className="mb-3 text-gray-800 dark:text-gray-200">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag-skill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 items-center text-sm mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Live Demo
                    </a>
                  )}
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.387-2.46a1 1 0 00-1.175 0l-3.387 2.46c-.783.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                    {project.stars}
                  </span>
                  {project.forks > 0 && (
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 20a3 3 0 0 0 2.995-2.824L20 17v-2.382a3 3 0 0 0-.879-2.121l-3.293-3.293A1 1 0 0 1 16 8.382V7a3 3 0 1 0-2 0v1.382a1 1 0 0 1-.293.707l-3.293 3.293A3 3 0 0 0 4 14.618V17a3 3 0 0 0 2.824 2.995L7 20h10ZM17 18H7a1 1 0 0 1-.993-.883L6 17v-2.382a1 1 0 0 1 .293-.707l3.293-3.293a3 3 0 0 0 4.242 0l3.293 3.293a1 1 0 0 1 .293.707V17a1 1 0 0 1-.883.993L17 18Z" />
                      </svg>
                      {project.forks}
                    </span>
                  )}
                  <span className="ml-auto text-xs text-gray-400">
                    Updated: {project.lastUpdated}
                  </span>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-2xl z-0 bg-gradient-to-br from-blue-300/10 via-purple-300/10 to-pink-300/20 blur-xl opacity-70 group-hover:opacity-90 group-hover:blur-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            💼 Work Experience
          </h3>
          <div className="space-y-5">
            <div className="p-4 bg-gray-100 dark:bg-[#2a2642] rounded-xl shadow transition">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Email Marketer
              </h4>
              <div className="flex flex-wrap justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                <span>Operating Media, Tanger</span>
                <span className="italic text-purple-600 dark:text-purple-300">
                  Aug 2024 – Present
                </span>
              </div>
              <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200 space-y-1">
                <li>
                  Executed targeted email campaigns aligned with brand
                  strategies.
                </li>
                <li>
                  Wrote compelling subject lines and CTAs to increase
                  engagement.
                </li>
                <li>
                  Tracked open, click-through, and conversion rates using
                  analytics tools.
                </li>
                <li>
                  Ensured high inbox deliverability and managed sender
                  reputation.
                </li>
                <li>Collaborated across design, sales, and product teams.</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-[#2a2642] rounded-xl shadow transition">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Laser Technician
              </h4>
              <div className="flex flex-wrap justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                <span>KLC Plastics Maroc, Tanger</span>
                <span className="italic text-purple-600 dark:text-purple-300">
                  Aug 2023 – Aug 2024
                </span>
              </div>
              <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200 space-y-1">
                <li>
                  Installed and configured laser systems per client specs.
                </li>
                <li>Applied safety protocols and maintained documentation.</li>
                <li>Supported engineering teams to optimize performance.</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-[#2a2642] rounded-xl shadow transition">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Web Development Intern
              </h4>
              <div className="flex flex-wrap justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                <span>Stryve Solutions, Marrakech</span>
                <span className="italic text-purple-600 dark:text-purple-300">
                  April 2023 (30 days)
                </span>
              </div>
              <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200 space-y-1">
                <li>Designed Figma prototypes for a restaurant homepage.</li>
                <li>Built responsive UI with React and integrated APIs.</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-[#2a2642] rounded-xl shadow transition">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Freelance Web Developer
              </h4>
              <div className="flex flex-wrap justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                <span>Remote, Morocco</span>
                <span className="italic text-purple-600 dark:text-purple-300">
                  May 2019 – Mar 2020
                </span>
              </div>
              <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200 space-y-1">
                <li>
                  Developed responsive websites using HTML, CSS, Bootstrap,
                  jQuery.
                </li>
                <li>
                  Created intuitive Figma designs for web and mobile interfaces.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            🎓 Education
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-[#2a2642] rounded-xl shadow transition">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Bachlor degree in Computer Science
              </h4>
              <div className="flex flex-wrap justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                <span>Hybrid – Tangier</span>
                <span className="italic text-purple-600 dark:text-purple-300">
                  Sep 2024 – in process
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-[#2a2642] rounded-xl shadow transition">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Specialized Technician Diploma in Full Stack Web Development
              </h4>
              <div className="flex flex-wrap justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                <span>OFPPT – Tinghir</span>
                <span className="italic text-purple-600 dark:text-purple-300">
                  Sep 2021 – Jul 2023
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-[#2a2642] rounded-xl shadow transition">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Baccalauréat in Physics & Chemistry
              </h4>
              <div className="flex flex-wrap justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
                <span>Moulay Abdellah Ben Hssain High School, Tinghir</span>
                <span className="italic text-purple-600 dark:text-purple-300">
                  Jul 2016
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            🧠 Skills
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                Programming & Scripting
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag-skill">Python</span>
                <span className="tag-skill">JavaScript</span>
                <span className="tag-skill">PHP</span>
                <span className="tag-skill">HTML5</span>
                <span className="tag-skill">CSS3</span>
                <span className="tag-skill">TypeScript</span>
                <span className="tag-skill">SQL</span>
              </div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                Frameworks & Libraries
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag-skill">React</span>
                <span className="tag-skill">Redux Thunk</span>
                <span className="tag-skill">Vue.js</span>
                <span className="tag-skill">Laravel</span>
                <span className="tag-skill">Bootstrap</span>
                <span className="tag-skill">jQuery</span>
                <span className="tag-skill">TailwindCSS</span>
                <span className="tag-skill">Chart.js</span>
                <span className="tag-skill">Tkinter</span>
              </div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                Tools & Platforms
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag-skill">MySQL</span>
                <span className="tag-skill">PostgreSQL</span>
                <span className="tag-skill">MongoDB</span>
                <span className="tag-skill">Git</span>
                <span className="tag-skill">Docker</span>
                <span className="tag-skill">Jira</span>
                <span className="tag-skill">Visual Studio</span>
                <span className="tag-skill">Vercel</span>
                <span className="tag-skill">SQLite</span>
              </div>
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                Design & Marketing
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag-skill">Figma</span>
                <span className="tag-skill">Adobe Photoshop</span>
                <span className="tag-skill">MVC Architecture</span>
                <span className="tag-skill">UML</span>
                <span className="tag-skill">Email Campaign Creation</span>
                <span className="tag-skill">UI/UX Design</span>
                <span className="tag-skill">Marketing Automation</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag-skill">Problem-Solving Mindset</span>
                <span className="tag-skill">Critical Thinking</span>
                <span className="tag-skill">Team Collaboration</span>
                <span className="tag-skill">Detail-Oriented</span>
                <span className="tag-skill">Creativity</span>
                <span className="tag-skill">Communication</span>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            📜 Certifications
          </h3>
          <ul className="list-disc pl-5">
            <li>
              <a
                href="https://www.freecodecamp.org/certification/fccb0aa9990-8804-4cb0-b129-ea246bd296da/responsive-web-design"
                className="cert-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Responsive Web Design Certification – freeCodeCamp
              </a>
            </li>
            <li>
              <a
                href="https://www.freecodecamp.org/certification/fccb0aa9990-8804-4cb0-b129-ea246bd296da/front-end-development-libraries"
                className="cert-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Front End Development Libraries Certification – freeCodeCamp
              </a>
            </li>
            <li>
              <a
                href="https://www.freecodecamp.org/certification/fccb0aa9990-8804-4cb0-b129-ea246bd296da/relational-database-v8"
                className="cert-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Relational Database Certification – freeCodeCamp
              </a>
            </li>
            <li>
              <a
                href="https://www.freecodecamp.org/certification/fccb0aa9990-8804-4cb0-b129-ea246bd296da/data-analysis-with-python-v7"
                className="cert-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Analysis with Python – freeCodeCamp
              </a>
            </li>
            <li>
              <a
                href="https://www.credly.com/badges/dff08e57-dd7f-4cb0-8198-ff2d47e7b1ad/public_url"
                className="cert-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Office Specialist – Microsoft
              </a>
            </li>
          </ul>
        </section>

        {/* Languages and Hobbies */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Languages />
          <Hobbies />
        </section>
      </div>
      {/* Custom styling */}
      <style>{`
        .tag-skill {
          padding: 0.35rem 1rem;
          background: linear-gradient(90deg, #e0ecff 0%, #f3e8ff 50%, #ffe0ef 100%);
          color: #23497c;
          border-radius: 9999px;
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 0.2rem;
          margin-right: 0.2rem;
          display: inline-block;
          box-shadow: 0 1px 3px 0 #e2e8f0;
        }
        .dark .tag-skill {
          background: linear-gradient(90deg, #1e293b 0%, #3b2f58 50%, #471a39 100%);
          color: #dbeafe;
          box-shadow: 0 1px 3px 0 #1e293b;
        }
        .cert-link {
          display: inline-block;
          padding: 0.25rem 1rem;
          background: linear-gradient(90deg, #3b82f6 0%, #a21caf 100%);
          color: #fff;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.35rem;
          margin-top: 0.15rem;
          transition: background 0.3s, transform 0.2s;
          text-decoration: none;
          box-shadow: 0 2px 8px 0 #d1d5db55;
        }
        .cert-link:hover {
          background: linear-gradient(90deg, #a21caf 10%, #3b82f6 90%);
          transform: translateY(-2px) scale(1.04);
          color: #fff;
          box-shadow: 0 8px 24px 0 #a21caf44;
        }
        .project-link {
          display: inline-block;
          padding: 0.22rem 0.9rem;
          background: linear-gradient(90deg, #2563eb 0%, #a21caf 80%);
          color: #fff;
          border-radius: 9999px;
          font-weight: 500;
          font-size: 0.98rem;
          margin-bottom: 0.09rem;
          margin-top: 0.09rem;
          transition: background 0.25s, transform 0.18s;
          text-decoration: none;
          box-shadow: 0 2px 8px 0 #d1d5db33;
        }
        .project-link:hover {
          background: linear-gradient(90deg, #a21caf 0%, #2563eb 80%);
          transform: translateY(-1px) scale(1.04);
          color: #fff;
        }
          .list-disc{
            list-style: none;
          }
      `}</style>
    </div>
  );
}
