import Link from "next/link";
import {
  brandsFor,
  countFor,
  coverFor,
  videoCover,
  type Collection,
} from "@/app/lib/design";

export default function CollectionTile({ collection }: { collection: Collection }) {
  const isVideo = collection.slug === "video";
  const image = coverFor(collection);
  const cover = isVideo
    ? (() => {
        const src = videoCover();
        return src ? { thumb: src, width: 480, height: 360 } : undefined;
      })()
    : image;
  const count = countFor(collection.slug);
  const brands = brandsFor(collection.slug);

  return (
    <Link
      href={`/design/${collection.slug}`}
      className="chamfer group flex flex-col border border-steel bg-graphite"
    >
      {/* Square cover on every tile so the grid rows line up. */}
      <div className="relative aspect-square overflow-hidden border-b border-steel bg-ink">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.thumb}
            alt=""
            width={cover.width}
            height={cover.height}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="tech-grid flex h-full w-full items-end">
            <span className="label m-4">Coming soon</span>
          </div>
        )}
        <span className="font-display absolute right-3 top-3 bg-ink/85 px-2 py-0.5 text-sm text-bone">
          {count}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl font-bold leading-none text-bone transition-colors group-hover:text-signal">
          {collection.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">{collection.summary}</p>
        {/* Client / project labels — skipped when they'd just repeat the title. */}
        {brands.length > 0 && brands.join(" / ").toLowerCase() !== collection.title.toLowerCase() && (
          <p className="label mt-4">{brands.join(" / ")}</p>
        )}
      </div>
    </Link>
  );
}
