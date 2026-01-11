import type { AreaId } from "@/config/areas";
import type { SportId } from "@/config/sports";

export type Visibility = "active" | "inactive";

export type ContactInfo = Partial<{
  whatsapp: string;
  instagram: string;
  thread: string;
  email: string;
  phone: string;
  website: string;
}>;

export interface Stringer {
  id: string;
  slug: string;
  name: string;
  description: string;
  sports: readonly SportId[];
  area: AreaId;
  pricing?: string;
  contact: ContactInfo;
  visibility: Visibility;
  sortId?: number;
}

export interface StringerPayload {
  slug?: string;
  name: string;
  description: string;
  sports: SportId[];
  area: AreaId;
  pricing?: string;
  contact: ContactInfo;
  visibility: Visibility;
  sortId?: number;
}
