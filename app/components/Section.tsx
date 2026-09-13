import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  index,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`border-b border-steel ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-28">
        <header className="mb-12 flex items-baseline gap-5 md:mb-16">
          <span className="font-display text-xl text-signal md:text-2xl">
            {index}
          </span>
          <h2 className="font-display text-5xl font-extrabold leading-none text-bone md:text-7xl">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
