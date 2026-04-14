const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

if (!global.islamVideoMemory) global.islamVideoMemory = new Set();

module.exports = {
  config: {
    name: "islam",
    aliases: ["islamic", "hadis", "allah", "namaz"],
    version: "2.0.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Get high quality Islamic status videos with captions" },
    category: "media",
    guide: {
      en: "𝐔𝐬𝐞 {pn} 𝐭𝐨 𝐠𝐞𝐭 𝐚𝐧 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐬𝐭𝐚𝐭𝐮𝐬 𝐞𝐝𝐢𝐭!"
    }
  },

  onStart: async function ({ api, event, message, usersData }) {
    const name = await usersData.getName(event.senderID);
    const loadingText = "📿 | 𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡... 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭 𝐛𝐛𝐲! 🌙✨ 👑";
    const info = await message.reply(loadingText);

    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    setTimeout(() => { api.unsendMessage(info.messageID); }, 5000);

    try {
      // 🎥 Islamic Tags for 4K Videos
      const islamTags = [
        "islamic status 4k", "allah name status aesthetic", "namaz status bangla",
        "azan beautiful status", "hadis status bangla typography", "dorud sharif status",
        "quran recitation status 4k", "islamic quotes bangla status", "allah hu akbar status",
        "makkah madina 4k status", "surah status bangla", "islamic emotional status"
      ];

      // 📜 40 Islamic & Hadis Captions
      const islamCaptions = [
        "পড়ো তোমার প্রভুর নামে, যিনি তোমাকে সৃষ্টি করেছেন।",
        "নামাজকে বলো না কাজ আছে, কাজকে বলো আমার নামাজ আছে।",
        "আল্লাহর ওপর ভরসা রাখো, তিনি কখনোই তোমাকে নিরাশ করবেন না।",
        "হতাশ হয়ো না, নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।",
        "জান্নাত হলো সেই ঘর, যার চাবি হলো নামাজ।",
        "মুমিনের প্রতিটি কাজই ইবাদত যদি তা আল্লাহর সন্তুষ্টির জন্য হয়।",
        "নিশ্চয়ই কষ্টের সাথেই স্বস্তি রয়েছে। (আল-কুরআন)",
        "যে ব্যক্তি আল্লাহর ওপর ভরসা করে, আল্লাহই তার জন্য যথেষ্ট।",
        "রাসূল (সা.) বলেছেন: প্রচার করো, যদি একটি মাত্র আয়াতও হয়। (বুখারী)",
        "পাঁচ ওয়াক্ত নামাজ হলো মুমিনের জন্য নূর।",
        "আল্লাহর জিকিরে হৃদয়ে প্রশান্তি আসে।",
        "দুনিয়ার মোহ ত্যাগ করো, আখেরাত তোমার জন্য সুন্দর হবে।",
        "পরের দোষ না খুঁজে নিজের আমল ঠিক করার চেষ্টা করি।",
        "বিপদের সময় আলহামদুলিল্লাহ বলতে শেখো, কারণ আল্লাহ ভালো জানেন।",
        "সর্বোত্তম ইবাদত হলো সঠিক সময়ে নামাজ আদায় করা।",
        "যে অন্যকে ক্ষমা করে, আল্লাহ তাকে ক্ষমা করেন।",
        "মা-বাবার পায়ের নিচে সন্তানের জান্নাত।",
        "ইসলাম হলো শান্তির ধর্ম, একে নিজের জীবনে ধারণ করো।",
        "আল্লাহর রহমত থেকে নিরাশ হয়ো না।",
        "পবিত্র কুরআন হৃদয়ের অন্ধকার দূর করার আলো।",
        "একবার সুবহানাল্লাহ বললে জান্নাতে একটি গাছ লাগানো হয়।",
        "আল্লাহ যাকে হেদায়েত দেন, তাকে কেউ পথভ্রষ্ট করতে পারে না।",
        "যে বিনয়ী হয়, আল্লাহ তার সম্মান বাড়িয়ে দেন।",
        "কবরের প্রথম রাত হবে অনেক দীর্ঘ, আমল ঠিক রাখো।",
        "সাফল্য মানে শুধু টাকা নয়, সাফল্য মানে হলো জান্নাত পাওয়া।",
        "হে আল্লাহ! আমাদের সবাইকে হজে যাওয়ার তৌফিক দান করুন।",
        "মিথ্যা সকল পাপের মূল, সবসময় সত্য বলার চেষ্টা করো।",
        "ধৈর্য ধরো, আল্লাহর ফয়সালা সবসময়ই সুন্দর হয়।",
        "আল্লাহর দেওয়া জীবন আল্লাহর পথেই ব্যয় করা উচিত।",
        "প্রতিটি নিঃশ্বাস আল্লাহর পক্ষ থেকে একটি নেয়ামত।",
        "রোজ হাশরে নামাজের হিসাব সবার আগে নেওয়া হবে।",
        "আল্লাহর পথে ব্যয় করলে সম্পদ কমে না, বরং বাড়ে।",
        "অহংকার পতনের মূল, তাই সবসময় বিনয়ী থাকো।",
        "আল্লাহর ভালোবাসা হলো পৃথিবীর শ্রেষ্ঠ সম্পদ।",
        "কুরআন পড়ুন, এটি কিয়ামতের দিন আপনার জন্য সুপারিশ করবে।",
        "যে দরুদ পড়ে, ফেরেশতারা তার জন্য দোয়া করে।",
        "আল্লাহর ভয় অন্তরে রাখলে কোনো পাপ তোমাকে স্পর্শ করবে না।",
        "দ্বীন হলো কল্যাণ কামনা করার নাম।",
        "আল্লাহর সন্তুষ্টির জন্য ছোট ছোট আমলও অনেক বড়।",
        "হে আল্লাহ! আমাদের শেষ বিদায় যেন ঈমানের সাথে হয়।"
      ];
      
      const randomTag = islamTags[Math.floor(Math.random() * islamTags.length)];
      const randomQuote = islamCaptions[Math.floor(Math.random() * islamCaptions.length)];

      const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(randomTag)}`, { timeout: 15000 });
      const videos = res.data?.data?.videos;

      if (!videos || videos.length === 0) throw new Error("𝐍𝐨 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐯𝐢𝐝𝐞𝐨𝐬 𝐟𝐨𝐮𝐧𝐝.");

      let selected = videos.sort(() => 0.5 - Math.random()).find(v => !global.islamVideoMemory.has(v.video_id));
      if (!selected) {
        global.islamVideoMemory.clear();
        selected = videos[Math.floor(Math.random() * videos.length)];
      }
      global.islamVideoMemory.add(selected.video_id);

      const videoUrl = selected.play || selected.hdplay;
      const pathVideo = path.join(cacheDir, `islam_${Date.now()}.mp4`);

      const response = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(pathVideo);
      response.data.pipe(writer);

      writer.on('finish', () => {
        return message.reply({
          body: `🕌 | 𝐈𝐒𝐋𝐀𝐌𝐈𝐂 𝐒𝐓𝐀𝐓𝐔𝐒, ${name.toUpperCase()}!\n──────────────────\n${randomQuote}\n──────────────────\n👑 𝐌𝐚𝐲 𝐀𝐥𝐥𝐚𝐡 𝐛𝐥𝐞𝐬𝐬 𝐲𝐨𝐮`,
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
      return message.reply("⚠️ | 𝐀𝐏𝐈 𝐁𝐮𝐬𝐲 𝐨𝐫 𝐍𝐨 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 𝐅𝐨𝐮𝐧𝐝. 𝐓𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫!");
    }
  }
};