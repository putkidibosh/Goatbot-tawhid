const { getStreamsFromAttachment } = global.utils;

module.exports = {
  config: {
    name: "notification",
    aliases: ["notify", "noti", "announce"],
    version: "2.5.0",
    author: "NTKhang & Mr.King", 
    countDown: 5,
    role: 2, 
    shortDescription: { en: "Send stylish notifications to all groups" },
    category: "owner",
    guide: {
      en: "{pn} <message> | reply to a photo/video"
    },
    envConfig: {
      delayPerGroup: 700 
    }
  },

  onStart: async function ({ message, api, event, args, threadsData, usersData }) {
    const { threadID, senderID, attachments, messageReply, type } = event;
    const delay = 700;

    if (!args[0] && type !== "message_reply" && attachments.length === 0) {
      return message.reply(">🎀\n• 𝐁𝐚𝐛𝐲, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐭𝐨 𝐧𝐨𝐭𝐢𝐟𝐲!\n• 𝐄𝐧𝐣𝐨𝐲 𝐛𝐛𝐲🐉 [ 💛 | 💛 | 💛 ]");
    }

    const adminName = await usersData.getName(senderID);
    const msgContent = args.join(" ");

    const header = `>🎀 ( 𝐌𝐢𝐬𝐬 𝐐𝐮𝐞𝐞𝐧 𝐍𝐨𝐭𝐢𝐟𝐲 )\n━━━━━━━━━━━━━━━━━━\n`;
    const footer = `\n━━━━━━━━━━━━━━━━━━\n• 𝐀𝐝𝐦𝐢𝐧: ${adminName}\n• 𝐄𝐧𝐣𝐨𝐲 𝐛𝐛𝐲🐉 [ 💛 | 💛 | 💛 ]`;

    const formSend = {
      body: `${header}📢 𝘼𝙏𝙏𝙀𝙉𝙏𝙄𝙊𝙉 𝘽𝘽𝙔 ✨\n\n${msgContent || "No text content"}${footer}`,
      attachment: await getStreamsFromAttachment(
        [
          ...attachments,
          ...(messageReply?.attachments || [])
        ].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
      )
    };

    const allThreads = await threadsData.getAll();
    const activeGroups = allThreads.filter(t => t.isGroup && t.members.some(m => m.userID == api.getCurrentUserID() && m.inGroup));

    message.reply(`🚀 | 𝐒𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐭𝐨 ${activeGroups.length} 𝐠𝐫𝐨𝐮𝐩𝐬...`);

    let successCount = 0;
    let failCount = 0;

    for (const thread of activeGroups) {
      try {
        await api.sendMessage(formSend, thread.threadID);
        successCount++;
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (e) {
        failCount++;
      }
    }

    return message.reply(
      `${header}` +
      `✅ 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲: ${successCount} 𝐆𝐫𝐨𝐮𝐩𝐬\n` +
      `❌ 𝐅𝐚𝐢𝐥𝐞𝐝: ${failCount} 𝐆𝐫𝐨𝐮𝐩𝐬\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `✨ 𝐀𝐥𝐥 𝐝𝐨𝐧𝐞, 𝐌𝐫. 𝐊𝐢𝐧𝐠!`
    );
  }
};
