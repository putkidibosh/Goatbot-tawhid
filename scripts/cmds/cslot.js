module.exports = {
  config: {
    name: "cslot",
    aliases: ["cs", "slot2"],
    version: "2.0.0",
    author: "Mr.King",
    countDown: 6,
    role: 0,
    category: "Game",
  },

  onStart: async function ({ args, api, event, usersData, message }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const money = userData.money || 0;
    const name = await usersData.getName(senderID);
    const adminID = "61588626550420"; 

    
    if (args[0] === "off" && senderID === adminID) {
      global.slotStatus = false;
      return message.reply(`🥀 💔 📴\n━━━━━━━━━━━━━━━━━━\n⚠️ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲, 𝐜𝐬𝐥𝐨𝐭 𝐨𝐟𝐟! 📴\n━━━━━━━━━━━━━━━━━━\n💔 🥀 📴`);
    }
    
    if (args[0] === "on" && senderID === adminID) {
      global.slotStatus = true;
      return message.reply("✅ | 𝐁𝐚𝐛𝐲, 𝐜𝐬𝐥𝐨𝐭 𝐚𝐛𝐚𝐫 𝐜𝐡𝐚𝐥𝐮 𝐡𝐨𝐲𝐞𝐜𝐡𝐞! 🎉");
    }

    
    if (global.slotStatus === false) {
      return message.reply(`🥀 💔 📴\n━━━━━━━━━━━━━━━━━━\n⚠️ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲, 𝐜𝐬𝐥𝐨𝐭 𝐨𝐟𝐟! 📴\n━━━━━━━━━━━━━━━━━━\n💔 🥀 📴`);
    }

    
    const today = new Date().toISOString().slice(0, 10);
    let slotLimit = userData.cslot_limit || { date: today, count: 0 };

    if (slotLimit.date !== today) {
      slotLimit = { date: today, count: 0 };
    }

    if (slotLimit.count >= 2) {
      return message.reply(`🥀 💔 📴\n━━━━━━━━━━━━━━━━━━\n⚠️ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲, 𝐜𝐬𝐥𝐨𝐭 𝐨𝐟𝐟! 📴\n━━━━━━━━━━━━━━━━━━\n💔 🥀 📴`);
    }

    
    const betInput = args[0];
    if (!betInput) return message.reply("⚔️ | 𝐁𝐚𝐛𝐲, 𝐡𝐨𝐰 𝐦𝐮𝐜𝐡 𝐝𝐨 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐛𝐞𝐭? (𝐄𝐱: 𝟏𝟎𝟎𝐌 𝐨𝐫 𝐚𝐥𝐥) 🎉");

    let betAmount = betInput.toLowerCase() === "all" ? money : parseSmartAmount(betInput);
    const maxBet = 1000000000000000; // ১০০০০০০০০০০০০০০০টি(1000000000000000T)

    if (isNaN(betAmount) || betAmount <= 0) return message.reply("⚠️ | 𝐄𝐧𝐭𝐞𝐫 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭, 𝐛𝐛𝐲!");
    if (betAmount > maxBet) return message.reply(`❌ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐛𝐲, 𝐭𝐡𝐞 𝐦𝐚𝐱𝐢𝐦𝐮𝐦 𝐛𝐞𝐭 𝐥𝐢𝐦𝐢𝐭 is $${formatNumber(maxBet)} (1000000000000000𝐁)!`);
    if (betAmount > money) return message.reply(`❌ | 𝐘𝐨𝐮 𝐝𝐨𝐧'𝐭 𝐡𝐚𝐯𝐞 𝐞𝐧𝐨𝐮𝐠𝐡 𝐦𝐨𝐧𝐞𝐲!`);

    
    slotLimit.count += 1;
    await usersData.set(senderID, { cslot_limit: slotLimit });

    
    const isWin = Math.random() < 0.80; 

    if (isWin) {
      const reward = betAmount * 10;
      await usersData.set(senderID, { money: money + reward });
      return message.reply(`⚔️ 🎉 🎉 😘\n━━━━━━━━━━━━━━━━━━\n🎰 𝐂𝐒𝐋𝐎𝐓 𝐖𝐈𝐍𝐍𝐄𝐑!\n\n👤 𝐔𝐬𝐞𝐫: ${name}\n💰 𝐘𝐨𝐮 𝐖𝐨𝐧: $${formatNumber(reward)}\n\n✨ 『 ᴀᴅᴅᴀ ᴠᴏʀᴘᴜʀ 』☁️🫧💖\n━━━━━━━━━━━━━━━━━━\n😘 🎉 🎉 ⚔️`);
    } else {
      await usersData.set(senderID, { money: money - betAmount });
      return message.reply(`💀 | 𝐎𝐡 𝐧𝐨 𝐛𝐛𝐲! 𝐘𝐨𝐮 𝐥𝐨𝐬𝐭 $${formatNumber(betAmount)} ❌`);
    }
  }
};

function parseSmartAmount(str) {
  const units = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 };
  const match = str.toLowerCase().match(/^(\d+(?:\.\d+)?)([kmbt]?)$/);
  return match ? parseFloat(match[1]) * (units[match[2]] || 1) : parseFloat(str);
}

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
}