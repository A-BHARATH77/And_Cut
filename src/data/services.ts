export type VideoData = {
  title: string;
  videoPath: string;
  isHorizontal?: boolean;
  vimeoId?: string; // If set, video is also available on Vimeo (used for modal full-player)
  thumbnailUrl?: string; // Pre-baked Vimeo CDN thumbnail URL
};

export const FORMATS_DATA: Record<string, VideoData[]> = {
  UGC: [
    { title: "UGC Reel 1",  videoPath: "https://player.mediadelivery.net/play/747536/3e90d4fb-ba39-4b42-bcfc-50d4f6659218", vimeoId: "1216196958", thumbnailUrl: "https://i.vimeocdn.com/video/2187563474-7a59518f731c6d388dd059c6e51811d8c409a8abd03f024f598fcec954ea9ecf-d_640?region=us" },
    { title: "UGC Reel 2",  videoPath: "https://player.mediadelivery.net/play/747536/d6defcbb-c816-4167-b763-df90787f7f5a", vimeoId: "1216461291", thumbnailUrl: "https://i.vimeocdn.com/video/2187898513-e2563bde0bc37a049231eb444623153ad0d86a3160155e75c823417d48c33364-d_640?region=us" },
    { title: "UGC Reel 3",  videoPath: "https://player.mediadelivery.net/play/747536/afc11f2b-6bec-4a71-a6d2-7c8cbd3d80ba", vimeoId: "1216461284", thumbnailUrl: "https://i.vimeocdn.com/video/2187898505-797679990b559012255499f1feea2fe6a235891b800ba673cadc891339bb999f-d_640?region=us" },
    { title: "UGC Reel 4",  videoPath: "https://player.mediadelivery.net/play/747536/a78d6e9d-dce1-4fd6-925d-8b2149b527db", vimeoId: "1216461243", thumbnailUrl: "https://i.vimeocdn.com/video/2187898488-8775e83c20d90fb38ce5dc636c5add7547a1e41458fe8a7cf951e54ac15d422b-d_640?region=us" },
    { title: "UGC Reel 5",  videoPath: "https://player.mediadelivery.net/play/747536/ce5438f3-2aa0-48ff-b209-440403823070", vimeoId: "1216461266", thumbnailUrl: "https://i.vimeocdn.com/video/2187898482-26542c8f51faed408d2a1c203c9e7f447c3d1aef69634031f64d1e3cbb58bf51-d_640?region=us" },
    { title: "UGC Reel 6",  videoPath: "https://player.mediadelivery.net/play/747536/2acbec4e-bd8b-4232-9342-5922bd0a178b", vimeoId: "1216461255", thumbnailUrl: "https://i.vimeocdn.com/video/2187898478-2c009f05a3f1a1e72a21de4a1ad2e91024f080457a03bb7268eac8cea576d0e3-d_640?region=us" },
    { title: "UGC Reel 7",  videoPath: "https://player.mediadelivery.net/play/747536/2acbec4e-bd8b-4232-9342-5922bd0a178b", vimeoId: "1216461171", thumbnailUrl: "https://i.vimeocdn.com/video/2187898425-2f6438326ec6cb2162cf2a528b1b5f68ebcda311d6017e584d01f162ff47196f-d_640?region=us" },
    { title: "UGC Reel 8",  videoPath: "https://player.mediadelivery.net/play/747536/2953533c-cda7-4d52-9f13-320cdf7a3b90", vimeoId: "1216461167", thumbnailUrl: "https://i.vimeocdn.com/video/2187898431-12860dd056a4bbcb2db26aba61296c9fa8e73a464be7c042b732cdf02824abbf-d_640?region=us" },
    { title: "UGC Reel 9",  videoPath: "https://player.mediadelivery.net/play/747536/d4193ee4-661e-495b-b39d-357297bef282", vimeoId: "1216461174", thumbnailUrl: "https://i.vimeocdn.com/video/2187898411-b9e4f79d199124ba7876361c3ecca260092f581c9be7e2a7ff12724fe726675e-d_640?region=us" },
    { title: "UGC Reel 10", videoPath: "https://player.mediadelivery.net/play/747536/b8f3dab3-382d-4d06-8281-1ecb5aed2740", vimeoId: "1216461168", thumbnailUrl: "https://i.vimeocdn.com/video/2187898419-1f381add55c2ce8bf27d777835dab25aa2ea82fe07e6575916907b2b9fd7a451-d_640?region=us" },
    { title: "UGC Reel 11", videoPath: "https://player.mediadelivery.net/play/747536/a47a89e6-4153-48e3-ab29-3e6fbc0baa1c", vimeoId: "1216461119", thumbnailUrl: "https://i.vimeocdn.com/video/2187898376-b10e2ed85ded914cf2c1bdfcb7b033bdaf781d911ee8336f4b65ef2ec58d5380-d_640?region=us" },
    { title: "UGC Reel 12", videoPath: "https://player.mediadelivery.net/play/747536/faffffb3-a2d7-4d12-ae3a-d439ebeb10b3", vimeoId: "1216461126", thumbnailUrl: "https://i.vimeocdn.com/video/2187898374-0172162fb1de0e572bf1ad48dbd38cc7a59d85a85a12e6b6598f0e059fb52650-d_640?region=us" },
  ],
  DVC: [
    { title: "brand story",    videoPath: "https://player.mediadelivery.net/play/747536/ebbefeb4-2b92-4085-bc81-be8e1c617b24", vimeoId: "1218018594", thumbnailUrl: "https://i.vimeocdn.com/video/2189837619-4d291d5a39abc15314385e7f020f06f2d6fc304aa4f649a427d835c319f42fba-d_640?region=us" },
    { title: "cinematic flow", videoPath: "https://player.mediadelivery.net/play/747536/39f5205f-5fac-4074-bfb3-a9b055cd311b", vimeoId: "1218018593", thumbnailUrl: "https://i.vimeocdn.com/video/2189837546-45727052483db55b8a2acfcc54a362e4e6cefe8481cc71a9bd2aa2d45cead120-d_640?region=us" },
    { title: "DVC 1",          videoPath: "https://player.mediadelivery.net/play/747536/89eeb916-b2c2-4d18-b265-1f676c35876a", vimeoId: "1218018596", thumbnailUrl: "https://i.vimeocdn.com/video/2189837530-de3cde869ced830e91220ded128737558cbdf74ca3d5e494670fea2d7b5536bb-d_640?region=us" },
    { title: "DVC 2",          videoPath: "https://player.mediadelivery.net/play/747536/7aada1de-b495-4186-8062-75c654bb5666", vimeoId: "1218018595", thumbnailUrl: "https://i.vimeocdn.com/video/2189837523-025fd6430a9b30b9168a9b1f0824aa81c7f25c46e7764e421061005f223af913-d_640?region=us" },
  ],
  "Micro Drama": [
    { title: "Hula Hoop EP 1",   videoPath: "https://player.mediadelivery.net/play/747536/201422b8-a963-476f-ae96-7ce683a615ff", vimeoId: "1223649066", thumbnailUrl: "https://i.vimeocdn.com/video/2189843523-e09ad7a091acc2fe894060fc7d04fb1839d02d859b5d8bd9fbd24256256cf1e2-d_640?region=us" },
    { title: "Hula Hoop EP 2",   videoPath: "https://player.mediadelivery.net/play/747536/344c77e6-f1f3-4be4-82c1-3d1beb3b1189", vimeoId: "1223649062", thumbnailUrl: "https://i.vimeocdn.com/video/2189843621-daa6519f5a3c89f2774f21319769ff2bbff7964e397661b4899d2c6b0bf059c0-d_640?region=us" },
    { title: "Hula Hoop EP 3",   videoPath: "https://player.mediadelivery.net/play/747536/7e1498fd-cf26-4acc-a0a3-8de069b65a6d", vimeoId: "1223649061", thumbnailUrl: "https://i.vimeocdn.com/video/2189843667-c548f12ead80deadf296571ae8d845c96b8409366dc06ea7288c676c2c37f5c5-d_640?region=us" },
    { title: "Micro Drama 1",    videoPath: "https://player.mediadelivery.net/play/747536/67f5e7e4-c45f-4b4b-ab9d-2bc3f5926fe3", vimeoId: "1218023562", thumbnailUrl: "https://i.vimeocdn.com/video/2189843533-c80457add2eaddf9bc3d88642e9d0ee5cdcfd985423431f4f3bb06ff1956a37c-d_640?region=us" },
    { title: "Micro Drama 2",    videoPath: "https://player.mediadelivery.net/play/747536/15eca0c0-1e56-4d39-bae6-e679e08352c8", vimeoId: "1218023566", thumbnailUrl: "https://i.vimeocdn.com/video/2189843570-ee1d2f59f9665079bbe4ba8b6331e6164aff91bd94894eea5a59a721663ee38e-d_640?region=us" },
    { title: "Micro Drama 3",    videoPath: "https://player.mediadelivery.net/play/747536/74dde8cf-db11-47f2-881f-5112c52d5ec0", vimeoId: "1218023565", thumbnailUrl: "https://i.vimeocdn.com/video/2189843566-658d166eda535745a2ae0870d0957a953ff59d538868f8b8786cda8d01a1dd0e-d_640?region=us" },
    { title: "Hula Hoop 2 EP 1", videoPath: "https://player.mediadelivery.net/play/747536/8dbdf502-27aa-4ed5-88c5-ee125371bd03", vimeoId: "1223649060", thumbnailUrl: "https://i.vimeocdn.com/video/2189843681-d7bdae899eac5a3143d1ab913ed4c8dc222782e93fcb76fa1e12ece072b38c32-d_640?region=us" },
    { title: "Micro Drama 4",    videoPath: "https://player.mediadelivery.net/play/747536/9bdbce25-5807-4ac1-92c7-5ec38c51b2af", vimeoId: "1223649102", thumbnailUrl: "https://i.vimeocdn.com/video/2189843688-2261087db2ffaca55287a8831f98081d24b77aa197469cf843a5e2645dcdd189-d_640?region=us" },
    { title: "Micro Drama 5",    videoPath: "https://player.mediadelivery.net/play/747536/3690d6db-dd86-4b28-bddd-941f242da76c", vimeoId: "1223649147", thumbnailUrl: "https://i.vimeocdn.com/video/2189843703-5ab62c3fe2bc809752ac17a9325e4a0073a83f9f2964827e36ccd74e6b02318e-d_640?region=us" },
  ],
  Photoshoot: [
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed%20sheet%201.webp",  isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bed%20sheet%202.webp",  isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/bedsheet%203.webp",     isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet%204%20.webp",  isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet%205.webp",     isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet%206.webp",     isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet%207.webp",     isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Bedsheet%208.webp",     isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/RK2.JPG.webp",         isHorizontal: false },
    { title: "Product Shoot", videoPath: "/Photoshoot/RK%204%20.JPG.webp",   isHorizontal: false },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%201.webp",       isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%202.webp",       isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%203.webp",       isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%204.webp",       isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%205%20.webp",    isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%206.webp",       isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%207.webp",       isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%208.webp",       isHorizontal: true },
    { title: "Product Shoot", videoPath: "/Photoshoot/Towel%209.webp",       isHorizontal: true },
  ],
  "Ad films & others": [
    { title: "Product launch ad film", videoPath: "https://player.mediadelivery.net/play/747536/5bece3c3-1d8a-4272-a7cb-ea56eb57a45f", isHorizontal: true, vimeoId: "1216461255", thumbnailUrl: "https://i.vimeocdn.com/video/2187898478-2c009f05a3f1a1e72a21de4a1ad2e91024f080457a03bb7268eac8cea576d0e3-d_640?region=us" },
    { title: "Brand AV",               videoPath: "https://player.mediadelivery.net/play/747536/d1281b9b-d4ee-4961-b344-c84e4bbf32d4", isHorizontal: true, vimeoId: "1216461171", thumbnailUrl: "https://i.vimeocdn.com/video/2187898425-2f6438326ec6cb2162cf2a528b1b5f68ebcda311d6017e584d01f162ff47196f-d_640?region=us" },
    { title: "Industrial Films",       videoPath: "https://player.mediadelivery.net/play/747536/c1980c89-bce6-4af5-8848-b9d8d398b1e0", isHorizontal: true, vimeoId: "1216461167", thumbnailUrl: "https://i.vimeocdn.com/video/2187898431-12860dd056a4bbcb2db26aba61296c9fa8e73a464be7c042b732cdf02824abbf-d_640?region=us" },
    { title: "Product Testimonial",    videoPath: "https://player.mediadelivery.net/play/747536/a36e1700-3790-4983-8a39-0df74f0d32af", isHorizontal: true, vimeoId: "1216461174", thumbnailUrl: "https://i.vimeocdn.com/video/2187898411-b9e4f79d199124ba7876361c3ecca260092f581c9be7e2a7ff12724fe726675e-d_640?region=us" },
    { title: "Product Testimonial",    videoPath: "https://player.mediadelivery.net/play/747536/1f600eee-2ec1-4377-93ae-23c3c8e7ac96", isHorizontal: true, vimeoId: "1216461168", thumbnailUrl: "https://i.vimeocdn.com/video/2187898419-1f381add55c2ce8bf27d777835dab25aa2ea82fe07e6575916907b2b9fd7a451-d_640?region=us" },
  ],
  Horizontal: [
    { title: "Cinematic Reel", videoPath: "https://player.mediadelivery.net/play/747536/5bece3c3-1d8a-4272-a7cb-ea56eb57a45f", isHorizontal: true },
    { title: "Showreel",       videoPath: "https://player.mediadelivery.net/play/747536/1f600eee-2ec1-4377-93ae-23c3c8e7ac96", isHorizontal: true },
    { title: "CNBC",           videoPath: "https://player.mediadelivery.net/play/747536/d1281b9b-d4ee-4961-b344-c84e4bbf32d4", isHorizontal: true },
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
