import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";
import PageHeader from "../../components/PageHeader";
import Rail from "../../components/Rail";
import { projects } from "../../lib/data";
import { itemsFor } from "../../lib/design";

// Only projects with a gallery get a detail page.
const detailed = projects.filter((p) => p.gallery && p.slug);

export function generateStaticParams() {
  return detailed.map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
  params,
}: PageProps<"/development/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = detailed.find((x) => x.slug === slug);
  return p ? { title: `${p.pageTitle ?? p.title} — Michael Peterson`, description: p.description } : {};
}

export default async function ProjectPage({ params }: PageProps<"/development/[slug]">) {
  const { slug } = await params;
  const project = detailed.find((x) => x.slug === slug);
  if (!project) notFound();

  const index = String(projects.indexOf(project) + 1).padStart(2, "0");
  const items = itemsFor(project.gallery as string);

  const actions = [
    ...(project.demo ? [{ href: project.demo, label: "Open live app" }] : []),
    ...(project.repo ? [{ href: project.repo, label: project.repoLabel ?? "Open repository" }] : []),
    ...(project.notebook ? [{ href: project.notebook, label: "Open notebook" }] : []),
    ...(project.presentation ? [{ href: project.presentation, label: "Watch presentation" }] : []),
    ...(project.report ? [{ href: project.report, label: "Final report & files" }] : []),
    ...(project.docs ? [{ href: project.docs, label: "Documentation" }] : []),
    ...(project.design ? [{ href: project.design, label: "See the design" }] : []),
    ...(project.links ?? []),
  ];

  return (
    <>
      <Rail current="development" />
      <div className="md:pl-[var(--rail-w)]">
        <main>
          <PageHeader
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/#development", label: "Development" },
              { href: `/development/${project.slug}`, label: project.shortTitle ?? project.title },
            ]}
            index={`03.${index}`}
            title={project.pageTitle ?? project.title}
            intro={project.galleryIntro ?? project.description}
            meta={[project.category, project.role].join(" / ")}
            actions={actions}
          />

          <div className="mx-auto max-w-7xl px-5 py-12 md:px-12 md:py-16">
            {/* Tech + description block */}
            <div className="mb-12 grid gap-8 border-b border-steel pb-10 lg:grid-cols-[1.4fr_1fr]">
              <div className="max-w-2xl space-y-4">
                <p className="text-lg leading-relaxed text-bone">{project.description}</p>
                {project.demoNote && (
                  <p className="text-sm leading-relaxed text-ash">{project.demoNote}</p>
                )}
              </div>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 self-start text-base text-ash lg:justify-end">
                {project.tech.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span aria-hidden className="h-2 w-2 bg-signal" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <Gallery sections={[{ label: null, items }]} ratio="wide" captions="title" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
