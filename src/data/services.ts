export type VideoData = {
  title: string;
  videoPath: string;
  isHorizontal?: boolean;
  vimeoId?: string; // If set, video is streamed from Vimeo instead of local file
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
    { title: "UGC Reel 1", videoPath: p("/UGC/vimeo1.mp4"), vimeoId: "1216196958" },
    { title: "UGC Reel 2", videoPath: p("/UGC/vimeo2.mp4"), vimeoId: "1216461291" },
    { title: "UGC Reel 3", videoPath: p("/UGC/vimeo3.mp4"), vimeoId: "1216461284" },
    { title: "UGC Reel 4", videoPath: p("/UGC/vimeo4.mp4"), vimeoId: "1216461243" },
    { title: "UGC Reel 5", videoPath: p("/UGC/vimeo5.mp4"), vimeoId: "1216461266" },
    { title: "UGC Reel 6", videoPath: p("/UGC/vimeo6.mp4"), vimeoId: "1216461255" },
    { title: "UGC Reel 7", videoPath: p("/UGC/vimeo7.mp4"), vimeoId: "1216461171" },
    { title: "UGC Reel 8", videoPath: p("/UGC/vimeo8.mp4"), vimeoId: "1216461167" },
    { title: "UGC Reel 9", videoPath: p("/UGC/vimeo9.mp4"), vimeoId: "1216461174" },
    { title: "UGC Reel 10", videoPath: p("/UGC/vimeo10.mp4"), vimeoId: "1216461168" },
    { title: "UGC Reel 11", videoPath: p("/UGC/vimeo11.mp4"), vimeoId: "1216461119" },
    { title: "UGC Reel 12", videoPath: p("/UGC/vimeo12.mp4"), vimeoId: "1216461126" },
  ],
  DVC: [
    { title: "brand story",    videoPath: p("/DVC/0504(1).mp4"), vimeoId: "1218018594" },
    { title: "cinematic flow", videoPath: p("/DVC/0730.mp4"), vimeoId: "1218018593" },
    { title: "DVC 1",          videoPath: p("/DVC/0707.mp4"), vimeoId: "1218018596" },
    { title: "DVC 2",          videoPath: p("/DVC/0730(1).mp4"), vimeoId: "1218018595" },
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
