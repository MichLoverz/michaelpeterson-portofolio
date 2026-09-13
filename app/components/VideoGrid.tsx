type Video = { title: string; youtubeId: string };

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v, i) => (
        <li key={v.title} className="border border-steel bg-graphite">
          <div className="aspect-video border-b border-steel bg-ink">
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
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-display text-xl font-bold text-bone">{v.title}</span>
            <span className="font-display text-sm text-ash">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
