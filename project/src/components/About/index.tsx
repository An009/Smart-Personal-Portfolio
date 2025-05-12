import { ProfileSection } from "./ProfileSection";
import { TechnologyGrid } from "./TechnologyGrid";
import GitHubStats from "../GitHubStats";

export function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gray-100 dark:bg-transparent transition-colors duration-300"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
          About Me
        </h2>
        <ProfileSection />
        <TechnologyGrid />
        <GitHubStats />
      </div>
    </section>
  );
}
