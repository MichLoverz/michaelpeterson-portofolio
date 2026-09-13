import type { Video } from "@/app/lib/design";

type Props = { groups: { label: string; videos: Video[] }[] };

export default function VideoGrid({ groups }: Props) {
  // Running number across groups.
  const starts = groups.reduce<number[]>(
    (acc, _g, i) => [...acc, (acc[i - 1] ?? 0) + (groups[i - 1]?.videos.length ?? 0)],
    [],
  );
  return (
    <div className="space-y-14">
      {groups.map((group, gi) => {
        const short = group.videos.every((v) => v.kind === "short");
        return (
          <section key={group.label}>
            <h3 className="font-display mb-5 flex items-center gap-3 text-2xl font-bold text-bone">
              <span aria-hidden className="h-3 w-0.5 bg-signal" />
              {group.label}
              <span className="font-display text-base text-ash">{group.videos.length}</span>
            </h3>
            <ul
              className={`grid gap-4 ${
                short
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  : "sm:grid-cols-2"
              }`}
            >
              {group.videos.map((v, vi) => {
                const n = starts[gi] + vi + 1;
                return (
                  <li key={v.youtubeId || v.title} className="border border-steel bg-graphite">
                    <div
                      className={`border-b border-steel bg-ink ${
                        v.kind === "short" ? "aspect-[9/16]" : "aspect-video"
                      }`}
                    >
                      {v.youtubeId ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                          title={v.title}
                          loading="lazy"
                          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      ) : (
                        <div className="tech-grid flex h-full w-full items-end">
                          <span className="label m-4">Video coming soon</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <span className="font-display truncate text-xl font-bold text-bone">
                        {v.title}
                      </span>
                      <span className="font-display shrink-0 text-sm text-ash">
                        {String(n).padStart(2, "0")}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
