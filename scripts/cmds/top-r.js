module.exports = {
  config: {
    name: "top-r",
    version: "2.7.0",
    author: "Mr.King",
    countDown: 2,
    role: 2, 
    shortDescription: { en: "Strictly for the 2 Main Bosses only" },
    category: "Admin-System",
  },

  onStart: async function ({ args, api, event, usersData, message }) {
    const { senderID, messageReply, mentions } = event;
    
    // ⚔️ শুধুমাত্র এই ২ জন বস ব্যবহার করতে পারবে
    const strictBosses = ["61588626550420", "61586231481655"]; 

    if (!strictBosses.includes(senderID)) {
      return message.reply(`🌀 ⚔️ 🌀\n━━━━━━━━━━━━━━━━━━\n⚠️ | **𝐒𝐨𝐫𝐫𝐲 𝐲𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐭𝐡𝐞 𝐛𝐨𝐬𝐬** 🌀⚔️\n━━━━━━━━━━━━━━━━━━\n🌀 ⚔️ 🌀`);
    }

    const type = args[0]?.toLowerCase();
    
    // 📋 Boss Menu
    if (type === "menu") {
      const menu = ` 🪄( 𝐁𝐎𝐒𝐒 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 𝐏𝐀𝐍𝐄𝐋 ) 🪄
━━━━━━━━━━━━━━━━━━
✨ 𝟏. 𝐀𝐃𝐃 𝐌𝐎𝐍𝐄𝐘:
/top-r add [tag/reply/uid] [amount]

✨ 𝟐. 𝐑𝐄𝐌𝐎𝐕𝐄 𝐌𝐎𝐍𝐄𝐘:
/top-r remove [tag/reply/uid] [amount]

✨ 𝟑. 𝐃𝐄𝐋𝐄𝐓𝐄 𝐃𝐀𝐓𝐀:
/top-r del [tag/reply/uid]

✨ 𝟒. 𝐒𝐄𝐓 𝐑𝐈𝐂𝐇:
/top-r rich [tag/reply/uid]

✨ 𝟓. 𝐒𝐄𝐓 𝐏𝐎𝐎𝐑:
/top-r poor [tag/reply/uid]
━━━━━━━━━━━━━━━━━━
🌀 ⚔️ 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐁𝐚𝐜𝐤, 𝐑𝐞𝐚𝐥 𝐁𝐨𝐬𝐬! 🌀 ⚔️`;
      return message.reply(menu);
    }

    let targetID;
    if (messageReply) {
      targetID = messageReply.senderID;
    } else if (Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
    } else if (args[1] && !isNaN(args[1])) {
      targetID = args[1];
    }

    if (!targetID || !type) return message.reply("⚠️ | 𝐁𝐨𝐬𝐬, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐮𝐬𝐞 /𝐭𝐨𝐩-𝐫 𝐦𝐞𝐧𝐮🌀⚔️");

    try {
      let userData = await usersData.get(targetID);
      let currentMoney = userData.money || 0;
      let amount = parseSmartAmount(args[args.length - 1]);

      switch (type) {
        case "add":
          await usersData.set(targetID, { money: currentMoney + amount });
          message.reply(`🌀 ⚔️\n✅ | 𝐀𝐝𝐝𝐞𝐝 $${formatNumber(amount)} 𝐭𝐨 ${userData.name}!\n🌀 ⚔️`);
          break;

        case "remove":
          await usersData.set(targetID, { money: Math.max(0, currentMoney - amount) });
          message.reply(`🌀 ⚔️\n✅ | 𝐑𝐞𝐦𝐨𝐯𝐞𝐝 $${formatNumber(amount)} 𝐟𝐫𝐨𝐦 ${userData.name}!\n🌀 ⚔️`);
          break;

        case "del":
          await usersData.del(targetID);
          message.reply(`🌀 ⚔️\n✅ | **𝐃𝐞𝐥𝐞𝐭𝐞𝐝 𝐚𝐥𝐥 𝐝𝐚𝐭𝐚 𝐨𝐟 ${targetID}!**\n🌀 ⚔️`);
          break;

        case "rich":
          await usersData.set(targetID, { money: 999999999999999999999n });
          message.reply(`👑 🌀\n✅ | ${userData.name} 𝐢𝐬 𝐧𝐨𝐰 𝐚 𝐁𝐢𝐥𝐥𝐢𝐨𝐧𝐚𝐢𝐫𝐞 𝐁𝐨𝐬𝐬!\n💰 🌀⚔️`);
          break;

        case "poor":
          await usersData.set(targetID, { money: 0 });
          message.reply(`🌀 ⚔️\n✅ | ${userData.name} 𝐢𝐬 𝐧𝐨𝐰 𝐏𝐨𝐨𝐫!\n🌀 ⚔️`);
          break;

        default:
          message.reply("⚠️ | 𝐖𝐫𝐨𝐧𝐠 𝐂𝐨𝐦𝐦𝐚𝐧𝐝, 𝐁𝐨𝐬𝐬!🌀⚔️");
      }
    } catch (e) {
      message.reply("❌ | 𝐄𝐫𝐫𝐨𝐫: 𝐔𝐬𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝!🌀⚔️");
    }
  }
};

function parseSmartAmount(str) {
  if (!str) return 0;
  const units = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 };
  const match = str.toString().toLowerCase().match(/^(\d+(?:\.\d+)?)([kmbt]?)$/);
  return match ? parseFloat(match[1]) * (units[match[2]] || 1) : parseInt(str) || 0;
}

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
}