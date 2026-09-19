import { profile } from "@/app/lib/data";
import { ArrowDownIcon, DownloadIcon } from "./icons";

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");
const year = new Date().getFullYear();

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden border-b border-steel"
    >
      {/* Technical grid + vignette */}
      <div aria-hidden className="reveal-grid tech-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_40%,transparent,var(--ink)_85%)]"
      />
      {/* Scan line */}
      <div
        aria-hidden
        className="scan pointer-events-none absolute inset-x-0 top-0 h-px bg-signal/40"
      />

      {/* Corner HUD */}
      <div className="reveal-meta pointer-events-none absolute inset-0 p-5 md:p-8">
        <div className="absolute left-5 top-5 flex items-center gap-3 md:left-8 md:top-8">
          <span aria-hidden className="crosshair" />
          <span className="label">Portfolio {year}</span>
        </div>
        <div className="absolute right-5 top-5 flex items-center gap-3 md:right-8 md:top-8">
          <span className="label">{profile.location}</span>
          <span aria-hidden className="crosshair" />
        </div>
        <div className="absolute bottom-5 left-5 flex items-center gap-3 md:bottom-8 md:left-8">
          <span aria-hidden className="crosshair" />
          <span className="label">Scroll</span>
          <ArrowDownIcon width={14} height={14} className="text-ash" />
        </div>
        <div className="absolute bottom-5 right-5 flex items-center gap-3 md:bottom-8 md:right-8">
          <span className="label text-bone">Open to internships</span>
          <span aria-hidden className="blink h-2 w-2 bg-signal" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-28 md:px-12">
        <h1 className="font-display text-[19vw] font-extrabold leading-[0.86] text-bone sm:text-[15vw] md:text-[11rem] lg:text-[13rem]">
          <span className="reveal-line">
            <span>{firstName}</span>
          </span>
          <span className="reveal-line">
            <span className="text-signal">{lastName}</span>
          </span>
        </h1>

        <div className="reveal-meta mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <p className="font-display text-2xl font-medium text-bone md:text-3xl">
              {profile.role}
            </p>
            <p className="mt-3 text-base leading-relaxed text-ash md:text-lg">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#development"
              className="chamfer-sm font-display inline-flex items-center gap-2 bg-signal px-6 py-3 text-lg font-bold text-signal-ink transition-colors hover:bg-bone"
            >
              See projects
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="chamfer-sm font-display inline-flex items-center gap-2 border border-ash px-6 py-3 text-lg font-bold text-bone transition-colors hover:border-signal hover:text-signal"
              >
                Download resume
                <DownloadIcon width={16} height={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
