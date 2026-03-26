export const countryOptions = [
  { id: "hong-kong", label: "香港 Hong Kong" },
] as const;

export type CountryId = (typeof countryOptions)[number]["id"];

export const getCountryLabel = (countryId: CountryId) =>
  countryOptions.find((c) => c.id === countryId)?.label;
