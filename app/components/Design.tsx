import Link from "next/link";
import { collections, totalDesignPieces } from "@/app/lib/design";
import CollectionGroups from "./CollectionGroups";
import Section from "./Section";

export default function Design() {
  return (
    <Section id="design" index="04" title="Design">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-xl text-lg text-ash">
          Graphic design, UI/UX, and video editing — {totalDesignPieces} pieces
          across {collections.length} collections.
        </p>
        <Link
          href="/design"
          className="chamfer-sm font-display inline-flex items-center border border-ash px-5 py-2.5 text-lg font-bold text-bone transition-colors hover:border-signal hover:text-signal"
        >
          Browse all design work
        </Link>
      </div>
      <CollectionGroups />
    </Section>
  );
}
