export const districtOptions = [
  // 港島 Hong Kong Island
  { id: "central-and-western", label: "中西區 Central and Western" },
  { id: "wan-chai-district", label: "灣仔區 Wan Chai" },
  { id: "eastern-district", label: "東區 Eastern" },
  { id: "southern-district", label: "南區 Southern" },

  // 九龍 Kowloon
  { id: "yau-tsim-mong", label: "油尖旺 Yau Tsim Mong" },
  { id: "sham-shui-po-district", label: "深水埗區 Sham Shui Po" },
  { id: "kowloon-city-district", label: "九龍城區 Kowloon City" },
  { id: "wong-tai-sin-district", label: "黃大仙區 Wong Tai Sin" },
  { id: "kwun-tong-district", label: "觀塘區 Kwun Tong" },

  // 新界 New Territories
  { id: "kwai-tsing", label: "葵青區 Kwai Tsing" },
  { id: "tsuen-wan-district", label: "荃灣區 Tsuen Wan" },
  { id: "tuen-mun-district", label: "屯門區 Tuen Mun" },
  { id: "yuen-long-district", label: "元朗區 Yuen Long" },
  { id: "north-district", label: "北區 North" },
  { id: "tai-po-district", label: "大埔區 Tai Po" },
  { id: "sha-tin-district", label: "沙田區 Sha Tin" },
  { id: "sai-kung-district", label: "西貢區 Sai Kung" },
  { id: "islands-district", label: "離島區 Islands" },
] as const;

export type DistrictId = (typeof districtOptions)[number]["id"];

export const getDistrictLabel = (districtId: DistrictId) =>
  districtOptions.find((d) => d.id === districtId)?.label;
