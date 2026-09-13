import { profile } from "@/app/lib/data";
import Section from "./Section";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";

export default function Contact() {
  return (
    <Section id="contact" index="05" title="Contact">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-bone md:text-xl">
            I&apos;m looking for internships and collaborations in machine
            learning and mobile development. Email is the fastest way to reach
            me.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="chamfer font-display mt-8 inline-flex items-center gap-3 bg-signal px-7 py-4 text-2xl font-bold text-signal-ink transition-colors hover:bg-bone md:text-3xl"
          >
            <MailIcon width={22} height={22} />
            Send an email
          </a>
          <p className="mt-4 text-base text-ash">{profile.email}</p>
        </div>

        <ul className="brackets self-start border border-steel bg-graphite">
          <li>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 px-5 py-4 text-bone transition-colors hover:text-signal"
            >
              <GithubIcon width={18} height={18} />
              <span className="font-display text-xl font-bold">GitHub</span>
              <span className="ml-auto text-sm text-ash">MichLoverz</span>
            </a>
          </li>
          <li className="border-t border-steel">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 px-5 py-4 text-bone transition-colors hover:text-signal"
            >
              <LinkedinIcon width={18} height={18} />
              <span className="font-display text-xl font-bold">LinkedIn</span>
              <span className="ml-auto text-sm text-ash">{profile.name}</span>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
