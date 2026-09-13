import Link from "next/link";

type Crumb = { href: string; label: string };

type Props = {
  crumbs: Crumb[];
  index: string;
  title: string;
  intro?: string;
  meta?: string;
};

// Header for sub-pages (design index and collection pages).
export default function PageHeader({ crumbs, index, title, intro, meta }: Props) {
  return (
    <header className="border-b border-steel">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:px-12 md:pb-16 md:pt-14">
        <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="h-px w-4 bg-steel" />}
              <Link href={c.href} className="transition-colors hover:text-signal">
                {c.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="mt-8 flex items-baseline gap-5">
          <span className="font-display text-xl text-signal md:text-2xl">{index}</span>
          <h1 className="font-display text-5xl font-extrabold leading-none text-bone md:text-7xl">
            {title}
          </h1>
        </div>

        {(intro || meta) && (
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            {intro && <p className="max-w-2xl text-lg leading-relaxed text-ash">{intro}</p>}
            {meta && <p className="label md:text-right">{meta}</p>}
          </div>
        )}
      </div>
    </header>
  );
}
