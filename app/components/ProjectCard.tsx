import Link from "next/link";
import type { Project } from "@/app/lib/data";
import { collectionBySlug, coverFor, screenFor } from "@/app/lib/design";
import { ExternalLinkIcon, GithubIcon } from "./icons";

const linkClass =
  "font-display inline-flex items-center gap-2 text-lg font-bold text-bone transition-colors hover:text-signal";

// Card image, in order of preference: explicit path, a screenshot from the
// College folder, or the cover of the project's design collection.
export function projectImage(project: Project): string | undefined {
  if (project.image) return project.image;
  if (project.screen) {
    const hit = screenFor(project.screen, ["dev-screens", ...(project.gallery ? [project.gallery] : [])]);
    if (hit) return hit.thumb;
  }
  if (project.design) {
    const c = collectionBySlug(project.design.split("/").pop() ?? "");
    return c ? coverFor(c)?.thumb : undefined;
  }
  return undefined;
}

function Thumb({ project }: { project: Project }) {
  const src = projectImage(project);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={project.title}
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return (
    <div className="tech-grid flex h-full w-full items-end bg-ink">
      <span className="label m-4">No screenshot yet</span>
    </div>
  );
}

type Props = { project: Project; index: number };

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
      {/* Thumbnail — featured cards cap the image at 4:3 so the text column
          never floats in empty space; the image is cropped from the top. */}
      <div
        className={`relative shrink-0 border-steel ${
          featured
            ? "aspect-video border-b md:aspect-[4/3] md:w-[46%] md:border-b-0 md:border-r"
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

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {project.gallery && project.slug && (
            <Link href={`/development/${project.slug}`} className={linkClass}>
              See the build
            </Link>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className={linkClass}>
              <ExternalLinkIcon width={16} height={16} />
              Open live app
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className={linkClass}>
              <GithubIcon width={16} height={16} />
              Open repository
            </a>
          )}
          {project.notebook && (
            <a href={project.notebook} target="_blank" rel="noreferrer" className={linkClass}>
              <ExternalLinkIcon width={16} height={16} />
              Open notebook
            </a>
          )}
          {project.presentation && (
            <a href={project.presentation} target="_blank" rel="noreferrer" className={linkClass}>
              <ExternalLinkIcon width={16} height={16} />
              Watch the presentation
            </a>
          )}
          {project.report && (
            <a href={project.report} target="_blank" rel="noreferrer" className={linkClass}>
              <ExternalLinkIcon width={16} height={16} />
              Final report
            </a>
          )}
          {project.docs && (
            <a href={project.docs} target="_blank" rel="noreferrer" className={linkClass}>
              <ExternalLinkIcon width={16} height={16} />
              Documentation
            </a>
          )}
          {project.design && (
            <Link href={project.design} className={linkClass}>
              See the design
            </Link>
          )}
          {!project.repo && project.repoNote && (
            <span className="inline-flex items-center gap-2 text-sm text-ash">
              <GithubIcon width={14} height={14} />
              {project.repoNote}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
