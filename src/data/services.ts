export type VideoData = {
  title: string;
  videoPath: string;
  isHorizontal?: boolean;
};

/**
 * Encodes only the filename part of a public-folder path so that spaces and
 * special characters don't break HTTP requests in production.
 * The leading "/" and folder segments are kept as-is.
 */
function p(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  const dir = path.slice(0, lastSlash + 1);
  const file = path.slice(lastSlash + 1);
  return dir + encodeURIComponent(file);
}

export const FORMATS_DATA: Record<string, VideoData[]> = {
  UGC: [
    { title: "Blue Tea",          videoPath: p("/UGC/BT 1.mp4") },
    { title: "Blue Tea 2",        videoPath: p("/UGC/BT 2.mp4") },
    { title: "Blue Tea 3",        videoPath: p("/UGC/BT 3.mp4") },
    { title: "Blue Tea 4",        videoPath: p("/UGC/Blue tea 4.mp4") },
    { title: "Seven Ring",        videoPath: p("/UGC/Seven Ring.mp4") },
    { title: "Seven Every Day",   videoPath: p("/UGC/Seven Every day.mp4") },
    { title: "Seven Ring Chor",   videoPath: p("/UGC/Seven Ring Chor.mp4") },
    { title: "Seven Tap",         videoPath: p("/UGC/Seven tap .mp4") },
    { title: "Seven UGC",         videoPath: p("/UGC/Seven UGC.mp4") },
    { title: "Soul Flower",       videoPath: p("/UGC/Soul Flower.mp4") },
    { title: "Soul Flower 2",     videoPath: p("/UGC/Soul Flower 2.mp4") },
    { title: "Reel 1",            videoPath: p("/UGC/0730(7).mp4") },
    { title: "Reel 2",            videoPath: p("/UGC/0730(8).mp4") },
  ],
  DVC: [
    { title: "brand story",    videoPath: p("/DVC/0504(1).mp4") },
    { title: "cinematic flow", videoPath: p("/DVC/0730.mp4") },
    { title: "DVC 1",          videoPath: p("/DVC/0707.mp4") },
    { title: "DVC 2",          videoPath: p("/DVC/0730(1).mp4") },
  ],
  "Micro Drama": [
    { title: "Hula Hoop EP 1",   videoPath: p("/micro_drama/Hula Hoop 1  EP 1.mp4") },
    { title: "Hula Hoop EP 2",   videoPath: p("/micro_drama/Hula Hoop 1  EP 2.mp4") },
    { title: "Hula Hoop EP 3",   videoPath: p("/micro_drama/Hula Hoop 1  EP 3.mp4") },
    { title: "Micro Drama 1",    videoPath: p("/micro_drama/0730(2).mp4") },
    { title: "Micro Drama 2",    videoPath: p("/micro_drama/0730(3).mp4") },
    { title: "Micro Drama 3",    videoPath: p("/micro_drama/0730(4).mp4") },
    { title: "Hula Hoop 2 EP 1", videoPath: p("/micro_drama/Hula Hoop 2  EP 1.mp4") },
    { title: "Micro Drama 4",    videoPath: p("/micro_drama/Hula Hoop 2  EP 2.mp4") },
    { title: "Micro Drama 5",    videoPath: p("/micro_drama/Hula Hoop 2  EP 3.mp4") },
  ],
  Photoshoot: [
    { title: "Product Shoot", videoPath: p("/Photoshoot/Bed sheet 1.webp"),  isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Bed sheet 2.webp"),  isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/bedsheet 3.webp"),   isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Bedsheet 4 .webp"),  isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Bedsheet 5.webp"),   isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Bedsheet 6.webp"),   isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Bedsheet 7.webp"),   isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Bedsheet 8.webp"),   isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 1.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 2.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 3.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 4.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 5 .webp"),     isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 6.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 7.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 8.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/Towel 9.webp"),      isHorizontal: true },
  ],
  "Ad films & others": [
    { title: "Ad Film 1",                  videoPath: p("/ad_films/0730(5).webm"),                       isHorizontal: true },
    { title: "Ad Film 2",                  videoPath: p("/ad_films/0730(6).webm"),                       isHorizontal: true },
    { title: "CDD Testimonial",            videoPath: p("/ad_films/CDD Testimonial.webm"),               isHorizontal: true },
    { title: "CNBC",                       videoPath: p("/ad_films/CNBC.webm"),                          isHorizontal: true },
    { title: "Seven Ring Air Music Video", videoPath: p("/ad_films/Seven Ring Air Music Video .webm"),   isHorizontal: true },
  ],
  Horizontal: [
    { title: "Cinematic Reel", videoPath: p("/ANDCUT_VDS/4.webm"),           isHorizontal: true },
    { title: "Showreel",       videoPath: p("/ANDCUT_VDS/horizontal2.webm"), isHorizontal: true },
    { title: "CNBC",           videoPath: p("/ANDCUT_VDS/CNBC.webm"),        isHorizontal: true },
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
