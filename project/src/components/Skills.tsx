import { SkillCard } from "./SkillCard";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiMysql } from "react-icons/si";
import { MdEmail, MdAnalytics, MdAutoGraph } from "react-icons/md";

export function Skills() {
  const skills = {
    development: [
      { name: "React", level: 95, color: "bg-blue-500", icon: <FaReact /> },
      { name: "Node.js", level: 65, color: "bg-blue-500", icon: <FaNodeJs /> },
      {
        name: "TypeScript",
        level: 70,
        color: "bg-blue-500",
        icon: <SiTypescript />,
      },
      { name: "Python", level: 80, color: "bg-blue-500", icon: <FaPython /> },
      { name: "SQL", level: 80, color: "bg-blue-500", icon: <SiMysql /> },
      { name: "MongoDB", level: 80, color: "bg-blue-500", icon: <SiMongodb /> },
    ],
    marketing: [
      {
        name: "Email Marketing",
        level: 90,
        color: "bg-purple-500",
        icon: <MdEmail />,
      },
      {
        name: "Campaign Strategy",
        level: 80,
        color: "bg-purple-500",
        icon: <MdAutoGraph />,
      },
      {
        name: "A/B Testing",
        level: 80,
        color: "bg-purple-500",
        icon: <MdAnalytics />,
      },
      {
        name: "Analytics",
        level: 80,
        color: "bg-purple-500",
        icon: <MdAnalytics />,
      },
      {
        name: "Automation",
        level: 85,
        color: "bg-purple-500",
        icon: <MdAutoGraph />,
      },
      {
        name: "CRM Systems",
        level: 80,
        color: "bg-purple-500",
        icon: <MdAnalytics />,
      },
    ],
  };

  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-transparent">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-white">
              Development
            </h3>
            <div className="space-y-6">
              {skills.development.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  icon={skill.icon}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-white">
              Marketing
            </h3>
            <div className="space-y-6">
              {skills.marketing.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  icon={skill.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
