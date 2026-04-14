module.exports = {
  config: {
    name: "report",
    version: "1.3",
    author: "Mr.King",
    countDown: 2,
    role: 0,
    shortDescription: { en: "Report to Meta" },
    category: "fun",
    guide: { en: "{pn} [type] (reply to user)" }
  },

  onStart: async function ({ api, event, args, message }) {
    const { threadID, senderID, messageReply } = event;
    const myBoss = "61588626550420"; // 👑 Boss UID

    // 🛡️ Boss Check
    if (senderID !== myBoss) {
      return message.reply("𝐇𝐨𝐩 𝐛𝐜, 𝐊𝐧𝐨𝐰 𝐲𝐨𝐮𝐫 𝐩𝐥𝐚𝐜𝐞. 𝐎𝐧𝐥𝐲 𝐌𝐫. 𝐊𝐢𝐧𝐠 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬! 👑⚔️");
    }

    if (!messageReply) {
      return message.reply("💌 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐫𝐞𝐩𝐨𝐫𝐭!");
    }

    const reportType = args[0] || "Violation";
    const targetID = messageReply.senderID;

    // 🚀 Step-by-Step Prank (Simplified Logic)
    try {
      const msg1 = await api.sendMessage("🔍 𝐒𝐜𝐚𝐧𝐧𝐢𝐧𝐠 𝐔𝐬𝐞𝐫 𝐃𝐚𝐭𝐚... [𝟏𝟓%]", threadID);
      await new Promise(res => setTimeout(res, 1500));
      await api.unsendMessage(msg1.messageID);

      const msg2 = await api.sendMessage("📡 𝐄𝐬𝐭𝐚𝐛𝐥𝐢𝐬𝐡𝐢𝐧𝐠 𝐌𝐞𝐭𝐚 𝐋𝐢𝐧𝐤... [𝟒𝟓%]", threadID);
      await new Promise(res => setTimeout(res, 1500));
      await api.unsendMessage(msg2.messageID);

      const msg3 = await api.sendMessage("📤 𝐒𝐞𝐧𝐝𝐢𝐧𝐠 𝐄𝐯𝐢𝐝𝐞𝐧𝐜𝐞 𝐋𝐨𝐠𝐬... [𝟖𝟓%]", threadID);
      await new Promise(res => setTimeout(res, 1500));
      await api.unsendMessage(msg3.messageID);

      const finalMsg = `🚫 𝐑𝐄𝐏𝐎𝐑𝐓 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 🚫\n──────────────────\n👤 𝐓𝐚𝐫𝐠𝐞𝐭 𝐈𝐃: ${targetID}\n📂 𝐓𝐲𝐩𝐞: ${reportType.toUpperCase()}\n🏛️ 𝐒𝐭𝐚𝐭𝐮𝐬: 𝐒𝐞𝐧𝐭 𝐭𝐨 𝐌𝐞𝐭𝐚\n──────────────────\n⚠️ 𝐓𝐡𝐢𝐬 𝐈𝐃 𝐰𝐢𝐥𝐥 𝐛𝐞 𝐭𝐞𝐫𝐦𝐢𝐧𝐚𝐭𝐞𝐝 𝐬𝐨𝐨𝐧 𝐛𝐲 𝐌𝐞𝐭𝐚 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲 𝐓𝐞𝐚𝐦!\n\n👑 𝐀𝐝𝐦𝐢𝐧: 𝐌𝐫. 𝐊𝐢𝐧𝐠`;

      return api.sendMessage(finalMsg, threadID);
    } catch (e) {
      return message.reply("⚠️ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐮𝐬𝐲! 𝐓𝐫𝐲 𝐚𝐠𝐚𝐢𝐧.");
    }
  }
};