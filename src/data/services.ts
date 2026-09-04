export type VideoData = {
  title: string;
  videoPath: string;
  isHorizontal?: boolean;
  vimeoId?: string; // If set, video is also available on Vimeo (used for modal full-player)
  thumbnailUrl?: string; // Pre-baked Vimeo CDN thumbnail URL
  /** If true, the marquee card plays from a local blob instead of Vimeo iframe */
  useLocalCard?: boolean;
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
    { title: "UGC Reel 1",  videoPath: p("/UGC/BT 1.webm"),            useLocalCard: true, vimeoId: "1216196958", thumbnailUrl: "https://i.vimeocdn.com/video/2187563474-7a59518f731c6d388dd059c6e51811d8c409a8abd03f024f598fcec954ea9ecf-d_640?region=us" },
    { title: "UGC Reel 2",  videoPath: p("/UGC/BT 2.webm"),            useLocalCard: true, vimeoId: "1216461291", thumbnailUrl: "https://i.vimeocdn.com/video/2187898513-e2563bde0bc37a049231eb444623153ad0d86a3160155e75c823417d48c33364-d_640?region=us" },
    { title: "UGC Reel 3",  videoPath: p("/UGC/BT 3.webm"),            useLocalCard: true, vimeoId: "1216461284", thumbnailUrl: "https://i.vimeocdn.com/video/2187898505-797679990b559012255499f1feea2fe6a235891b800ba673cadc891339bb999f-d_640?region=us" },
    { title: "UGC Reel 4",  videoPath: p("/UGC/Blue tea 4.webm"),      useLocalCard: true, vimeoId: "1216461243", thumbnailUrl: "https://i.vimeocdn.com/video/2187898488-8775e83c20d90fb38ce5dc636c5add7547a1e41458fe8a7cf951e54ac15d422b-d_640?region=us" },
    { title: "UGC Reel 5",  videoPath: p("/UGC/Seven Every day.webm"), useLocalCard: true, vimeoId: "1216461266", thumbnailUrl: "https://i.vimeocdn.com/video/2187898482-26542c8f51faed408d2a1c203c9e7f447c3d1aef69634031f64d1e3cbb58bf51-d_640?region=us" },
    { title: "UGC Reel 6",  videoPath: p("/UGC/Seven Ring.webm"),      useLocalCard: true, vimeoId: "1216461255", thumbnailUrl: "https://i.vimeocdn.com/video/2187898478-2c009f05a3f1a1e72a21de4a1ad2e91024f080457a03bb7268eac8cea576d0e3-d_640?region=us" },
    { title: "UGC Reel 7",  videoPath: p("/UGC/Seven Ring Chor.webm"), useLocalCard: true, vimeoId: "1216461171", thumbnailUrl: "https://i.vimeocdn.com/video/2187898425-2f6438326ec6cb2162cf2a528b1b5f68ebcda311d6017e584d01f162ff47196f-d_640?region=us" },
    { title: "UGC Reel 8",  videoPath: p("/UGC/Seven tap .webm"),      useLocalCard: true, vimeoId: "1216461167", thumbnailUrl: "https://i.vimeocdn.com/video/2187898431-12860dd056a4bbcb2db26aba61296c9fa8e73a464be7c042b732cdf02824abbf-d_640?region=us" },
    { title: "UGC Reel 9",  videoPath: p("/UGC/Seven UGC.webm"),       useLocalCard: true, vimeoId: "1216461174", thumbnailUrl: "https://i.vimeocdn.com/video/2187898411-b9e4f79d199124ba7876361c3ecca260092f581c9be7e2a7ff12724fe726675e-d_640?region=us" },
    { title: "UGC Reel 10", videoPath: p("/UGC/Soul Flower.webm"),     useLocalCard: true, vimeoId: "1216461168", thumbnailUrl: "https://i.vimeocdn.com/video/2187898419-1f381add55c2ce8bf27d777835dab25aa2ea82fe07e6575916907b2b9fd7a451-d_640?region=us" },
    { title: "UGC Reel 11", videoPath: p("/UGC/Soul Flower 2.webm"),   useLocalCard: true, vimeoId: "1216461119", thumbnailUrl: "https://i.vimeocdn.com/video/2187898376-b10e2ed85ded914cf2c1bdfcb7b033bdaf781d911ee8336f4b65ef2ec58d5380-d_640?region=us" },
    { title: "UGC Reel 12", videoPath: p("/UGC/0730(7).webm"),         useLocalCard: true, vimeoId: "1216461126", thumbnailUrl: "https://i.vimeocdn.com/video/2187898374-0172162fb1de0e572bf1ad48dbd38cc7a59d85a85a12e6b6598f0e059fb52650-d_640?region=us" },
  ],
  DVC: [
    { title: "brand story",    videoPath: p("/DVC/0504(1).mp4"), vimeoId: "1218018594", thumbnailUrl: "https://i.vimeocdn.com/video/2189837619-4d291d5a39abc15314385e7f020f06f2d6fc304aa4f649a427d835c319f42fba-d_640?region=us" },
    { title: "cinematic flow", videoPath: p("/DVC/0730.mp4"),    vimeoId: "1218018593", thumbnailUrl: "https://i.vimeocdn.com/video/2189837546-45727052483db55b8a2acfcc54a362e4e6cefe8481cc71a9bd2aa2d45cead120-d_640?region=us" },
    { title: "DVC 1",          videoPath: p("/DVC/0707.mp4"),    vimeoId: "1218018596", thumbnailUrl: "https://i.vimeocdn.com/video/2189837530-de3cde869ced830e91220ded128737558cbdf74ca3d5e494670fea2d7b5536bb-d_640?region=us" },
    { title: "DVC 2",          videoPath: p("/DVC/0730(1).mp4"), vimeoId: "1218018595", thumbnailUrl: "https://i.vimeocdn.com/video/2189837523-025fd6430a9b30b9168a9b1f0824aa81c7f25c46e7764e421061005f223af913-d_640?region=us" },
  ],
  "Micro Drama": [
    { title: "Hula Hoop EP 1",   videoPath: p("/micro_drama/Hula hoop EP 1.mp4"), vimeoId: "1223649066", thumbnailUrl: "https://i.vimeocdn.com/video/2189843523-e09ad7a091acc2fe894060fc7d04fb1839d02d859b5d8bd9fbd24256256cf1e2-d_640?region=us" },
    { title: "Hula Hoop EP 2",   videoPath: p("/micro_drama/Hula hoop ep 2.mp4"), vimeoId: "1223649062", thumbnailUrl: "https://i.vimeocdn.com/video/2189843621-daa6519f5a3c89f2774f21319769ff2bbff7964e397661b4899d2c6b0bf059c0-d_640?region=us" },
    { title: "Hula Hoop EP 3",   videoPath: p("/micro_drama/Hula Hoop Ep 3.mp4"), vimeoId: "1223649061", thumbnailUrl: "https://i.vimeocdn.com/video/2189843667-c548f12ead80deadf296571ae8d845c96b8409366dc06ea7288c676c2c37f5c5-d_640?region=us" },
    { title: "Micro Drama 1",    videoPath: p("/micro_drama/0730(2).mp4"),            vimeoId: "1218023562", thumbnailUrl: "https://i.vimeocdn.com/video/2189843533-c80457add2eaddf9bc3d88642e9d0ee5cdcfd985423431f4f3bb06ff1956a37c-d_640?region=us" },
    { title: "Micro Drama 2",    videoPath: p("/micro_drama/0730(3).mp4"),            vimeoId: "1218023566", thumbnailUrl: "https://i.vimeocdn.com/video/2189843570-ee1d2f59f9665079bbe4ba8b6331e6164aff91bd94894eea5a59a721663ee38e-d_640?region=us" },
    { title: "Micro Drama 3",    videoPath: p("/micro_drama/0730(4).mp4"),            vimeoId: "1218023565", thumbnailUrl: "https://i.vimeocdn.com/video/2189843566-658d166eda535745a2ae0870d0957a953ff59d538868f8b8786cda8d01a1dd0e-d_640?region=us" },
    { title: "Hula Hoop 2 EP 1", videoPath: p("/micro_drama/Hula Hoop s2 E2.mp4"), vimeoId: "1223649060", thumbnailUrl: "https://i.vimeocdn.com/video/2189843681-d7bdae899eac5a3143d1ab913ed4c8dc222782e93fcb76fa1e12ece072b38c32-d_640?region=us" },
    { title: "Micro Drama 4",    videoPath: p("/micro_drama/Hula Hoop s2 e3.mp4"), vimeoId: "1223649102", thumbnailUrl: "https://i.vimeocdn.com/video/2189843688-2261087db2ffaca55287a8831f98081d24b77aa197469cf843a5e2645dcdd189-d_640?region=us" },
    { title: "Micro Drama 5",    videoPath: p("/micro_drama/Hula Hoop s2 ep1.mp4"), vimeoId: "1223649147", thumbnailUrl: "https://i.vimeocdn.com/video/2189843703-5ab62c3fe2bc809752ac17a9325e4a0073a83f9f2964827e36ccd74e6b02318e-d_640?region=us" },
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
    { title: "Product Shoot", videoPath: p("/Photoshoot/RK2.JPG.webp"),      isHorizontal: true },
    { title: "Product Shoot", videoPath: p("/Photoshoot/RK 4 .JPG.webp"),    isHorizontal: true },
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
    { title: "Product launch ad film", videoPath: p("/ad_films/Seven Ring Air Music Video .webm"),   isHorizontal: true },
    { title: "Brand AV",               videoPath: p("/ad_films/CNBC.webm"),                          isHorizontal: true },
    { title: "Industrial Films",       videoPath: p("/ad_films/0730(5).webm"),                       isHorizontal: true },
    { title: "Product Testimonial",    videoPath: p("/ad_films/0730(6).webm"),                       isHorizontal: true },
    { title: "Product Testimonial",    videoPath: p("/ad_films/CDD Testimonial.webm"),               isHorizontal: true },
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
  "Photoshoot": "Get an custom quote",
  "Ad films & others": "1,00,000/-"
};
