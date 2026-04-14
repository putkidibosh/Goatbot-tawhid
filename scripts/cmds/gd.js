const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Initialize Global Permissions & Status
if (!global.gdUsers) global.gdUsers = new Set(["61588626550420"]);
if (global.gdStatus === undefined) global.gdStatus = true;

module.exports = {
  config: {
    name: "gd",
    aliases: ["girls", "hot", "horny", "gaja", "uttejona", "🔞"],
    version: "1.2.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Get viral girls and trending reels" },
    category: "media",
    guide: { en: "{pn} add (reply) | {pn} on/off" }
  },

  onStart: async function ({ api, event, message, args }) {
    const { senderID, type, messageReply } = event;
    const bossID = "61588626550420";

    // --- Admin Controls ---
    if (args[0] === "add" && senderID === bossID) {
      if (type !== "message_reply") return message.reply("❌ | Reply to a user's message to add them!");
      global.gdUsers.add(messageReply.senderID);
      return message.reply(`✅ | Added UID: ${messageReply.senderID} to GD list.`);
    }

    if (args[0] === "on" && senderID === bossID) {
      global.gdStatus = true;
      return message.reply("✅ | GD System Activated!");
    }

    if (args[0] === "off" && senderID === bossID) {
      global.gdStatus = false;
      return message.reply("❌ | GD System Deactivated!");
    }

    // --- Execution ---
    if (!global.gdStatus) return message.reply("⚠️ | Command is currently OFF by Admin.");
    if (!global.gdUsers.has(senderID)) return message.reply("🚫 | You don't have permission to use this!");

    return this.handleGD({ api, event, message });
  },

  onChat: async function ({ api, event, message }) {
    if (!event.body || !global.gdStatus) return;
    
    const body = event.body.toLowerCase();
    const triggers = ["girls", "hot", "horny", "gaja", "uttejona", "gd"];

    if (triggers.some(t => body === t) && global.gdUsers.has(event.senderID)) {
      return this.handleGD({ api, event, message });
    }
  },

  handleGD: async function ({ api, event, message }) {
    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    const pathVideo = path.join(cacheDir, `gd_${Date.now()}.mp4`);

    try {
      api.setMessageReaction("🔥", event.messageID, () => {}, true);
      const loadingMsg = await message.reply("⌛ | Processing your request... Please wait.");

      // Expanded Keywords List
      const keywords = [
        "girls viral reels", "Russian girls dance", "new Bhojpuri song 2024", 
        "Bhojpuri viral video", "seta jawani reels", "Karab Na Gula song", 
        "mere sas ke teen bete reels", "sheesha song dance", "hot viral girls", 
        "trending girl dance", "Russian dance tiktok"
      ];
      
      const query = keywords[Math.floor(Math.random() * keywords.length)];

      // Fetching from TikWM API
      const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(query)}`);
      
      if (!res.data.data || !res.data.data.videos || res.data.data.videos.length === 0) {
        api.unsendMessage(loadingMsg.messageID);
        return message.reply("⚠️ | No videos found for this category right now.");
      }

      // Randomly pick one from the top results
      const video = res.data.data.videos[Math.floor(Math.random() * Math.min(10, res.data.data.videos.length))];
      const videoUrl = video.play;

      const videoRes = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
      const writer = fs.createWriteStream(pathVideo);
      videoRes.data.pipe(writer);

      writer.on('finish', () => {
        api.unsendMessage(loadingMsg.messageID);
        return message.reply({
          body: `✅ | Request: ${query}\n🎬 | Title: ${video.title || "Viral Video"}`,
          attachment: fs.createReadStream(pathVideo)
        }, () => {
          if (fs.existsSync(pathVideo)) fs.unlinkSync(pathVideo);
        });
      });

    } catch (err) {
      console.error(err);
      return message.reply("❌ | Server Error! Try again later.");
    }
  }
};