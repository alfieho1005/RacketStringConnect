import type { LucideIcon } from "lucide-react";
import { Feather, Sparkles } from "lucide-react";

export const sportDefinitions = [
  {
    id: "badminton",
    label: "Badminton 羽毛球",
    accent: "from-emerald-400 via-emerald-500 to-lime-500",
    icon: Feather,
  },
  {
    id: "tennis",
    label: "Tennis 網球",
    accent: "from-yellow-400 via-orange-400 to-amber-500",
    icon: Sparkles,
  },
] as const;

export type SportDefinition = (typeof sportDefinitions)[number];
export type SportId = SportDefinition["id"];

export const getSportDefinition = (sportId: SportId) =>
  sportDefinitions.find((sport) => sport.id === sportId);
