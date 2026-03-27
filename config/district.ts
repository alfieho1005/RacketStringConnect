export const districtOptions = [
  // Hong Kong Island
  { id: "central-and-western", label: "Central and Western" },
  { id: "wan-chai-district", label: "Wan Chai" },
  { id: "eastern-district", label: "Eastern" },
  { id: "southern-district", label: "Southern" },

  // Kowloon
  { id: "yau-tsim-mong", label: "Yau Tsim Mong" },
  { id: "sham-shui-po-district", label: "Sham Shui Po" },
  { id: "kowloon-city-district", label: "Kowloon City" },
  { id: "wong-tai-sin-district", label: "Wong Tai Sin" },
  { id: "kwun-tong-district", label: "Kwun Tong" },

  // New Territories
  { id: "kwai-tsing", label: "Kwai Tsing" },
  { id: "tsuen-wan-district", label: "Tsuen Wan" },
  { id: "tuen-mun-district", label: "Tuen Mun" },
  { id: "yuen-long-district", label: "Yuen Long" },
  { id: "north-district", label: "North" },
  { id: "tai-po-district", label: "Tai Po" },
  { id: "sha-tin-district", label: "Sha Tin" },
  { id: "sai-kung-district", label: "Sai Kung" },
  { id: "islands-district", label: "Islands" },
] as const;

export type DistrictId = (typeof districtOptions)[number]["id"];

export const getDistrictLabel = (districtId: DistrictId) =>
  districtOptions.find((d) => d.id === districtId)?.label;
