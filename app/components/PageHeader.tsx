import Link from "next/link";
import { ExternalLinkIcon } from "./icons";

type Crumb = { href: string; label: string };

type Props = {
  crumbs: Crumb[];
  index: string;
  title: string;
  intro?: string;
  meta?: string;
  /** Optional external link rendered as a button (e.g. the Figma file). */
  action?: { href: string; label: string };
};

// Header for sub-pages (design index and collection pages).
export default function PageHeader({ crumbs, index, title, intro, meta, action }: Props) {
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

        {(intro || meta || action) && (
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            {intro && <p className="max-w-2xl text-lg leading-relaxed text-ash">{intro}</p>}
            <div className="flex flex-col gap-3 md:items-end">
              {action && (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="chamfer-sm font-display inline-flex items-center gap-2 border border-ash px-4 py-2 text-lg font-bold text-bone transition-colors hover:border-signal hover:text-signal"
                >
                  {action.label}
                  <ExternalLinkIcon width={16} height={16} />
                </a>
              )}
              {meta && <p className="label md:text-right">{meta}</p>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
