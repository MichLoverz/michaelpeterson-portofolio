import type { Project } from "@/app/lib/data";
import { ExternalLinkIcon, GithubIcon } from "./icons";

type Props = { project: Project; index: number };

function Thumb({ project }: { project: Project }) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="tech-grid flex h-full w-full items-end bg-ink">
      <span className="label m-4">No screenshot yet</span>
    </div>
  );
}

export default function ProjectCard({ project, index }: Props) {
  const featured = project.featured;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`chamfer group flex border border-steel bg-graphite ${
        featured
          ? "flex-col md:col-span-2 md:flex-row lg:col-span-3"
          : "flex-col"
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative shrink-0 border-steel ${
          featured
            ? "aspect-video border-b md:aspect-auto md:w-[46%] md:border-b-0 md:border-r"
            : "aspect-video border-b"
        }`}
      >
        <Thumb project={project} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="label flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 bg-signal" />
            {project.category}
          </span>
          <span className="font-display text-sm text-ash">{num}</span>
        </div>

        <h3
          className={`font-display mt-4 font-bold leading-none text-bone transition-colors group-hover:text-signal ${
            featured ? "text-4xl md:text-5xl" : "text-3xl"
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-4 max-w-prose flex-1 text-base leading-relaxed text-ash">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-steel pt-5">
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-bone">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <span className="ml-auto text-sm text-ash">{project.role}</span>
        </div>

        <div className="mt-5 flex gap-5">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="font-display inline-flex items-center gap-2 text-lg font-bold text-bone transition-colors hover:text-signal"
            >
              <GithubIcon width={16} height={16} />
              Open repository
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="font-display inline-flex items-center gap-2 text-lg font-bold text-bone transition-colors hover:text-signal"
            >
              <ExternalLinkIcon width={16} height={16} />
              Open live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
