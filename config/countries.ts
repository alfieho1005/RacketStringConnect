export const countryOptions = [
  { id: "hong-kong", label: "香港 Hong Kong" },
  { id: "taiwan", label: "Taiwan" },
  { id: "malaysia", label: "Malaysia" },
  { id: "thailand", label: "Thailand" },
  { id: "indonesia", label: "Indonesia" },
  { id: "singapore", label: "Singapore" },
  { id: "united-kingdom", label: "United Kingdom" },
  { id: "united-states", label: "United States" },
] as const;

export type CountryId = (typeof countryOptions)[number]["id"];

export const DEFAULT_COUNTRY: CountryId = countryOptions[0].id;

export const getCountryLabel = (countryId: CountryId) =>
  countryOptions.find((country) => country.id === countryId)?.label;
