import React from "react";
import { ProfileImage } from "../components/ProfileImage.tsx";
import Languages from "../components/Languages.tsx";
import Hobbies from "../components/Hobbies.tsx";

export function Resume() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-transparent transition-colors duration-300">
      {/* Page Content */}
      <div className="flex items-center justify-center min-h-screen">
        {/* Blurred Small Page */}
        <div className="relative max-w-5xl w-full p-8 sm:p-12 bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-2xl mt-20 mb-5 backdrop-blur-md">
          {/* Content */}
          <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <ProfileImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                alt="Profile"
                size="w-32 h-32 rounded-full shadow-lg"
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                  ANOUAR TIZGUI
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                    Tanger, 90045, Morocco
                  </span>
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                    +212690334225
                  </span>
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                    tizguianouar@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                SUMMARY
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Dedicated and skilled Web Developer and Email Marketer with a
                strong foundation in software design, development, and
                maintenance, coupled with expertise in crafting effective email
                marketing campaigns. Proficient in multiple programming
                languages and frameworks, with a passion for problem-solving and
                creating efficient solutions. Seeking to contribute to
                innovative projects as a dynamic team member.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                WORK EXPERIENCE
              </h2>
              <div className="grid gap-6">
                {/* Email Marketer */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      Email Marketer
                    </h3>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600/50 text-gray-700 dark:text-gray-200 rounded-full">
                      Sep 2021 - Jul 2023
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    Operating Media, Tanger
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                    <li>
                      Develop, execute, and monitor email marketing campaigns
                      that align with brand strategies.
                    </li>
                    <li>
                      Write engaging subject lines, email copy, and
                      calls-to-action to improve open and click-through rates.
                    </li>
                    <li>
                      Track metrics such as open rates, click rates, and
                      conversion rates to measure campaign success.
                    </li>
                    <li>
                      Monitor email deliverability, manage sender reputation,
                      and resolve issues to maintain high inbox placement rates.
                    </li>
                    <li>
                      Work with design, sales, and product teams to align email
                      campaigns with larger business goals.
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      Email Marketing
                    </span>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      Campaign Analysis
                    </span>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      Copywriting
                    </span>
                  </div>
                </div>

                {/* Laser Technician */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      Laser Technician
                    </h3>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600/50 text-gray-700 dark:text-gray-200 rounded-full">
                      Aug 2023 - Aug 2024
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    KLC Plastics Maroc, Tanger
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                    <li>
                      Installed and commissioned laser systems according to
                      client specifications.
                    </li>
                    <li>
                      Configured laser parameters based on application
                      requirements.
                    </li>
                    <li>
                      Implemented safety measures to minimize risks associated
                      with laser operations.
                    </li>
                    <li>
                      Collaborated with engineering teams to enhance system
                      performance.
                    </li>
                    <li>
                      Maintained comprehensive documentation of installations
                      and maintenance tasks.
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      Laser Systems
                    </span>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      Technical Documentation
                    </span>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      Safety Protocols
                    </span>
                  </div>
                </div>

                {/* Intern */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      Intern
                    </h3>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600/50 text-gray-700 dark:text-gray-200 rounded-full">
                      Internship Period
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    Stryve Solutions, Marrakech
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                    <li>
                      Created high-fidelity Figma mockups for a restaurant
                      homepage, including sections for restaurant details,
                      featured dishes, and customer reviews.
                    </li>
                    <li>
                      Used React to implement the design, making it responsive
                      and interactive.
                    </li>
                    <li>Integrated dynamic data using APIs.</li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      Figma
                    </span>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      React
                    </span>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full">
                      API Integration
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                EDUCATION
              </h2>
              <div className="grid gap-6">
                {/* Specialized Technician diploma */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      Specialized Technician Diploma
                    </h3>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600/50 text-gray-700 dark:text-gray-200 rounded-full">
                      Sep 2021 - Jul 2023
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Specialized institute of Applied Technology (ISTA), Tinghir
                    | Web Full Stack Development
                  </p>
                </div>

                {/* Baccalauréat */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-md transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      Baccalauréat
                    </h3>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600/50 text-gray-700 dark:text-gray-200 rounded-full">
                      Jul 2016
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Moulay Abdellah Ben Hssain High School, Tinghir | Physics &
                    Chemistry
                  </p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                SKILLS
              </h2>
              <div className="grid gap-6">
                {/* Programming Languages */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Programming Languages
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      Python
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      JavaScript
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      PHP
                    </span>
                  </div>
                </div>

                {/* Frameworks */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      React
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      Vue.js
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      Laravel
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      Angular
                    </span>
                  </div>
                </div>

                {/* Database Management */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Database Management
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      SQL
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      MySQL
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      PostgreSQL
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      MongoDB
                    </span>
                  </div>
                </div>

                {/* Other Skills */}
                <div className="p-6 bg-gray-100 dark:bg-[#252B3B] rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Other Skills
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      Email Campaign Creation
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      Problem-Solving Mindset
                    </span>
                    <span className="px-6 py-3 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-lg shadow-lg">
                      Critical Thinking
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Languages and Hobbies */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Languages />
              <Hobbies />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
