"use client";

import { useEffect, useState } from "react";
import { profile } from "@/app/lib/data";
import { CloseIcon, GithubIcon, LinkedinIcon, MenuIcon } from "./icons";

export const sections = [
  { id: "top", index: "01", label: "Start" },
  { id: "about", index: "02", label: "Profile" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "skills", index: "04", label: "Skills" },
  { id: "contact", index: "05", label: "Contact" },
];

export default function Rail() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop rail */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail-w)] flex-col items-center border-r border-steel bg-ink md:flex"
        aria-label="Section navigation"
      >
        <a
          href="#top"
          className="font-display flex h-[var(--rail-w)] w-full items-center justify-center border-b border-steel text-xl font-extrabold text-bone"
          aria-label="Back to start"
        >
          MP
        </a>

        <nav className="flex flex-1 flex-col justify-center gap-1">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-14 w-[var(--rail-w)] items-center justify-center"
              >
                <span
                  className={`font-display text-sm tabular-nums transition-colors ${
                    isActive ? "text-signal" : "text-ash group-hover:text-bone"
                  }`}
                >
                  {s.index}
                </span>
                {/* Active tick */}
                <span
                  aria-hidden
                  className={`absolute right-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-signal transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                {/* Tooltip label */}
                <span
                  aria-hidden
                  className="label pointer-events-none absolute left-full ml-3 whitespace-nowrap bg-graphite px-2 py-1 text-bone opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {s.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-4 border-t border-steel py-5 text-ash">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-signal"
          >
            <GithubIcon width={18} height={18} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-signal"
          >
            <LinkedinIcon width={18} height={18} />
          </a>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-steel bg-ink md:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <a href="#top" className="font-display text-lg font-extrabold text-bone">
            MP
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-bone"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <CloseIcon width={22} height={22} />
            ) : (
              <MenuIcon width={22} height={22} />
            )}
          </button>
        </div>
        {open && (
          <nav className="border-t border-steel">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 border-b border-steel px-5 py-3 last:border-b-0"
              >
                <span className="font-display text-sm text-signal">{s.index}</span>
                <span className="font-display text-lg text-bone">{s.label}</span>
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
