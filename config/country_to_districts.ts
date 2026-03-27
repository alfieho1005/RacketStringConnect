import type { CountryId } from "./countries";
import type { DistrictId } from "./district";
import { districtOptions } from "./district";

export const countryToDistrictIds: Record<CountryId, DistrictId[]> = {
  "hong-kong": districtOptions.map((district) => district.id),
  taiwan: [],
  malaysia: [],
  thailand: [],
  indonesia: [],
  singapore: [],
  "united-kingdom": [],
  "united-states": [],
};

export const getDistrictsByCountry = (countryId: CountryId) =>
  countryToDistrictIds[countryId] ?? [];
