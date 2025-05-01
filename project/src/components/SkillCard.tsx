import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  level: number;
  color: string;
  icon: React.ReactNode; // Add icon prop
}

export function SkillCard({ name, level, color, icon }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative hover:scale-105 transition-transform duration-300 shadow-lg p-4 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      <div className="flex justify-between mb-2">
        <span className="flex items-center gap-2 text-gray-800 dark:text-white">
          {icon} {name}
        </span>
        <span className="text-gray-800 dark:text-white">{level}%</span>
      </div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </motion.div>
  );
}
