import type { ContactInfo } from "@/lib/stringers/types";
import type { ContactChannel } from "@/config/contacts";
import { contactDefinitions } from "@/config/contacts";

type Props = {
  contact: ContactInfo;
};

export default function ContactButtons({ contact }: Props) {
  const channels = Object.entries(contact) as [ContactChannel, string][];

  if (channels.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {channels.map(([channel, value]) => {
        if (!value) {
          return null;
        }

        const definition = contactDefinitions[channel];
        const href = definition.buildLink(value);

        return (
          <a
            aria-label={`Contact via ${definition.label}`}
            className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm shadow-slate-900/10 transition hover:border-slate-900/40 hover:text-slate-900"
            href={href}
            key={channel}
            rel="noreferrer"
            target="_blank"
          >
            <definition.icon className="h-4 w-4" aria-hidden />
            {definition.label}
          </a>
        );
      })}
    </div>
  );
}
