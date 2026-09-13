import { skills } from "@/app/lib/data";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <div className="border-t border-steel">
        {skills.map((group) => (
          <div
            key={group.group}
            className="grid gap-3 border-b border-steel py-6 md:grid-cols-[14rem_1fr] md:gap-8 md:py-8"
          >
            <h3 className="font-display flex items-center gap-3 text-2xl font-bold text-bone">
              <span aria-hidden className="h-3 w-0.5 bg-signal" />
              {group.group}
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-ash">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
