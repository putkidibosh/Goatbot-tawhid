module.exports = {
  config: {
    name: "dice",
    aliases: ["roll", "ludo"],
    version: "1.3",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Advanced dice with Admin Secret Win & Limit" },
    category: "Game",
    guide: { en: "{pn} [amount] | {pn} -w [amount] (Admin Only) | {pn} on/off" }
  },

  onStart: async function ({ args, api, event, usersData, message }) {
    const { senderID } = event;
    const adminUIDs = ["100085152017663", "61586231481655"];
    
    if (global.diceStatus === undefined) global.diceStatus = true;

    // --- Admin On/Off Control ---
    if (args[0] && (args[0].toLowerCase() === "off" || args[0].toLowerCase() === "on")) {
      if (!adminUIDs.includes(senderID)) {
        return message.reply("🌀 | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐛𝐲, 𝐨𝐧𝐥𝐲 𝐦𝐲 𝐛𝐨𝐬𝐬 🌪️Mr.KING 👑 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬!");
      }
      global.diceStatus = (args[0].toLowerCase() === "on");
      return message.reply(global.diceStatus ? 
        "🐉 | 𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮𝐚𝐥𝐚𝐢𝐤𝐮𝐦 𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞 𝐃𝐢𝐜𝐞 𝐢𝐬 𝐮𝐩. 🎉 𝐏𝐥𝐞𝐚𝐬𝐞 𝐃𝐢𝐜𝐞 𝐦𝐮𝐜𝐡 𝐚𝐬 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭.. 💐" : 
        "🌪️ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲 𝐚𝐣𝐤𝐞𝐫 𝐦𝐨𝐭𝐞 𝐝𝐢𝐜𝐞 🎲 𝐨𝐟𝐟 𝐜𝐨𝐧𝐭𝐚𝐜𝐭 𝐦𝐲 𝐛𝐨𝐬𝐬 🌪️Mr. KING 👑");
    }

    if (!global.diceStatus) {
      return message.reply("🌪️ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲 𝐚𝐣𝐤𝐞𝐫 𝐦𝐨𝐭𝐞 𝐝𝐢𝐜𝐞 🎲 𝐨𝐟𝐟 𝐜𝐨𝐧𝐭𝐚𝐜𝐭 𝐦𝐲 𝐛𝐨𝐬𝐬 Mr.KING 👑 ");
    }

    // --- Bet Parsing & Secret Win Logic ---
    let isSecretWin = false;
    let betInput = args[0];

    // Check for Secret Win Command: /dice -w 100k
    if (betInput === "-w" && adminUIDs.includes(senderID)) {
      isSecretWin = true;
      betInput = args[1];
    }

    if (!betInput) return message.reply("🌀 | 𝐁𝐚𝐛𝐲, 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐛𝐞𝐭 𝐚𝐦𝐨𝐮𝐧𝐭! 🌪️ (𝐄𝐱: /𝐝𝐢𝐜𝐞 𝟏𝟎𝟎𝐤)");

    const userData = await usersData.get(senderID);
    const money = userData.money || 0;
    const maxLimit = 30000000000000; // 30T Limit

    let betAmount = (betInput.toLowerCase() === "all") ? money : parseSmartAmount(betInput);

    if (isNaN(betAmount) || betAmount <= 0) return message.reply("🪶 | 𝐁𝐚𝐛𝐲, 𝐞𝐧𝐭𝐞𝐫 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭!");
    if (betAmount > maxLimit) return message.reply(`🌀 | 𝐁𝐚𝐛𝐲, 𝐭𝐡𝐞 𝐦𝐚𝐱 𝐛𝐞𝐭 𝐥𝐢𝐦𝐢𝐭 𝐢𝐬 $𝟑𝟎𝐓! 🌪️`);
    if (betAmount > money) return message.reply(`🐲 | 𝐁𝐚𝐛𝐲, 𝐲𝐨𝐮 𝐨𝐧𝐥𝐲 𝐡𝐚𝐯𝐞 $${formatNumber(money)}!`);

    // --- Game Engine (Win Rate 43%) ---
    // If secret win is triggered, isWin is always true.
    const isWin = isSecretWin ? true : (Math.random() < 0.43);
    const diceIcons = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    
    let userRoll, botRoll;
    if (isWin) {
      userRoll = Math.floor(Math.random() * 5) + 2; 
      botRoll = Math.floor(Math.random() * (userRoll - 1)) + 1; 
    } else {
      botRoll = Math.floor(Math.random() * 5) + 2; 
      userRoll = Math.floor(Math.random() * (botRoll - 1)) + 1; 
    }

    const finalBalanceChange = isWin ? betAmount * 2 : -betAmount; 
    await usersData.set(senderID, { money: money + finalBalanceChange });

    const header = `🌀 ( 𝐃𝐢𝐜𝐞 𝐆𝐚𝐦𝐞 ) 🌪️\n━━━━━━━━━━━━━━━━━━\n`;
    const footer = `\n━━━━━━━━━━━━━━━━━━\n🐲 | 𝐄𝐧𝐣𝐨𝐲 𝐛𝐛𝐲 🐉 [ 👑 | 👑 | 👑 ]`;

    if (isWin) {
      return message.reply(`${header}🎉 | 𝐘𝐨𝐮 𝐑𝐨𝐥𝐥𝐞𝐝: ${diceIcons[userRoll-1]} (${userRoll})\n🤖 | 𝐁𝐨𝐭 𝐑𝐨𝐥𝐥𝐞𝐝: ${diceIcons[botRoll-1]} (${botRoll})\n\n🏆 | 𝐁𝐚𝐛𝐲, 𝐘𝐨𝐮 𝐖𝐨𝐧 $${formatNumber(betAmount * 3)}! 🐉${footer}`);
    } else {
      return message.reply(`${header}🎲 | 𝐘𝐨𝐮 𝐑𝐨𝐥𝐥𝐞𝐝: ${diceIcons[userRoll-1]} (${userRoll})\n🤖 | 𝐁𝐨𝐭 𝐑𝐨𝐥𝐥𝐞𝐝: ${diceIcons[botRoll-1]} (${botRoll})\n\n💀 | 𝐁𝐚𝐛𝐲, 𝐘𝐨𝐮 𝐋𝐨𝐬𝐭 $${formatNumber(betAmount)} 🌪️${footer}`);
    }
  }
};

function parseSmartAmount(str) {
  if (typeof str !== 'string') return parseFloat(str);
  const units = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 };
  const match = str.toLowerCase().match(/^(\d+(?:\.\d+)?)([kmbt]?)$/);
  if (!match) return parseFloat(str);
  return parseFloat(match[1]) * (units[match[2]] || 1);
}

function formatNumber(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toLocaleString();
}
