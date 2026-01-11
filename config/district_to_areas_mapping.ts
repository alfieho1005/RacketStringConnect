import type { AreaId } from "@/config/areas";
import type { DistrictId } from "@/config/district";

// Map a district to all its sub-district AreaId values
export const districtToSubdistrictIds: Record<DistrictId, AreaId[]> = {
  // 中西區 Central and Western
  "central-and-western": [
    "kennedy-town",
    "shek-tong-tsui",
    "sai-ying-pun",
    "sheung-wan",
    "central",
    "admiralty",
    "mid-levels",
    "peak",
  ],

  // 灣仔 Wan Chai
  "wan-chai-district": [
    "wan-chai",
    "causeway-bay",
    "happy-valley",
    "tai-hang",
    "so-kon-po",
    "jardines-lookout",
  ],

  // 東區 Eastern
  "eastern-district": [
    "tin-hau",
    "braemar-hill",
    "north-point",
    "quarry-bay",
    "sai-wan-ho",
    "shau-kei-wan",
    "chai-wan",
    "siu-sai-wan",
  ],

  // 南區 Southern
  "southern-district": [
    "pok-fu-lam",
    "aberdeen",
    "ap-lei-chau",
    "wong-chuk-hang",
    "shouson-hill",
    "repulse-bay",
    "chung-hom-kok",
    "stanley",
    "tai-tam",
    "shek-o",
  ],

  // 油尖旺 Yau Tsim Mong
  "yau-tsim-mong": [
    "tsim-sha-tsui",
    "yau-ma-tei",
    "west-kowloon-reclamation",
    "kings-park",
    "mong-kok",
    "tai-kok-tsui",
  ],

  // 深水埗 Sham Shui Po
  "sham-shui-po-district": [
    "mei-foo",
    "lai-chi-kok",
    "cheung-sha-wan",
    "sham-shui-po",
    "shek-kip-mei",
    "yau-yat-tsuen",
    "tai-wo-ping",
    "stonecutters-island",
  ],

  // 九龍城 Kowloon City
  "kowloon-city-district": [
    "hung-hom",
    "to-kwa-wan",
    "ma-tau-kok",
    "ma-tau-wai",
    "kai-tak",
    "kowloon-city",
    "ho-man-tin",
    "kowloon-tong",
    "beacon-hill",
  ],

  // 黃大仙 Wong Tai Sin
  "wong-tai-sin-district": [
    "san-po-kong",
    "wong-tai-sin",
    "tung-tau",
    "wang-tau-hom",
    "lok-fu",
    "diamond-hill",
    "tsz-wan-shan",
    "ngau-chi-wan",
  ],

  // 觀塘 Kwun Tong
  "kwun-tong-district": [
    "ping-shek",
    "kowloon-bay",
    "ngau-tau-kok",
    "jordan-valley",
    "kwun-tong",
    "sau-mau-ping",
    "lam-tin",
    "yau-tong",
    "lei-yue-mun",
  ],

  // 葵青 Kwai Tsing
  "kwai-tsing": ["kwai-chung", "tsing-yi"],

  // 荃灣 Tsuen Wan
  "tsuen-wan-district": [
    "tsuen-wan",
    "lei-muk-shue",
    "ting-kau",
    "sham-tseng",
    "tsing-lung-tau",
    "ma-wan",
    "sunny-bay",
  ],

  // 屯門 Tuen Mun
  "tuen-mun-district": ["tai-lam-chung", "so-kwun-wat", "tuen-mun", "lam-tei"],

  // 元朗 Yuen Long
  "yuen-long-district": [
    "hung-shui-kiu",
    "ha-tsuen",
    "lau-fau-shan",
    "tin-shui-wai",
    "yuen-long",
    "san-tin",
    "lok-ma-chau",
    "kam-tin",
    "shek-kong",
    "pat-heung",
  ],

  // 北區 North
  "north-district": [
    "fanling",
    "luen-wo-hui",
    "sheung-shui",
    "shek-wu-hui",
    "sha-tau-kok",
    "luk-keng",
    "wu-kau-tang",
  ],

  // 大埔 Tai Po
  "tai-po-district": [
    "tai-po-market",
    "tai-po",
    "tai-po-kau",
    "tai-mei-tuk",
    "shuen-wan",
    "cheung-muk-tau",
    "kei-ling-ha",
  ],

  // 沙田 Sha Tin
  "sha-tin-district": [
    "tai-wai",
    "sha-tin",
    "fo-tan",
    "ma-liu-shui",
    "wu-kai-sha",
    "ma-on-shan",
  ],

  // 西貢 Sai Kung
  "sai-kung-district": [
    "clear-water-bay",
    "sai-kung-town",
    "tai-mong-tsai",
    "tseung-kwan-o",
    "hang-hau",
    "tiu-keng-leng",
    "ma-yau-tong",
  ],

  // 離島 Islands
  "islands-district": [
    "cheung-chau",
    "peng-chau",
    "lantau-island",
    "tung-chung",
    "lamma-island",
  ],
};
