import { projects } from "@/app/lib/data";
import ProjectCard from "./ProjectCard";
import Section from "./Section";

// Featured work first, then the rest in their listed order.
const ordered = [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
];

export default function Projects() {
  return (
    <Section id="development" index="03" title="Development">
      <p className="mb-10 max-w-xl text-lg text-ash">
        {projects.length} projects across machine learning, computer vision,
        mobile, and web — from solo notebooks to a team product in production.
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ordered.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
