import { collectionGroups, collectionsIn, countFor } from "@/app/lib/design";
import CollectionTile from "./CollectionTile";

// Collections laid out under their group headings (graphic / UI-UX / video).
export default function CollectionGroups() {
  return (
    <div className="space-y-16">
      {collectionGroups.map((group) => {
        const list = collectionsIn(group.id);
        if (list.length === 0) return null;
        const pieces = list.reduce((n, c) => n + countFor(c.slug), 0);
        return (
          <section key={group.id}>
            <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-steel pb-4">
              <h3 className="font-display flex items-center gap-3 text-3xl font-bold text-bone">
                <span aria-hidden className="h-4 w-0.5 bg-signal" />
                {group.title}
              </h3>
              <p className="text-sm text-ash">
                {group.summary} {pieces} pieces.
              </p>
            </header>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <CollectionTile key={c.slug} collection={c} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
