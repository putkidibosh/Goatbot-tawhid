const fs = require("fs-extra");

module.exports = {
  config: {
    name: "admin",
    aliases: ["add", "admin", "admins"],
    version: "1.3.0",
    author: "Mr.King",
    countDown: 5,
    role: 2, 
    category: "𝗕𝗢𝗧 𝗠𝗔𝗡𝗔𝗚𝗘𝗠𝗘𝗡𝗧",
    guide: {
      en: "{pn} [add | remove | list] [@tag | reply | UID]"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { threadID, messageID, mentions, messageReply } = event;
    const { config } = global.GoatBot;
    const adminList = config.adminBot;

    api.setMessageReaction("🥷🏼", messageID, () => {}, true);

    // --- LIST FEATURE ---
    if (!args[0] || args[0] === "list") {
      let msg = `>🎀 ( 𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧𝐬 )\n━━━━━━━━━━━━━━━━━━\n`;
      for (let i = 0; i < adminList.length; i++) {
        const name = await usersData.getName(adminList[i]);
        msg += `${i + 1}. ${name}\n➥ 𝐔𝐈𝐃: ${adminList[i]}\n`;
      }
      msg += `━━━━━━━━━━━━━━━━━━\n• 𝐓𝐨𝐭𝐚𝐥 𝐀𝐝𝐦𝐢𝐧𝐬: ${adminList.length} 🐉`;
      return api.sendMessage(msg, threadID, messageID);
    }

    const action = args[0].toLowerCase();

    // --- ADD/REMOVE LOGIC ---
    let uids = [];
    if (Object.keys(mentions).length > 0) {
      uids = Object.keys(mentions);
    } else if (messageReply) {
      uids.push(messageReply.senderID);
    } else if (args[1] && !isNaN(args[1])) {
      uids.push(args[1]);
    }

    if (uids.length === 0 && (action === "add" || action === "remove")) {
      return api.sendMessage("⚠️ | 𝐁𝐚𝐛𝐲, 𝐈 𝐧𝐞𝐞𝐝 𝐚 𝐔𝐈𝐃, 𝐚 𝐭𝐚𝐠, 𝐨𝐫 𝐚 𝐫𝐞𝐩𝐥𝐲!", threadID, messageID);
    }

    let resultMsg = `>🎀 ( 𝐀𝐝𝐦𝐢𝐧 𝐔𝐩𝐝𝐚𝐭𝐞 )\n━━━━━━━━━━━━━━━━━━\n`;

    if (action === "add" || action === "-a") {
      for (const uid of uids) {
        if (!adminList.includes(uid)) {
          adminList.push(uid);
          const name = await usersData.getName(uid);
          resultMsg += `✅ 𝐀𝐝𝐝𝐞𝐝: ${name}\n`;
        } else {
          const name = await usersData.getName(uid);
          resultMsg += `⚠️ 𝐀𝐥𝐫𝐞𝐚𝐝𝐲 𝐀𝐝𝐦𝐢𝐧: ${name}\n`;
        }
      }
    } else if (action === "remove" || action === "-r") {
      for (const uid of uids) {
        if (adminList.includes(uid)) {
          const index = adminList.indexOf(uid);
          adminList.splice(index, 1);
          const name = await usersData.getName(uid);
          resultMsg += `🗑️ 𝐑𝐞𝐦𝐨𝐯𝐞𝐝: ${name}\n`;
        } else {
          const name = await usersData.getName(uid);
          resultMsg += `❌ 𝐍𝐨𝐭 𝐚𝐧 𝐀𝐝𝐦𝐢𝐧: ${name}\n`;
        }
      }
    }

    try {
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
      resultMsg += `━━━━━━━━━━━━━━━━━━\n• 𝐒𝐲𝐬𝐭𝐞𝐦 𝐮𝐩𝐝𝐚𝐭𝐞𝐝 𝐛𝐛𝐲🐉`;
      return api.sendMessage(resultMsg, threadID, messageID);
    } catch (err) {
      return api.sendMessage("❌ | 𝐁𝐚𝐛𝐲, 𝐜𝐨𝐮𝐥𝐝𝐧'𝐭 𝐬𝐚𝐯𝐞 𝐜𝐨𝐧𝐟𝐢𝐠!", threadID, messageID);
    }
  }
};