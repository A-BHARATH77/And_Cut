export type VideoData = {
  title: string;
  videoPath: string;
  isHorizontal?: boolean;
};

export const FORMATS_DATA: Record<string, VideoData[]> = {
  UGC: [
    { title: "Blue Tea", videoPath: "/UGC/BT 1.mp4" },
    { title: "Seven Ring", videoPath: "/UGC/Seven Ring.mp4" },
    { title: "Soul Flower", videoPath: "/UGC/Soul Flower.mp4" },
    { title: "Blue Tea 2", videoPath: "/UGC/BT 2.mp4" },
  ],
  DVC: [
    { title: "brand story", videoPath: "/ANDCUT_VDS/1.mp4" },
    { title: "cinematic flow", videoPath: "/ANDCUT_VDS/3.mp4" },
    { title: "premium ad", videoPath: "/ANDCUT_VDS/4.mp4" },
  ],
  "Micro Drama": [
    { title: "Hula Hoop EP 1", videoPath: "/micro_drama/Hula Hoop 1  EP 1.mp4" },
    { title: "Hula Hoop EP 2", videoPath: "/micro_drama/Hula Hoop 1  EP 2.mp4" },
    { title: "Hula Hoop EP 3", videoPath: "/micro_drama/Hula Hoop 1  EP 3.mp4" },
  ],
  Photoshoot: [
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed sheet 1.jpg" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed sheet 2.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/bedsheet 3.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 4 .png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 5.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 6.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 7.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 8.jpg" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 1.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 2.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 3.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 4.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 5 .png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 6.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 7.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 8.png" },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 9.png" },
  ],
  "Ad films & others": [
    { title: "Cinematic Reel", videoPath: "/ANDCUT_VDS/4.mp4", isHorizontal: true },
    { title: "Showreel", videoPath: "/ANDCUT_VDS/horizontal2.webm", isHorizontal: true },
    { title: "CNBC", videoPath: "/ANDCUT_VDS/CNBC.webm", isHorizontal: true },
  ],
  Horizontal: [
    { title: "Cinematic Reel", videoPath: "/ANDCUT_VDS/4.mp4", isHorizontal: true },
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
