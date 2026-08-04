export type VideoData = {
  title: string;
  videoPath: string;
  isHorizontal?: boolean;
};

export const FORMATS_DATA: Record<string, VideoData[]> = {
  UGC: [
    { title: "Blue Tea", videoPath: "/UGC/BT 1.mp4" },
    { title: "Blue Tea 2", videoPath: "/UGC/BT 2.mp4" },
    { title: "Blue Tea 3", videoPath: "/UGC/BT 3.mp4" },
    { title: "Blue Tea 4", videoPath: "/UGC/Blue tea 4.mp4" },
    { title: "Seven Ring", videoPath: "/UGC/Seven Ring.mp4" },
    { title: "Seven Every Day", videoPath: "/UGC/Seven Every day.mp4" },
    { title: "Seven Ring Chor", videoPath: "/UGC/Seven Ring Chor.mp4" },
    { title: "Seven Tap", videoPath: "/UGC/Seven tap .mp4" },
    { title: "Seven UGC", videoPath: "/UGC/Seven UGC.mp4" },
    { title: "Soul Flower", videoPath: "/UGC/Soul Flower.mp4" },
    { title: "Soul Flower 2", videoPath: "/UGC/Soul Flower 2.mp4" },
    { title: "Reel 1", videoPath: "/UGC/0730(7).mp4" },
    { title: "Reel 2", videoPath: "/UGC/0730(8).mp4" },
  ],
  DVC: [
    { title: "brand story", videoPath: "/DVC/0504(1).mp4" },
    { title: "cinematic flow", videoPath: "/DVC/0730.mp4" },
    { title: "DVC 1", videoPath: "/DVC/0707.mp4" },
    { title: "DVC 2", videoPath: "/DVC/0730(1).mp4" },
  ],
  "Micro Drama": [
    { title: "Hula Hoop EP 1", videoPath: "/micro_drama/Hula Hoop 1  EP 1.mp4" },
    { title: "Hula Hoop EP 2", videoPath: "/micro_drama/Hula Hoop 1  EP 2.mp4" },
    { title: "Hula Hoop EP 3", videoPath: "/micro_drama/Hula Hoop 1  EP 3.mp4" },
    { title: "Micro Drama 1", videoPath: "/micro_drama/0730(2).mp4" },
    { title: "Micro Drama 2", videoPath: "/micro_drama/0730(3).mp4" },
    { title: "Micro Drama 3", videoPath: "/micro_drama/0730(4).mp4" },
    { title: "Hula Hoop 2 EP 1", videoPath: "/micro_drama/Hula Hoop 2  EP 1.mp4" },
    { title: "Micro Drama 4", videoPath: "/micro_drama/Hula Hoop 2  EP 2.mp4" },
    { title: "Micro Drama 5", videoPath: "/micro_drama/Hula Hoop 2  EP 3.mp4" },
  ],
  Photoshoot: [
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed sheet 1.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed sheet 2.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/bedsheet 3.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 4 .webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 5.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 6.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 7.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet 8.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 1.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 2.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 3.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 4.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 5 .webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 6.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 7.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 8.webp", isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel 9.webp", isHorizontal: true },
  ],
  "Ad films & others": [
    { title: "Ad Film 1", videoPath: "/ad_films/0730(5).webm", isHorizontal: true },
    { title: "Ad Film 2", videoPath: "/ad_films/0730(6).webm", isHorizontal: true },
    { title: "CDD Testimonial", videoPath: "/ad_films/CDD Testimonial.webm", isHorizontal: true },
    { title: "CNBC", videoPath: "/ad_films/CNBC.webm", isHorizontal: true },
    { title: "Seven Ring Air Music Video", videoPath: "/ad_films/Seven Ring Air Music Video .webm", isHorizontal: true },
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
