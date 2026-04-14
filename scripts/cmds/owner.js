const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    version: "1.0.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Show Owner Info and a 4K Car/Bike edit" },
    category: "info",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;
    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    // 1. Initial reaction for speed
    api.setMessageReaction("👑", messageID, () => {}, true);

    try {
      // 2. Fetch 4K Edit Video (Randomly picks Car or Bike)
      const tags = ["4k car edit", "4k bike edit", "supercar aesthetic edit"];
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      
      const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(randomTag)}`);
      const video = res.data.data.videos[0];
      const videoPath = path.join(cacheDir, `owner_edit_${Date.now()}.mp4`);

      // 3. Fast buffer processing to prevent "Service busy"
      const videoData = await axios.get(video.play, { responseType: "arraybuffer" });
      fs.writeFileSync(videoPath, Buffer.from(videoData.data));

      // 4. Construct Owner Info message
      const ownerInfo = `╔══════════════╗
   𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎
╚══════════════╝
❖ 𝐍𝐀𝐌𝐄: ♡ Mr.King ♡
❖ 𝐆𝐄𝐍𝐃𝐄𝐑: Male
❖ 𝐁𝐈𝐑𝐓𝐇𝐃𝐀𝐘: 1st/March
❖ 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍: Islam
❖ 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏: Single 
❖ 𝐇𝐎𝐁𝐁𝐘: Coding 👨‍💻
❖ 𝐇𝐄𝐈𝐆𝐇𝐓: 6 Inch 🌚
❖ 𝐌𝐄𝐒𝐒𝐄𝐍𝐆𝐄𝐑: Tawhid islam　🐉
❖ 𝐍𝐈𝐂𝐊𝐍𝐀𝐌𝐄: ♡ King♡

💝 𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆 𝐌𝐄 💝`;

      return api.sendMessage({
        body: ownerInfo,
        attachment: fs.createReadStream(videoPath)
      }, threadID, () => {
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
      }, messageID);

    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ | 𝐁𝐚𝐛𝐲, 𝐭𝐡𝐞 𝐨𝐰𝐧𝐞𝐫 𝐬𝐞𝐫𝐯𝐢𝐜𝐞 𝐢𝐬 𝐭𝐞𝐦𝐩𝐨𝐫𝐚𝐫𝐢𝐥𝐲 𝐛𝐮𝐬𝐲!", threadID, messageID);
    }
  }
};