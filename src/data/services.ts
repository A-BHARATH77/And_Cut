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
    { title: "Soul Flower 2",    videoPath: "https://vz-c90a1bec-fec.b-cdn.net/0224c727-3658-4363-8763-69cbd5768856/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/0224c727-3658-4363-8763-69cbd5768856" },
    { title: "Soul Flower",      videoPath: "https://vz-c90a1bec-fec.b-cdn.net/187cba17-cc09-4672-b6fe-02040fdc3c4e/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/187cba17-cc09-4672-b6fe-02040fdc3c4e" },
    { title: "Seven Ring",       videoPath: "https://vz-c90a1bec-fec.b-cdn.net/f1cc5691-19ae-4780-841e-05199b772cc1/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/f1cc5691-19ae-4780-841e-05199b772cc1" },
    { title: "Seven UGC",        videoPath: "https://vz-c90a1bec-fec.b-cdn.net/d207042a-79b2-492f-b41c-33142a71eac1/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/d207042a-79b2-492f-b41c-33142a71eac1" },
    { title: "Seven Tap",        videoPath: "https://vz-c90a1bec-fec.b-cdn.net/723307dd-c97c-4249-a89a-f7f2f0eb1d65/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/723307dd-c97c-4249-a89a-f7f2f0eb1d65" },
    { title: "Seven Ring Chor",  videoPath: "https://vz-c90a1bec-fec.b-cdn.net/a7b048dd-3c51-4c35-99b2-24e2eb5a1a20/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/a7b048dd-3c51-4c35-99b2-24e2eb5a1a20" },
    { title: "Seven Every Day",  videoPath: "https://vz-c90a1bec-fec.b-cdn.net/c63e18dd-75c0-4c29-a654-36e5e4859fe4/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/c63e18dd-75c0-4c29-a654-36e5e4859fe4" },
    { title: "BT2",              videoPath: "https://vz-c90a1bec-fec.b-cdn.net/64a38da2-e1fb-4d3e-b371-2c68294e52f6/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/64a38da2-e1fb-4d3e-b371-2c68294e52f6" },
    { title: "BT3",              videoPath: "https://vz-c90a1bec-fec.b-cdn.net/b4d01bcf-5bc9-4e99-8053-fad0cfaa348d/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/b4d01bcf-5bc9-4e99-8053-fad0cfaa348d" },
    { title: "0730(8)",          videoPath: "https://vz-c90a1bec-fec.b-cdn.net/63092ed2-7f5f-4f0a-8104-e4cedb8625c5/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/63092ed2-7f5f-4f0a-8104-e4cedb8625c5" },
    { title: "BT1",              videoPath: "https://vz-c90a1bec-fec.b-cdn.net/861c8d56-f2ce-4657-ba43-ca4a7285c3e7/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/861c8d56-f2ce-4657-ba43-ca4a7285c3e7" },
    { title: "Blue Tea 4",       videoPath: "https://vz-c90a1bec-fec.b-cdn.net/9ec4c187-b44e-47b5-bd9d-b2080c416069/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/9ec4c187-b44e-47b5-bd9d-b2080c416069" },
    { title: "0730(4)",          videoPath: "https://vz-c90a1bec-fec.b-cdn.net/44d97c80-6f61-4310-9bf1-c30dc9fcef8a/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/44d97c80-6f61-4310-9bf1-c30dc9fcef8a" },
    { title: "BB",          videoPath: "https://vz-c90a1bec-fec.b-cdn.net/76356db7-75a6-4ef6-83bf-74f7f199a2b9/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/76356db7-75a6-4ef6-83bf-74f7f199a2b9" },
    { title: "MDB",          videoPath: "https://vz-c90a1bec-fec.b-cdn.net/a39c5223-ecdb-46a7-9354-3a8ffc30d9d8/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/a39c5223-ecdb-46a7-9354-3a8ffc30d9d8" },
    { title: "K1",          videoPath: "https://vz-c90a1bec-fec.b-cdn.net/72018192-645f-4f83-8a53-379f01e0dac7/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/72018192-645f-4f83-8a53-379f01e0dac7" },
    { title: "K2",          videoPath: "https://vz-c90a1bec-fec.b-cdn.net/fa1cadc9-0256-44c1-84ad-98c6d541dbec/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/fa1cadc9-0256-44c1-84ad-98c6d541dbec" },
    { title: "BeautyWise",          videoPath: "https://vz-c90a1bec-fec.b-cdn.net/a5efcc83-1760-4199-84be-a896a447778b/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/a5efcc83-1760-4199-84be-a896a447778b" },
  ],
  DVC: [
    { title: "0730",     videoPath: "https://vz-c90a1bec-fec.b-cdn.net/578ca5bb-2d7f-47c7-8dc7-829e34fc9a57/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/578ca5bb-2d7f-47c7-8dc7-829e34fc9a57" },
    { title: "0504(1)",  videoPath: "https://vz-c90a1bec-fec.b-cdn.net/2caa244a-c737-4046-9421-a867c07e8e08/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/2caa244a-c737-4046-9421-a867c07e8e08" },
    { title: "0730(1)",  videoPath: "https://vz-c90a1bec-fec.b-cdn.net/6eb51332-1a0c-41b5-810a-655b1b9242d7/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/6eb51332-1a0c-41b5-810a-655b1b9242d7" },
    { title: "0707",     videoPath: "https://vz-c90a1bec-fec.b-cdn.net/9445d970-4811-4322-981f-8fc0af4fe159/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/9445d970-4811-4322-981f-8fc0af4fe159" },
  ],
  "Micro Drama": [
    { title: "Hula Hoop S2 E2", videoPath: "https://vz-c90a1bec-fec.b-cdn.net/a4175403-0cf8-4a89-97f5-293b8149fc7e/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/a4175403-0cf8-4a89-97f5-293b8149fc7e" },
    { title: "Hula Hoop S2 E1", videoPath: "https://vz-c90a1bec-fec.b-cdn.net/4fbdc46a-57ca-4619-8c87-904f36594ab1/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/4fbdc46a-57ca-4619-8c87-904f36594ab1" },
    { title: "Hula Hoop S2 E3", videoPath: "https://vz-c90a1bec-fec.b-cdn.net/945916f9-735c-4e47-b579-a6cf8e16304a/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/945916f9-735c-4e47-b579-a6cf8e16304a" },
    { title: "0730(4)",         videoPath: "https://vz-c90a1bec-fec.b-cdn.net/d197693c-8073-4464-a3ce-99e8a3801b94/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/d197693c-8073-4464-a3ce-99e8a3801b94" },
    { title: "Hula Hoop EP 3",  videoPath: "https://vz-c90a1bec-fec.b-cdn.net/7ff77cf9-412d-4d1d-9d0d-8fd485a3bd06/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/7ff77cf9-412d-4d1d-9d0d-8fd485a3bd06" },
    { title: "Hula Hoop EP 2",  videoPath: "https://vz-c90a1bec-fec.b-cdn.net/1c114f98-aa73-45a7-b333-b198c10aecf5/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/1c114f98-aa73-45a7-b333-b198c10aecf5" },
    { title: "Hula Hoop EP 1",  videoPath: "https://vz-c90a1bec-fec.b-cdn.net/817d40ce-b697-4036-801e-93947a398582/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/817d40ce-b697-4036-801e-93947a398582" },
    { title: "0730(3)",         videoPath: "https://vz-c90a1bec-fec.b-cdn.net/9d64b16e-c206-4cb0-8404-48fbbb9f1741/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/9d64b16e-c206-4cb0-8404-48fbbb9f1741" },
    { title: "0730(2)",         videoPath: "https://vz-c90a1bec-fec.b-cdn.net/22d9976d-df96-46ad-80f5-a1aaf8060d68/play_480p.mp4", bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/22d9976d-df96-46ad-80f5-a1aaf8060d68" },
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
    { title: "Seven Ring Air Music Video", videoPath: "https://vz-c90a1bec-fec.b-cdn.net/05816a15-5663-42e4-8000-0be36b14aea9/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/05816a15-5663-42e4-8000-0be36b14aea9" },
    { title: "CNBC",                       videoPath: "https://vz-c90a1bec-fec.b-cdn.net/5025a6f5-f287-411b-9243-6fcab2682651/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/5025a6f5-f287-411b-9243-6fcab2682651" },
    { title: "0730(6)",                    videoPath: "https://vz-c90a1bec-fec.b-cdn.net/7a356dbe-359b-4e1a-849e-efb0f209ee6b/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/7a356dbe-359b-4e1a-849e-efb0f209ee6b" },
    { title: "CDD Testimonial",            videoPath: "https://vz-c90a1bec-fec.b-cdn.net/0b0b74dc-9743-42bd-bf58-6444a3b8c547/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/0b0b74dc-9743-42bd-bf58-6444a3b8c547" },
    { title: "0730(5)",                    videoPath: "https://vz-c90a1bec-fec.b-cdn.net/69a184eb-c44e-4eef-a50b-a46d96adf226/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/69a184eb-c44e-4eef-a50b-a46d96adf226" },
  ],
  Horizontal: [
    // Beyond Vertical section — awaiting new links from client
    { title: "Cinematic Reel", videoPath: "https://vz-c90a1bec-fec.b-cdn.net/05816a15-5663-42e4-8000-0be36b14aea9/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/05816a15-5663-42e4-8000-0be36b14aea9" },
    { title: "Showreel",       videoPath: "https://vz-c90a1bec-fec.b-cdn.net/7a356dbe-359b-4e1a-849e-efb0f209ee6b/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/7a356dbe-359b-4e1a-849e-efb0f209ee6b" },
    { title: "CNBC",           videoPath: "https://vz-c90a1bec-fec.b-cdn.net/5025a6f5-f287-411b-9243-6fcab2682651/play_480p.mp4", isHorizontal: true, bunnyPlayerUrl: "https://player.mediadelivery.net/play/793795/5025a6f5-f287-411b-9243-6fcab2682651" },
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
