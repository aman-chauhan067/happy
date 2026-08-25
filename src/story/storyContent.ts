export type StorySegment = {
  id: string;
  theme: "green" | "magenta" | "blue" | "purple" | "orange" | "black";
  title: string;
  subtitle?: string;
  stickers?: string[];
};

export const birthdayStory: StorySegment[] = [
  {
    id: "slide-1",
    theme: "green",
    title: "NORMAL SA HAPPY BIRTHDAY BOL DETA...",
    subtitle: "PAR AAPKE LIYE THODA EXTRA KARNA PADEGA.",
    stickers: ["WAISE BHI...", "ITNI BAIZATTI KARTA HOON AAPKI", "EK WEBSITE TOH BANTI HAI."]
  },
  {
    id: "slide-2",
    theme: "magenta",
    title: "HUMARI DOSTI BHI KYA AJEEB CHEEZ HAI.",
    subtitle: "BAS BAATEIN KARTE KARTE...",
    stickers: ["pata nahi kab itni saari baatein ho gayi.", "Na hum bachpan ke dost hain", "na humare paas 500 photos hain", "Bas aap hain... aur aapki bakchodi."]
  },
  {
    id: "slide-3",
    theme: "orange",
    title: "WAISE AAPKO DESCRIBE KARNA THODA MUSHKIL HAI.",
    subtitle: "ZABAAN SE TOH KAAFI BEKAAR HO.",
    stickers: ["Matlab... KAAFI ZYADA.", "Harkatein bhi kabhi kabhi bhadwi hoti hain.", "lekin... andar se dil ke achhe ho.", "Unfortunately. Ye ek achhi quality hai aapki."]
  },
  {
    id: "slide-4",
    theme: "blue",
    title: "PHIR AAYA DELHI CHAPTER.",
    subtitle: "US TIME EK CHEEZ NOTICE KI MAINE. AAPKI CARE.",
    stickers: ["METRO", "CHANGE", "IDHAR?", "UDHAR?", "PAHUNCH GAYE?", "GHAR?", "LOCATION BHEJO"]
  },
  {
    id: "slide-4b",
    theme: "blue",
    title: "MAIN DELHI MEIN IDHAR UDHAR METRO PAKAD RAHA THA...",
    subtitle: "AUR AAPKO MERI TENSION THI.",
    stickers: ["Itni checking toh meri mummy bhi nahi karti.", "But honestly... uss din achha laga tha.", "Kyunki aapko itni fikar karne ki koi zarurat nahi thi.", "Toh haan... thoda achhe ho aap. Thoda."]
  },
  {
    id: "slide-5",
    theme: "purple",
    title: "AUR JAB TRAVEL MEIN SCENE THODA TIGHT HUA...",
    subtitle: "TOH AAPNE BINA ZYADA DRAMA KIYE HELP OFFER KAR DI.",
    stickers: ["Ye wali cheez yaad reh gayi thi.", "Baaki aapko zyada credit nahi dunga.", "ego badh jayega."]
  },
  {
    id: "slide-6",
    theme: "black",
    title: "PHIR ONLINE WALE HIMANSHU JI KO REAL LIFE MEIN BHI DEKH LIYA.",
    subtitle: "SURPRISINGLY... AAP REAL NIKLE.",
    stickers: ["Ek baar mile.", "Apni apni metro pakdi.", "aur nikal liye.", "Bas ek problem reh gayi."]
  }
];

export const photoBoothCaptions = [
  "Seedhe baitho.",
  "Normal lagne ki koshish karo.",
  "Bas ab zyada handsome mat banna.",
  "Last one."
];
