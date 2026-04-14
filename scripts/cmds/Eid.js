const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

if (!global.eidVideoMemory) global.eidVideoMemory = new Set();

module.exports = {
  config: {
    name: "eid",
    aliases: ["eidmubarak", "eid", "eidstatus", "eidmoon"],
    version: "1.2.1",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: "𝐆𝐞𝐭 𝐡𝐢𝐠𝐡 𝐪𝐮𝐚𝐥𝐢𝐭𝐲 𝐄𝐢𝐝 𝐌𝐮𝐛𝐚𝐫𝐚𝐤 𝐬𝐭𝐚𝐭𝐮𝐬 𝐯𝐢𝐝𝐞𝐨𝐬",
    category: "media",
    guide: {
      en: "𝐔𝐬𝐞 {pn} 𝐨𝐫 {pn} 𝐦𝐮𝐛𝐚𝐫𝐚𝐤 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧 𝐄𝐢𝐝 𝐞𝐝𝐢𝐭!"
    }
  },

  onStart: async function ({ api, event, message, usersData }) {
    const name = await usersData.getName(event.senderID);
    const loadingText = "🔥 | Chill Up『 ᴀᴅᴅᴀ ᴠᴏʀᴘᴜʀ 』☁️🫧 🪶👑";
    const info = await message.reply(loadingText);

    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    setTimeout(() => { api.unsendMessage(info.messageID); }, 8000);

    try {
      const eidTags = [
        "eid mubarak status 4k", "eid ul fitr status bangla", "eid mubarak aesthetic edit",
        "islamic eid status bangla", "eid mubarak whatsapp status", "eid mubarak song edit",
        "eid mubarak typography bangla", "eid moon sighting status", "eid vibes status"
      ];

      const eidCaptions = [
        "\"আপনাকেও আপনার পরিবারকে পবিত্র ঈদুল ফিতরের অনেক অনেক শুভেচ্ছা।\"",
        "\"আনন্দের এই দিনে হাসিখুশিতে কাটুক আপনার প্রতিটি মুহূর্ত। ঈদ মোবারক!\"",
        "\"ঈদের খুশি ছড়িয়ে পড়ুক সবার মনে, কাটুক বিষাদ এই শুভ ক্ষণে।\"",
        "\"তোর ইচ্ছেগুলো উড়ুক আজ নীল আকাশের গায়, হৃদয়ের সবটুকু ভালোবাসা তোকে দিলাম এই ঈদে।\"",
        "\"নতুন চাঁদ উঠেছে আকাশে, খুশির খবর নিয়ে আসুক সবার জীবনে।\"",
        "\"ঈদের আনন্দ সবার জীবনে বয়ে আনুক অনাবিল সুখ ও শান্তি।\"",
        "\"দোয়া করি এই ঈদ আপনার জীবনের সেরা ঈদ হোক। ঈদ মোবারক!\"",
        "\"পবিত্র এই দিনে সব ভেদাভেদ ভুলে একে অপরকে আপন করে নেই।\"",
        "\"ভালোবাসার রং আর ঈদের খুশি দিয়ে ভরে উঠুক আপনার পৃথিবী।\"",
        "\"শুভ দিন, শুভ চাঁদ, ঈদ মোবারক কালকের রাত।\"",
        "\"সবুজ ঘাসের নরম ছোঁয়ায়, খুশির পাখি গান গায়, আজ খুশির দিনে সব দুঃখ ভুলে যাও।\"",
        "\"আকাশের নীল দিয়ে, হৃদয়ের ছোঁয়া দিয়ে, জানাই তোমায় ঈদ মোবারক।\"",
        "\"তোর জন্য নিয়ে এলাম খুশির এক ঝুড়ি, সাথে দিলাম মিষ্টি হাসি। ঈদ মোবারক!\"",
        "\"ঈদ মানে আনন্দ, ঈদ মানে হাসি, আশা করি এই ঈদ হবে তোমার অনেক বেশি খুশি।\"",
        "\"আল্লাহর অশেষ রহমতে তোমার জীবন শান্তিতে ভরে উঠুক।\"",
        "\"ঈদের এই পবিত্র ক্ষণে ছড়িয়ে যাক ভালোবাসার আলো।\"",
        "\"চাঁদ হাসে চাঁদনী হাসে, হাসে সব তারা, ঈদের খুশিতে মাতোয়ারা আজ সারা পাড়া।\"",
        "\"বৃষ্টির দিনে রোদের হাসি, এই ঈদে তোকে অনেক ভালোবাসি।\"",
        "\"ঈদের চাঁদ উকি দিল নীল আকাশে, খুশির ছোঁয়া লাগল সবার মনে।\"",
        "\"ঈদের দাওয়াত রইল বন্ধু, এসো আমার বাড়ি, না এলে আমি তোমার সাথে দেব আড়ি!\"",
        "\"সবাইকে জানাই ঈদের অনেক অনেক ভালোবাসা ও শুভেচ্ছা।\"",
        "\"ঈদের দিনটি আপনার জন্য স্মরণীয় হয়ে থাকুক।\"",
        "\"হৃদয় থেকে জানাই ঈদের সেরা শুভেচ্ছা, ঈদ মোবারক!\"",
        "\"সুখে থাকো শান্তিতে থাকো এই কামনায় ঈদ মোবারক।\"",
        "\"ঈদের প্রতিটি মুহূর্ত হোক আনন্দময় ও আনন্দপূর্ণ।\"",
        "\"পুরানো সব কষ্ট ভুলে নতুন করে শুরু করি পথচলা।\"",
        "\"আল্লাহ আপনার সব নেক আমল কবুল করুন। ঈদ মোবারক!\"",
        "\"শান্তি ও সৌহার্দ্যের প্রতীক হয়ে আসুক এই ঈদ।\"",
        "\"ঈদের খুশিতে ভরে উঠুক এই সুন্দর পৃথিবী।\"",
        "\"শুভ জন্মদিন নয়, আজ হলো সবার খুশির দিন—ঈদ মোবারক!\"",
        "\"ঈদের খুশিতে মাতুক সবাই, আনন্দ সবার ঘরে ঘরে পৌছে যাক।\"",
        "\"সারা বছর আসুক ফিরে এমন খুশির দিন, রঙিন হয়ে উঠুক তোমার রঙিন দিন।\"",
        "\"ভালোবাসার সেতুবন্ধন হোক এই পবিত্র ঈদ।\""
      ];
      
      const randomTag = eidTags[Math.floor(Math.random() * eidTags.length)];
      const randomQuote = eidCaptions[Math.floor(Math.random() * eidCaptions.length)];

      const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(randomTag)}`, { timeout: 15000 });
      const videos = res.data?.data?.videos;

      if (!videos || videos.length === 0) throw new Error("𝐍𝐨 𝐄𝐢𝐝 𝐯𝐢𝐝𝐞𝐨𝐬 𝐟𝐨𝐮𝐧𝐝.");

      let selected = videos.sort(() => 0.5 - Math.random()).find(v => !global.eidVideoMemory.has(v.video_id));
      if (!selected) {
        global.eidVideoMemory.clear();
        selected = videos[Math.floor(Math.random() * videos.length)];
      }
      global.eidVideoMemory.add(selected.video_id);

      const videoUrl = selected.play || selected.hdplay;
      const pathVideo = path.join(cacheDir, `eid_${Date.now()}.mp4`);

      const response = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(pathVideo);
      response.data.pipe(writer);

      writer.on('finish', () => {
        return message.reply({
          body: `🌙 | 𝐄𝐈𝐃 𝐌𝐔𝐁𝐀𝐑𝐀𝐊, ${name.toUpperCase()}!\n━━━━━━━━━━━━━━━━━━\n${randomQuote}\n━━━━━━━━━━━━━━━━━━\n👑 𝐁𝐎𝐒𝐒: 𝐑 𝐎 𝐍 𝐈\n\n"𝐄𝐢𝐝 𝐌𝐮𝐛𝐚𝐫𝐚𝐤 𝐭𝐨 𝐲𝐨𝐮 𝐚𝐧𝐝 𝐲𝐨𝐮𝐫 𝐟𝐚𝐦𝐢𝐥𝐲"`,
          attachment: fs.createReadStream(pathVideo)
        }, () => {
          if (fs.existsSync(pathVideo)) fs.unlinkSync(pathVideo);
        });
      });

      writer.on('error', (err) => {
        console.error("𝐒𝐭𝐫𝐞𝐚𝐦 𝐄𝐫𝐫𝐨𝐫:", err);
        message.reply("⚠️ | 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐩𝐫𝐨𝐜𝐞𝐬𝐬 𝐯𝐢𝐝𝐞𝐨 𝐬𝐭𝐫𝐞𝐚𝐦.");
      });

    } catch (err) {
      console.error(err);
      return message.reply("⚠️ | 𝐀𝐏𝐈 𝐁𝐮𝐬𝐲 𝐨𝐫 𝐍𝐨 𝐄𝐢𝐝 𝐕𝐢𝐝𝐞𝐨 𝐅𝐨𝐮𝐧𝐝. 𝐓𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫!");
    }
  }
};