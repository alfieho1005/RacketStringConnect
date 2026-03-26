import type { LucideIcon } from "lucide-react";
import { Activity, Feather, Sparkles, Disc } from "lucide-react";

export const sportDefinitions = [
  {
    id: "badminton",
    label: "Badminton",
    accent: "from-emerald-400 via-emerald-500 to-lime-500",
    icon: Feather,
  },
  {
    id: "tennis",
    label: "Tennis",
    accent: "from-yellow-400 via-orange-400 to-amber-500",
    icon: Sparkles,
  },
  {
    id: "squash",
    label: "Squash",
    accent: "from-sky-400 via-blue-500 to-indigo-600",
    icon: Activity,
  },
  {
    id: "pickleball",
    label: "Pickleball",
    accent: "from-violet-400 via-purple-500 to-fuchsia-500",
    icon: Disc,
  },
] as const;

export type SportDefinition = (typeof sportDefinitions)[number];
export type SportId = SportDefinition["id"];

export const getSportDefinition = (sportId: SportId) =>
  sportDefinitions.find((sport) => sport.id === sportId);
