import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";
import PageHeader from "../../components/PageHeader";
import Rail from "../../components/Rail";
import VideoGrid from "../../components/VideoGrid";
import {
  brandsFor,
  collectionBySlug,
  collections,
  collectionsIn,
  countFor,
  itemsFor,
  videoGroups,
} from "../../lib/design";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/design/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  return c
    ? { title: `${c.title} — Michael Peterson`, description: c.summary }
    : {};
}

export default async function CollectionPage({ params }: PageProps<"/design/[slug]">) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();

  // "04.<group letter><n>" — e.g. 04.A3 for the third graphic-design collection.
  const siblings = collectionsIn(collection.group);
  const groupLetter = { graphic: "A", uiux: "B", video: "C" }[collection.group];
  const index = `04.${groupLetter}${siblings.indexOf(collection) + 1}`;

  const items = itemsFor(collection.slug);
  const brands = brandsFor(collection.slug);

  // Group by sub-folder when the manifest provides one; ungrouped items and a
  // "Brand" group (logo, identity) come first.
  const groups = ([...new Set(items.map((i) => i.group).filter(Boolean))] as string[]).sort(
    (a, b) => Number(b === "Brand") - Number(a === "Brand"),
  );
  const ungrouped = items.filter((i) => !i.group);
  const sections =
    groups.length > 0
      ? [
          ...(ungrouped.length ? [{ label: null, items: ungrouped }] : []),
          ...groups.map((g) => ({ label: g, items: items.filter((i) => i.group === g) })),
        ]
      : [{ label: null, items }];

  // Previous / next across the whole design division.
  const at = collections.indexOf(collection);
  const prev = collections[(at - 1 + collections.length) % collections.length];
  const next = collections[(at + 1) % collections.length];

  return (
    <>
      <Rail current="design" />
      <div className="md:pl-[var(--rail-w)]">
        <main>
          <PageHeader
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/design", label: "Design" },
              { href: `/design/${collection.slug}`, label: collection.title },
            ]}
            index={index}
            title={collection.title}
            intro={collection.intro}
            meta={[`${countFor(collection.slug)} pieces`, ...brands].join(" / ")}
            action={
              collection.figma
                ? { href: collection.figma, label: "Open in Figma" }
                : undefined
            }
          />

          <div className="mx-auto max-w-7xl px-5 py-12 md:px-12 md:py-16">
            {collection.slug === "video" ? (
              <VideoGrid groups={videoGroups} />
            ) : (
              <Gallery
                sections={sections}
                ratio={collection.ratio}
                captions={
                  collection.group === "uiux"
                    ? "title"
                    : collection.slug === "lorikeet"
                      ? "brand"
                      : undefined
                }
              />
            )}
          </div>

          {/* Prev / next */}
          <nav
            aria-label="Other collections"
            className="mx-auto grid max-w-7xl gap-px border-t border-steel bg-steel md:grid-cols-2"
          >
            <Link
              href={`/design/${prev.slug}`}
              className="group bg-ink px-5 py-8 md:px-12"
            >
              <span className="label">Previous</span>
              <span className="font-display mt-1 block text-3xl font-bold text-bone transition-colors group-hover:text-signal">
                {prev.title}
              </span>
            </Link>
            <Link
              href={`/design/${next.slug}`}
              className="group bg-ink px-5 py-8 md:px-12 md:text-right"
            >
              <span className="label">Next</span>
              <span className="font-display mt-1 block text-3xl font-bold text-bone transition-colors group-hover:text-signal">
                {next.title}
              </span>
            </Link>
          </nav>
        </main>
        <Footer />
      </div>
    </>
  );
}
