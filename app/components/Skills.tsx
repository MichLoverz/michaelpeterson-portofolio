import { skills } from "@/app/lib/data";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" index="05" title="Skills">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {skills.map((division) => (
          <div key={division.division}>
            <h3 className="font-display mb-4 text-3xl font-bold text-bone">
              {division.division}
            </h3>
            <div className="border-t border-steel">
              {division.groups.map((group) => (
                <div
                  key={group.group}
                  className="grid gap-2 border-b border-steel py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <h4 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-bone">
                    <span aria-hidden className="h-3 w-0.5 bg-signal" />
                    {group.group}
                  </h4>
                  <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-base text-ash">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
