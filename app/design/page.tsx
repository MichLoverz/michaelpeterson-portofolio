import type { Metadata } from "next";
import CollectionTile from "../components/CollectionTile";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Rail from "../components/Rail";
import { collections, totalDesignPieces } from "../lib/design";

export const metadata: Metadata = {
  title: "Design — Michael Peterson",
  description:
    "Graphic design work: marketplace listings, product catalogs, packaging, Instagram feeds and stories, and short-form video.",
};

export default function DesignIndex() {
  return (
    <>
      <Rail current="design" />
      <div className="md:pl-[var(--rail-w)]">
        <main>
          <PageHeader
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/design", label: "Design" },
            ]}
            index="04"
            title="Design"
            intro="Graphic design for consumer brands — print and digital. Organised by the kind of work; open a collection to see every piece."
            meta={`${totalDesignPieces} pieces in ${collections.length} collections`}
          />
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-12 md:py-20">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((c) => (
                <CollectionTile key={c.slug} collection={c} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
