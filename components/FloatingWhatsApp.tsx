"use client";

import { MessageSquare } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function FloatingWhatsApp() {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "contact_click", {
        event_category: "Contact",
        event_label: "floating_whatsapp_button",
        contact_method: "whatsapp",
        stringer_name: "general_enquiry",
        transport_type: "beacon",
      });
    }
  };

  return (
    <a
      href="https://wa.me/85295338389?text=Hi%2C%20I%20found%20you%20on%20RacketStringConnect%20and%20have%20a%20question."
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      aria-label="WhatsApp enquiry"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1ebe5d] hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
    >
      <MessageSquare className="h-6 w-6" />
    </a>
  );
}
