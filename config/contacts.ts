import type { LucideIcon } from "lucide-react";
import { Hash, Instagram, Mail, MessageSquare, Phone } from "lucide-react";

const sanitizeNumber = (value: string) => value.replace(/[^0-9]/g, "");

const ensureProtocol = (value: string, host: string) => {
  if (value.startsWith("http")) {
    return value;
  }

  const payload = value.replace(/^@/, "");
  return `https://${host}/${payload}`;
};

export type ContactChannel =
  | "whatsapp"
  | "instagram"
  | "thread"
  | "email"
  | "phone";

export type ContactDefinition = {
  label: string;
  icon: LucideIcon;
  buildLink: (value: string) => string;
};

export const contactDefinitions: Record<ContactChannel, ContactDefinition> = {
  whatsapp: {
    label: "WhatsApp",
    icon: MessageSquare,
    buildLink: (value) => {
      const digits = sanitizeNumber(value);
      return `https://wa.me/${digits}`;
    },
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    buildLink: (value) => ensureProtocol(value, "instagram.com"),
  },
  thread: {
    label: "Threads",
    icon: Hash,
    buildLink: (value) => ensureProtocol(value, "www.threads.net"),
  },
  email: {
    label: "Email",
    icon: Mail,
    buildLink: (value) => `mailto:${value}`,
  },
  phone: {
    label: "Phone",
    icon: Phone,
    buildLink: (value) => `tel:${value}`,
  },
};

export const getContactDefinition = (
  channel: ContactChannel
): ContactDefinition => contactDefinitions[channel];
