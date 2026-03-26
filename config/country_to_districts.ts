import type { CountryId } from "@/config/countries";
import type { DistrictId } from "@/config/district";

export const countryToDistrictIds: Record<CountryId, DistrictId[]> = {
  "hong-kong": [
    "central-and-western","wan-chai-district","eastern-district","southern-district",
    "yau-tsim-mong","sham-shui-po-district","kowloon-city-district","wong-tai-sin-district",
    "kwun-tong-district","kwai-tsing","tsuen-wan-district","tuen-mun-district",
    "yuen-long-district","north-district","tai-po-district","sha-tin-district",
    "sai-kung-district","islands-district",
  ],
};
