import { profile } from "@/app/lib/data";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" index="02" title="Profile">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-bone md:text-xl">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Spec sheet */}
        <dl className="brackets brackets-signal self-start border border-steel bg-graphite">
          {profile.specs.map((s, i) => (
            <div
              key={s.key}
              className={`grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-4 ${
                i > 0 ? "border-t border-steel" : ""
              }`}
            >
              <dt className="label pt-0.5">{s.key}</dt>
              <dd className="text-base text-bone">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
