const axios = require('axios');
const fs = require('fs');
const path = require('path');

const Sh4n = async () => {
  const base = await axios.get('https://raw.githubusercontent.com/Sh4nDev/ShAn.s-Api/refs/heads/main/Api.json');
  return base.data.shan;
};

module.exports = {
  config: { 
    name: "shayari",
    aliases: ["shayarivideo"],
    version: "2.0",
    author: "♡︎ 𝗦𝗵𝗔𝗻 ♡︎", // DO NOT CHANGE AUTHOR INFORMATION
    countDown: 20,
    role: 0,
    shortDescription: {
      en: "𝐒𝐞𝐧𝐝 𝐲𝐨𝐮 𝐚 𝐬𝐡𝐚𝐲𝐚𝐫𝐢 𝐯𝐢𝐝𝐞𝐨",
      bn: "তোমাকে একটা শায়েরি ভিডিও পাঠাবে.."
    },
    longDescription: {
      en: "𝐒𝐞𝐧𝐝 𝐲𝐨𝐮 𝐚 𝐫𝐚𝐧𝐝𝐨𝐦 𝐬𝐡𝐚𝐲𝐚𝐫𝐢 𝐯𝐢𝐝𝐞𝐨",
      bn: "তোমাকে একটা রেনডম শায়েরি ভিডিও পাঠাবে.."
    },
    category: "media",
    guide: {
      en: "{p}{n}",
      bn: "{p}{n}"
    },
  },

langs:{
  en: {
    loadingMessage: "𝐖𝟖 𝐛𝐚𝐛𝐲 😜...",
    invalidApi: "❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐀𝐏𝐈 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐟𝐨𝐫𝐦𝐚𝐭..",
    success: "「 𝐇𝐚𝐫𝐞 𝐲𝐨𝐮𝐫 𝐒𝐡𝐚𝐲𝐚𝐫𝐢 𝐕𝐢𝐝𝐞𝐨 𝐁𝐚𝐛𝐲 <🎬 」",
    error: "⚠ 𝐒𝐨𝐫𝐫𝐲, 𝐭𝐡𝐞 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐮𝐥𝐝𝐧'𝐭 𝐛𝐞 𝐥𝐨𝐚𝐝𝐞𝐝 𝐫𝐢𝐠𝐡𝐭 𝐧𝐨𝐰. 𝐏𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐫𝐞𝐚𝐬𝐨𝐧𝐬:\n\n• 𝐀𝐏𝐈 𝐬𝐞𝐫𝐯𝐞𝐫 𝐢𝐬 𝐝𝐨𝐰𝐧\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 🎀♡︎ 𝗦𝗵𝗔𝗻 ♡︎..."
  },
  bn: {
    loadingMessage: "একটু অপেক্ষা করো বেবি😜...",
    invalidApi: "❌ ভুল এপিআই রেস্পন্স..",
    success: "「 এই নাও তোমার শায়েরি ভিডিও বেবি <🎬 」",
    error: "⚠ 𝐒𝐨𝐫𝐫𝐲, 𝐭𝐡𝐞 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐮𝐥𝐝𝐧'𝐭 𝐛𝐞 𝐥𝐨𝐚𝐝𝐞𝐝 𝐫𝐢𝐠𝐡𝐭 𝐧𝐨𝐰. 𝐏𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐫𝐞𝐚𝐬𝐨𝐧𝐬:\n\n• 𝐀𝐏𝐈 𝐬𝐞𝐫𝐯𝐞𝐫 𝐢𝐬 𝐝𝐨𝐰𝐧\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 🎀♡︎ 𝗦𝗵𝗔𝗻 ♡︎..."
  }
},
  
  onStart: async function ({ message, event, getLang }) {
    try {
      const loadingMessage = await message.reply(getLang("loadingMessage"));
      
      const ShAn = await axios.get(`${await Sh4n()}/ShAn-album-videos?category=shayari&senderID=${event.senderID}&author=${this.config.author}`, {
        timeout: 10000 // 10 seconds timeout
      });
      
      if (!ShAn.data) {
        throw new Error(getLang("invalidApi"));
      }
      const ShaN = ShAn.data.ShAn;

      const filePath = path.join(__dirname, "ShAn.mp4");

      const downloadFile = async (url, filePath) => {
        const response = await axios({
          url,
          method: "GET",
          responseType: "stream",
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        return new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      };

      await downloadFile(ShaN, filePath);
      message.reply({
        body: getLang("success"),
        attachment: fs.createReadStream(filePath)
      });

      await message.unsend(loadingMessage.messageID);
      
    } catch (error) {
      console.error('𝐄𝐫𝐫𝐨𝐫:', error);
      
      try {
        await message.reply(getLang("error"));
      } catch (e) {
        console.error('𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐧𝐝 𝐞𝐫𝐫𝐨𝐫 𝐦𝐞𝐬𝐬𝐚𝐠𝐞:', e);
      }
    }
  }
};