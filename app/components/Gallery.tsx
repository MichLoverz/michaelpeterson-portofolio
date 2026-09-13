"use client";

import { useCallback, useEffect, useState } from "react";
import { itemTitle, type Collection, type GalleryItem } from "@/app/lib/design";
import { CloseIcon } from "./icons";

type GallerySection = { label: string | null; items: GalleryItem[] };

type Props = {
  sections: GallerySection[];
  ratio: Collection["ratio"];
  /** Show each piece's title under its thumbnail (useful for UI screens). */
  captions?: boolean;
};

// Grid density per aspect ratio.
const grid: Record<Collection["ratio"], string> = {
  square: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  portrait: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  story: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  wide: "grid-cols-1 lg:grid-cols-2",
  video: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

export default function Gallery({ sections, ratio, captions = false }: Props) {
  const flat = sections.flatMap((s) => s.items);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? null : (i + dir + flat.length) % flat.length)),
    [flat.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  // Flat index at which each section begins (for lightbox navigation).
  const starts = sections.reduce<number[]>(
    (acc, s, i) => [...acc, (acc[i - 1] ?? 0) + (sections[i - 1]?.items.length ?? 0)],
    [],
  );

  return (
    <>
      <div className="space-y-14">
        {sections.map((section, si) => {
          const start = starts[si];
          return (
            <section key={section.label ?? "all"}>
              {section.label && (
                <h3 className="font-display mb-5 flex items-center gap-3 text-2xl font-bold text-bone">
                  <span aria-hidden className="h-3 w-0.5 bg-signal" />
                  {section.label}
                  <span className="font-display text-base text-ash">{section.items.length}</span>
                </h3>
              )}
              <ul className={`grid gap-3 ${grid[ratio]}`}>
                {section.items.map((item, i) => {
                  const index = start + i;
                  const puzzle = item.tag === "puzzle-grid";
                  return (
                    <li key={item.id} className={puzzle ? "col-span-2 row-span-2" : ""}>
                      <button
                        type="button"
                        onClick={() => setOpen(index)}
                        className="group block w-full border border-steel bg-graphite text-left transition-colors hover:border-ash focus-visible:border-signal"
                        aria-label={`Open ${itemTitle(item, index)}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumb}
                          alt={itemTitle(item, index)}
                          width={item.width}
                          height={item.height}
                          loading="lazy"
                          className="block h-auto w-full"
                        />
                        {captions && (
                          <span className="block truncate border-t border-steel px-3 py-2 text-sm text-ash transition-colors group-hover:text-bone">
                            {itemTitle(item, index)}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={itemTitle(flat[open], open)}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95"
          onClick={close}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between gap-4 border-b border-steel px-5 py-3 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="font-display truncate text-xl font-bold text-bone">
                {itemTitle(flat[open], open)}
              </p>
              <p className="label">
                {flat[open].brand}
                {flat[open].group ? ` / ${flat[open].group}` : ""}
                {" / "}
                {String(open + 1).padStart(2, "0")} of {flat.length}
                {flat[open].tall ? " / scroll to read the full page" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 border border-steel p-2 text-bone transition-colors hover:border-signal hover:text-signal"
              aria-label="Close"
              autoFocus
            >
              <CloseIcon width={20} height={20} />
            </button>
          </div>

          {/* Image — tall pages scroll inside the viewer instead of shrinking to fit */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 md:p-8">
            {flat[open].tall ? (
              <div
                className="h-full w-full max-w-4xl overflow-y-auto border border-steel"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={flat[open].id}
                  src={flat[open].full}
                  alt={itemTitle(flat[open], open)}
                  width={flat[open].width}
                  height={flat[open].height}
                  className="block h-auto w-full"
                />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={flat[open].id}
                src={flat[open].full}
                alt={itemTitle(flat[open], open)}
                width={flat[open].width}
                height={flat[open].height}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full object-contain"
              />
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="font-display absolute left-0 top-0 h-full w-16 text-3xl text-ash transition-colors hover:text-signal md:w-24"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="font-display absolute right-0 top-0 h-full w-16 text-3xl text-ash transition-colors hover:text-signal md:w-24"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
