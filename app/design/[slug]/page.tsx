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
  countFor,
  itemsFor,
  videos,
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

  const index = String(collections.indexOf(collection) + 1).padStart(2, "0");
  const items = itemsFor(collection.slug);
  const brands = brandsFor(collection.slug);

  // Group by product sub-folder when the manifest provides one.
  const groups = [...new Set(items.map((i) => i.group).filter(Boolean))] as string[];
  const sections =
    groups.length > 0
      ? groups.map((g) => ({ label: g, items: items.filter((i) => i.group === g) }))
      : [{ label: null, items }];

  // Previous / next collection for footer navigation.
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
            index={`04.${index}`}
            title={collection.title}
            intro={collection.intro}
            meta={[`${countFor(collection.slug)} pieces`, ...brands].join(" / ")}
          />

          <div className="mx-auto max-w-7xl px-5 py-12 md:px-12 md:py-16">
            {collection.slug === "video" ? (
              <VideoGrid videos={videos} />
            ) : (
              <Gallery sections={sections} ratio={collection.ratio} />
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
