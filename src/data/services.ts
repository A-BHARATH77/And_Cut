export type VideoData = {
  title: string;
  videoPath: string;           // Bunny CDN MP4 URL → used in <video> tag for silent streaming
  isHorizontal?: boolean;
  vimeoId?: string;            // Legacy — no longer used, kept for type safety during transition
  bunnyPlayerUrl?: string;     // Bunny player URL → used in <iframe> for on-click full player
  thumbnailUrl?: string;       // Static thumbnail (optional)
};

export const FORMATS_DATA: Record<string, VideoData[]> = {
  UGC: [
    { title: "Soul Flower 2",    videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/04366a5a-b87e-429c-9fc1-51f69f300795/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/04366a5a-b87e-429c-9fc1-51f69f300795" },
    { title: "Soul Flower",      videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/e4c219a9-ba94-4920-ab6d-5a52546a3a05/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/e4c219a9-ba94-4920-ab6d-5a52546a3a05" },
    { title: "Seven Ring",       videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/674aa9d0-f0e1-4110-acd5-77756029509c/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/674aa9d0-f0e1-4110-acd5-77756029509c" },
    { title: "Seven UGC",        videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/2128b332-21e3-47b7-8e1b-ac7c16afc4ca/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/2128b332-21e3-47b7-8e1b-ac7c16afc4ca" },
    { title: "Seven Tap",        videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/3b80ad57-c5bf-45f4-81d8-40fbad5494fd/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/3b80ad57-c5bf-45f4-81d8-40fbad5494fd" },
    { title: "Seven Ring Chor",  videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/f55890ca-992f-4d20-b881-a5ff02b09cac/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/f55890ca-992f-4d20-b881-a5ff02b09cac" },
    { title: "Seven Every Day",  videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/edcf35fc-86dc-4d51-913e-12eddf1e88da/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/edcf35fc-86dc-4d51-913e-12eddf1e88da" },
    { title: "BT2",              videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/87bf6b34-4b0e-43e1-9fb5-b83ee2874eb4/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/87bf6b34-4b0e-43e1-9fb5-b83ee2874eb4" },
    { title: "BT3",              videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/749819dd-08c9-4e92-8ff2-5d5f45f92ac7/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/749819dd-08c9-4e92-8ff2-5d5f45f92ac7" },
    { title: "0730(8)",          videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/33a0167c-2a00-4d31-8d05-4f95faf382bd/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/33a0167c-2a00-4d31-8d05-4f95faf382bd" },
    { title: "BT1",              videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/c3507f10-18af-4aca-9a4e-41f3cc0f6b78/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/c3507f10-18af-4aca-9a4e-41f3cc0f6b78" },
    { title: "Blue Tea 4",       videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/5ee4f7f2-ba8a-4af1-8485-c71de974041b/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/5ee4f7f2-ba8a-4af1-8485-c71de974041b" },
    { title: "0730(4)",          videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/44bcbd60-5cbc-47ae-9d9e-ca5cbdaa52aa/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/44bcbd60-5cbc-47ae-9d9e-ca5cbdaa52aa" },
  ],
  DVC: [
    { title: "0730",     videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/6e372b7f-7f08-4b43-912c-21390121d144/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/6e372b7f-7f08-4b43-912c-21390121d144" },
    { title: "0504(1)",  videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/03e6b436-c430-46bf-ba67-c166a49322d2/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/03e6b436-c430-46bf-ba67-c166a49322d2" },
    { title: "0730(1)",  videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/d8c74b45-c296-460e-83d9-ecec5fc4c706/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/d8c74b45-c296-460e-83d9-ecec5fc4c706" },
    { title: "0707",     videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/550effd9-6365-46b3-82ba-aeb488651dc1/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/550effd9-6365-46b3-82ba-aeb488651dc1" },
  ],
  "Micro Drama": [
    { title: "Hula Hoop S2 E2", videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/a1235438-1079-4f08-8a87-8c9b6b31fb05/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/a1235438-1079-4f08-8a87-8c9b6b31fb05" },
    { title: "Hula Hoop S2 E1", videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/d778c2a1-13c3-4e9a-a9fb-f2a3fe636857/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/d778c2a1-13c3-4e9a-a9fb-f2a3fe636857" },
    { title: "Hula Hoop S2 E3", videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/16d770f0-4b09-40a2-80cb-68c09e116d17/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/16d770f0-4b09-40a2-80cb-68c09e116d17" },
    { title: "0730(4)",         videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/6f1df545-9249-4e90-84cf-4fd0dfff43b0/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/6f1df545-9249-4e90-84cf-4fd0dfff43b0" },
    { title: "Hula Hoop EP 3",  videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/13047184-4b67-4a3d-919d-b61a06bab1fd/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/13047184-4b67-4a3d-919d-b61a06bab1fd" },
    { title: "Hula Hoop EP 2",  videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/a0cf4614-7dfa-4f23-912c-4ae20cc2abf0/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/a0cf4614-7dfa-4f23-912c-4ae20cc2abf0" },
    { title: "Hula Hoop EP 1",  videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/112f18bf-9a51-43fb-900a-6b153fb37aa3/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/112f18bf-9a51-43fb-900a-6b153fb37aa3" },
    { title: "0730(3)",         videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/69a1cb45-5c3d-4743-a9ac-02a95e41273e/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/69a1cb45-5c3d-4743-a9ac-02a95e41273e" },
    { title: "0730(2)",         videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/b848dd4b-3610-42a4-9230-10106ab409b4/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/b848dd4b-3610-42a4-9230-10106ab409b4" },
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
    { title: "Seven Ring Air Music Video", videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/38ddffbb-502c-456e-964f-af2d8e2c373f/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/38ddffbb-502c-456e-964f-af2d8e2c373f" },
    { title: "CNBC",                       videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/0a84b805-dca1-46dc-98bb-808314c0877f/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/0a84b805-dca1-46dc-98bb-808314c0877f" },
    { title: "0730(6)",                    videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/20dd0407-524e-42d3-b380-dc6807f4174c/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/20dd0407-524e-42d3-b380-dc6807f4174c" },
    { title: "CDD Testimonial",            videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/ee8af89b-370a-4f7c-893f-72957b6e2bbb/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/ee8af89b-370a-4f7c-893f-72957b6e2bbb" },
    { title: "0730(5)",                    videoPath: "https://vz-4a9f7a4f-4d6.b-cdn.net/a5cf98cd-c6ee-4344-b0c5-e8ad37bfe6d5/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/a5cf98cd-c6ee-4344-b0c5-e8ad37bfe6d5" },
  ],
  Horizontal: [
    // Beyond Vertical section — awaiting new links from client
    { title: "Cinematic Reel", videoPath: "https://vz-1878a866-25c.b-cdn.net/cf14100a-e968-4963-8fd4-cd2f6d07779c/play_360p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/38ddffbb-502c-456e-964f-af2d8e2c373f" },
    { title: "Showreel",       videoPath: "https://vz-1878a866-25c.b-cdn.net/44c24870-b765-4bab-8022-0e1bda7c856a/play_360p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/20dd0407-524e-42d3-b380-dc6807f4174c" },
    { title: "CNBC",           videoPath: "https://vz-1878a866-25c.b-cdn.net/b526a30e-03dc-4321-8f09-757289a6097f/play_360p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/753159/0a84b805-dca1-46dc-98bb-808314c0877f" },
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
