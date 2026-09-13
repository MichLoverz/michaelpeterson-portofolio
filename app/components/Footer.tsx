import { profile } from "@/app/lib/data";

export default function Footer() {
  return (
    <footer>
      <div aria-hidden className="hazard h-2" />
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-ash sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}
