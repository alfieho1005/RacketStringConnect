"use client";

import type { ContactInfo } from "@/lib/stringers/types";
import type { ContactChannel } from "@/config/contacts";
import { contactDefinitions } from "@/config/contacts";

type Props = {
  contact: ContactInfo;
  stringerName?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ContactButtons({ contact, stringerName }: Props) {
  const channels = Object.entries(contact) as [ContactChannel, string][];

  if (channels.length === 0) {
    return null;
  }

  // Sort WhatsApp first so it appears as the primary action
  const sorted = [...channels].sort(([a], [b]) =>
    a === "whatsapp" ? -1 : b === "whatsapp" ? 1 : 0
  );

  const handleClick = (channel: ContactChannel) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "contact_click", {
        event_category: "Contact",
        event_label: `${channel}${stringerName ? ` — ${stringerName}` : ""}`,
        contact_method: channel,
        stringer_name: stringerName ?? "unknown",
        transport_type: "beacon",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map(([channel, value]) => {
        if (!value) return null;

        const definition = contactDefinitions[channel];
        const href = definition.buildLink(value);
        const isWhatsApp = channel === "whatsapp";

        return (
          <a
            aria-label={`Contact via ${definition.label}`}
            className={
              isWhatsApp
                ? "flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1ebe5d] active:bg-[#1aad54]"
                : "flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-yellow-400 hover:text-slate-900 active:bg-yellow-50"
            }
            href={href}
            key={channel}
            onClick={() => handleClick(channel)}
            rel="noopener"
            target="_blank"
          >
            <definition.icon className={`h-4 w-4 shrink-0${isWhatsApp ? " text-white" : ""}`} aria-hidden />
            {definition.label}
          </a>
        );
      })}
    </div>
  );
}
