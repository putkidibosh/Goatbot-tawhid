module.exports = {
  config: {
    name: "grouplist",
    aliases: ["group-r", "gl"],
    version: "3.0.0",
    author: "Mr.King",
    countDown: 5,
    role: 2, 
    shortDescription: { en: "View all groups and remove bot from specific groups" },
    category: "Admin-System",
  },

  onStart: async function ({ api, event, args, message }) {
    const { threadID, senderID } = event;
    
    // ⚔️ শুধুমাত্র এই ২ জন বস ব্যবহার করতে পারবে
    const strictBosses = ["61588626550420", "100078992950475"];

    if (!strictBosses.includes(senderID)) {
      return message.reply(`🌀 ⚔️ 🌀\n━━━━━━━━━━━━━━━━━━\n⚠️ | 𝐒𝐨𝐫𝐫𝐲 𝐲𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐭𝐡𝐞 𝐛𝐨𝐬𝐬 🌀⚔️\n━━━━━━━━━━━━━━━━━━\n🌀 ⚔️ 🌀`);
    }

    try {
      // ২. সব গ্রুপের লিস্ট সংগ্রহ করা
      const allThreads = await api.getThreadList(100, null, ["INBOX"]);
      const groupList = allThreads.filter(group => group.isGroup && group.threadID !== threadID);

      // ৩. গ্রুপ রিমুভ করার লজিক (/group-r [number])
      if (args[0] === "remove" || event.body.toLowerCase().startsWith("/group-r")) {
        const index = parseInt(args[args.length - 1]);
        if (isNaN(index) || index <= 0 || index > groupList.length) {
          return message.reply("⚔️ | 𝐁𝐨𝐬𝐬, 𝐯𝐚𝐥𝐢𝐝 𝐠𝐫𝐨𝐮𝐩 𝐧𝐮𝐦𝐛𝐞𝐫 𝐝𝐚𝐰! 🌀");
        }

        const targetGroup = groupList[index - 1];
        const targetID = targetGroup.threadID;
        const targetName = targetGroup.name || "Unknown Group";

        await api.removeUserFromGroup(api.getCurrentUserID(), targetID);
        return message.reply(`⚔️ 🌀 🌪️\n✅ | 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐥𝐞𝐟𝐭 𝐟𝐫𝐨𝐦: ${targetName}\n🐲 🐉`);
      }

      // ৪. গ্রুপ লিস্ট প্রদর্শন
      if (groupList.length === 0) return message.reply("⚔️ | 𝐁𝐨𝐬𝐬, 𝐛𝐨𝐭 𝐤𝐨𝐧𝐨 𝐠𝐫𝐨𝐮𝐩-𝐞 𝐧𝐞𝐢! 🌀");

      let msg = "👑 🐲 ( 𝐆𝐑𝐎𝐔𝐏 𝐋𝐈𝐒𝐓 ) 🐲 👑\n━━━━━━━━━━━━━━━━━━\n";
      groupList.forEach((group, i) => {
        msg += `${i + 1}. ${group.name || "Unknown Group"}\nID: ${group.threadID}\n\n`;
      });
      msg += "━━━━━━━━━━━━━━━━━━\n✨ 𝐔𝐬𝐞: /𝐠𝐫𝐨𝐮𝐩-𝐫 [𝐧𝐮𝐦𝐛𝐞𝐫] 𝐭𝐨 𝐫𝐞𝐦𝐨𝐯𝐞\n⚔️ 🌀 🌪️ 🐲 🐉";

      return message.reply(msg);
    } catch (e) {
      return message.reply("⚔️ | 𝐄𝐫𝐫𝐨𝐫 𝐡𝐨𝐲𝐞𝐜𝐡𝐞, 𝐛𝐨𝐬𝐬! 🌀");
    }
  }
};