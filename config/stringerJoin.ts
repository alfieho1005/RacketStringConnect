export type StringerJoinLabels = {
  name: string;
  instagram: string;
  thread: string;
  facebook: string;
  website: string;
  email: string;
  phone: string;
  whatsapp: string;
  area: string;
  country: string;
  district: string;
  pricing: string;
  description: string;
  sportsLegend: string;
  moreLabel: string;
};

export interface StringerJoinScriptConfig {
  recipient: string;
  subject: string;
}

export interface StringerJoinConfig {
  script: StringerJoinScriptConfig;
  labels: StringerJoinLabels;
  buttonLabel: string;
}

const defaultRecipient =
  process.env.NEXT_PUBLIC_STRINGER_JOIN_EMAIL ?? "racketstringconnect@gmail.com";
const defaultSubject = "New Stringer Profile · RacketStringConnect";

export const stringerJoinConfig: StringerJoinConfig = {
  script: {
    recipient: defaultRecipient,
    subject: defaultSubject,
  },
  labels: {
    name: "穿線師姓名 / 店舖名稱",
    instagram: "Instagram",
    thread: "Threads",
    facebook: "Facebook",
    website: "Website 網站",
    email: "Email 電郵",
    phone: "Phone 電話",
    whatsapp: "WhatsApp 聯絡",
    area: "分區 Neighbourhood",
    country: "地區 Region",
    district: "所在地區 District",
    pricing: "收費參考（選填）",
    description: "服務簡介 About your service",
    sportsLegend: "穿線運動類別 Sports you string for",
    moreLabel: "備註（選填）Notes for our team",
  },
  buttonLabel: "提交審核 Submit",
};
