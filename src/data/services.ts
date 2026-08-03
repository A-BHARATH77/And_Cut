export type VideoData = {
  title: string;
  videoPath: string;
  isHorizontal?: boolean;
};

export const FORMATS_DATA: Record<string, VideoData[]> = {
  UGC: [
    { title: "Blue Tea", videoPath: "/UGC/BT 1.webm" },
    { title: "Blue Tea 2", videoPath: "/UGC/BT 2.webm" },
    { title: "Blue Tea 3", videoPath: "/UGC/BT 3.webm" },
    { title: "Blue Tea 4", videoPath: "/UGC/Blue tea 4.webm" },
    { title: "Seven Ring", videoPath: "/UGC/Seven Ring.webm" },
    { title: "Seven Every Day", videoPath: "/UGC/Seven Every day.webm" },
    { title: "Seven Ring Chor", videoPath: "/UGC/Seven Ring Chor.webm" },
    { title: "Seven Tap", videoPath: "/UGC/Seven tap .webm" },
    { title: "Seven UGC", videoPath: "/UGC/Seven UGC.webm" },
    { title: "Soul Flower", videoPath: "/UGC/Soul Flower.webm" },
    { title: "Soul Flower 2", videoPath: "/UGC/Soul Flower 2.webm" },
    { title: "Reel 1", videoPath: "/UGC/0730(7).webm" },
    { title: "Reel 2", videoPath: "/UGC/0730(8).webm" },
  ],
  DVC: [
    { title: "brand story", videoPath: "/DVC/1.webm" },
    { title: "cinematic flow", videoPath: "/DVC/3.webm" },
    { title: "premium ad", videoPath: "/DVC/4.webm" },
  ],
  "Micro Drama": [
    { title: "Hula Hoop EP 1", videoPath: "/micro_drama/Hula Hoop 1  EP 1.webm" },
    { title: "Hula Hoop EP 2", videoPath: "/micro_drama/Hula Hoop 1  EP 2.webm" },
    { title: "Hula Hoop EP 3", videoPath: "/micro_drama/Hula Hoop 1  EP 3.webm" },
  ],
  Photoshoot: [
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed sheet 1.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed sheet 2.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/bedsheet 3.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 4 .webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 5.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 6.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 7.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 8.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 1.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 2.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 3.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 4.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 5 .webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 6.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 7.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 8.webp" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 9.webp" },
  ],
  "Ad films & others": [
    { title: "Cinematic Reel", videoPath: "/ANDCUT_VDS/4.webm", isHorizontal: true },
    { title: "Showreel", videoPath: "/ANDCUT_VDS/horizontal2.webm", isHorizontal: true },
    { title: "CNBC", videoPath: "/ANDCUT_VDS/CNBC.webm", isHorizontal: true },
  ],
  Horizontal: [
    { title: "Cinematic Reel", videoPath: "/ANDCUT_VDS/4.webm", isHorizontal: true },
    { title: "Showreel", videoPath: "/ANDCUT_VDS/horizontal2.webm", isHorizontal: true },
    { title: "CNBC", videoPath: "/ANDCUT_VDS/CNBC.webm", isHorizontal: true },
  ],
};

export const FORMAT_TABS = ["UGC", "DVC", "Micro Drama", "Ad films & others", "Photoshoot"];

export const FORMAT_PRICES: Record<string, string> = {
  "UGC": "75,000/-",
  "DVC": "1,50,000/-",
  "Micro Drama": "2,25,000/-",
  "Photoshoot": "50,000/-",
  "Ad films & others": "1,00,000/-"
};
