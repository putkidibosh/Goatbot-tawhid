const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

if (!global.animeMemory) global.animeMemory = new Set();

module.exports = {
  config: {
    name: "prefix",
    version: "2.5.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "𝐒𝐭𝐲𝐥𝐢𝐬𝐡 𝐏𝐫𝐞𝐟𝐢𝐱 𝐌𝐚𝐧𝐚𝐠𝐞𝐫 𝐰𝐢𝐭𝐡 𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨" },
    category: "config",
    guide: {
      en: "{pn} <symbol> | {pn} reset"
    }
  },

  onStart: async function ({ message, event, threadsData, args, usersData }) {
    const { threadID, senderID } = event;
    const name = await usersData.getName(senderID);
    
    // Authorized UIDs (Bot Admin + Your Special UID)
    const authorizedUIDs = ["61587982664508", "61588626550420"]; 
    
    const threadData = await threadsData.get(threadID);
    const currentPrefix = threadData.data.prefix || global.GoatBot.config.prefix;

    const header = `>🎀 ( 𝐌𝐢𝐬𝐬 𝐐𝐮𝐞𝐞𝐧 𝐂𝐨𝐧𝐟𝐢𝐠 )\n━━━━━━━━━━━━━━━━━━\n`;
    const footer = `\n━━━━━━━━━━━━━━━━━━\n👑 𝐁𝐎𝐒𝐒: 𝐑 𝐎 𝐍 𝐈\n• 𝐄𝐧𝐣𝐨𝐲 𝐛𝐛𝐲🐉 [ 💛 | 💛 | 💛 ]`;

    // 1. View Prefix Info (Everyone can see)
    if (!args[0]) {
      const msg = `${header}🦋 𝘼𝙎𝙎𝘼𝙇𝘼𝙈𝙐𝘼𝙇𝘼𝙄𝙆𝙐𝙈 ✨\n\n~ 🌀 𝐒𝐘𝐒𝐓𝐄𝐌: [ ${global.GoatBot.config.prefix} ]\n~ ♻️ 𝐆𝐑𝐎𝐔𝐏: [ ${currentPrefix} ]\n\n💠 𝙃𝙀𝙍𝙀 𝙄𝙎 𝙈𝙔 𝙊𝙒𝙉𝙀𝐑 💠\n~ 𝙁𝘽✨: 𝐓𝐀𝐖𝐇𝐈𝐃 𝐈𝐒𝐋𝐀𝐌 😍${footer}`;
      return message.reply(msg);
    }

    // ⛔ SECURITY & GALI CHECK
    if (!authorizedUIDs.includes(senderID)) {
      const galis = [
          "তোর সাহস তো কম না রে বলদ",
          "ফকিন্নির পুত, নিজের সীমানায় থাক",
          "বেয়াদব ছেলে, বড়দের কাজে হাত দিস কেন?",
          "তোর মতো আবালরে কে পারমিশন দিছে রে?",
          "গাঞ্জাখোর, বেশি পন্ডিতি করিস না",
          "খানকির পোলা, তোর বাপে কি প্রেক্সিন পাল্টাইতে শিখাইছে?"
      ];
      const randomGali = galis[Math.floor(Math.random() * galis.length)];
      
      return message.reply(`ঐ ${name}, ${randomGali}! আগে আমার বস Tawhid এর পারমিশন নে গিয়ে 🙄🙄🍌`);
    }

    // 2. Reset Logic (Authorized Only)
    if (args[0].toLowerCase() === 'reset') {
      await threadsData.set(threadID, null, "data.prefix");
      return message.reply(`${header}✅ | 𝐏𝐫𝐞𝐟𝐢𝐱 𝐫𝐞𝐬𝐞𝐭 𝐭𝐨 𝐝𝐞𝐟𝐚𝐮𝐥𝐭: [ ${global.GoatBot.config.prefix} ]${footer}`);
    }

    // 3. Prefix Change Logic (Authorized Only)
    const newPrefix = args[0];
    
    if (args[1] === "-g") {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(`${header}🌎 | 𝐆𝐥𝐨𝐛𝐚𝐥 𝐏𝐫𝐞𝐟𝐢𝐱 𝐮𝐩𝐝𝐚𝐭𝐞𝐝: [ ${newPrefix} ]${footer}`);
    }

    await threadsData.set(threadID, newPrefix, "data.prefix");
    return message.reply(`${header}♻️ | 𝐆𝐫𝐨𝐮𝐩 𝐏𝐫𝐞𝐟𝐢𝐱 𝐮𝐩𝐝𝐚𝐭𝐞𝐝: [ ${newPrefix} ]${footer}`);
  },

  onChat: async function ({ event, message, threadsData, api }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      const threadData = await threadsData.get(event.threadID);
      const threadPrefix = threadData.data.prefix || global.GoatBot.config.prefix;
      
      api.setMessageReaction("✨", event.messageID, () => {}, true);
      const loadingMsg = await message.reply("🔥 | Chill Up『 ᴀᴅᴅᴀ ᴠᴏʀᴘᴜʀ 』☁️🫧 🪶👑");

      const cacheDir = path.join(__dirname, 'cache');
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
      const pathVideo = path.join(cacheDir, `prefix_anime_${Date.now()}.mp4`);

      try {
        const searchTerms = "anime aura aesthetic edit 4k";
        const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(searchTerms)}`);
        const videos = res.data?.data?.videos;

        if (!videos || videos.length === 0) throw new Error("No video found");

        let selected = videos.find(v => !global.animeMemory.has(v.video_id)) || videos[0];
        global.animeMemory.add(selected.video_id);

        const videoRes = await axios({
          method: 'get',
          url: selected.play,
          responseType: 'stream'
        });

        const writer = fs.createWriteStream(pathVideo);
        videoRes.data.pipe(writer);

        writer.on('finish', () => {
          api.unsendMessage(loadingMsg.messageID);
          const bodyMsg = `🦋 𝘼𝙎𝙎𝘼𝙇𝘼𝙈𝙐𝘼𝙇𝘼𝙄𝙆𝙐𝙈 ✨\n━━━━━━━━━━━━━━━━━━\n𝙃𝙚𝙡𝙡𝙤, 𝙄 𝙖𝙢 ♡ 𝙈𝙞𝙨𝙨 𝙌𝙪𝙚𝙚𝐧 👑 ♡\n🌀 𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐟𝐢𝐱: [ ${global.GoatBot.config.prefix} ]\n♻️ 𝐆𝐫𝐨𝐮𝐩 𝐏𝐫𝐞𝐟𝐢𝐱: [ ${threadPrefix} ]\n━━━━━━━━━━━━━━━━━━\n💠 𝙃𝙀𝙍𝙀 𝙄𝙎 𝐌𝐘 𝐎𝐖𝐍𝐄𝐑 💠\n~ 𝙁𝘽: 𝐓𝐚𝐰𝐡𝐢𝐝 𝐈𝐬𝐥𝐚𝐦 🪶\n━━━━━━━━━━━━━━━━━━\n👑 𝐁𝐎𝐒𝐒: 𝐑 𝐎 𝐍 𝐈\n• 𝐄𝐧𝐣𝐨𝐲 𝐛𝐛𝐲🐉 [ 💛 | 💛 | 💛 ]`;
          
          return message.reply({
            body: bodyMsg,
            attachment: fs.createReadStream(pathVideo)
          }, () => {
            if (fs.existsSync(pathVideo)) fs.unlinkSync(pathVideo);
          });
        });

      } catch (err) {
        console.error(err);
        api.unsendMessage(loadingMsg.messageID);
        return message.reply(`🦋 𝘼𝙎𝙎𝘼𝙇𝘼𝙈𝙐𝘼𝙇𝘼𝙄𝙆𝙐𝙈 ✨\n\n~ 𝐏𝐫𝐞𝐟𝐢𝐱: [ ${threadPrefix} ]\n⚠️ 𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐫𝐯𝐞𝐫 𝐁𝐮𝐬𝐲!`);
      }
    }
  }
};