module.exports = {
  config: {
    name: "top",
    version: "2.5.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "View the luxury leaderboard of richest babies" },
    category: "economy",
    guide: { en: "{pn} [number]" }
  },

  onStart: async function ({ api, event, message, usersData, args }) {
    const { threadID, messageID } = event;

    try {
      const allUserData = await usersData.getAll();
      const sortedUsers = allUserData
        .filter((user) => user.money !== undefined && !isNaN(user.money))
        .sort((a, b) => b.money - a.money);

      if (sortedUsers.length === 0) {
        return message.reply("⚠️ | 𝐁𝐚𝐛𝐲, 𝐭𝐡𝐞 𝐯𝐚𝐮𝐥𝐭 𝐢𝐬 𝐞𝐦𝐩𝐭𝐲!");
      }

      const topCount = Math.min(parseInt(args[0]) || 10, sortedUsers.length);
      
      // --- Stylish Header ---
      let msg = `╔════════════════╗\n   ✨  𝐑𝐈𝐂𝐇𝐄𝐒𝐓 𝐁𝐀𝐁𝐈𝐄𝐒 ✨\n╚════════════════╝\n\n`;

      for (let i = 0; i < topCount; i++) {
        const user = sortedUsers[i];
        const formattedBalance = formatEndlessEconomy(user.money);
        
        // Ranking Aesthetics
        let rankBadge;
        if (i === 0) rankBadge = "👑 𝓝𝓸. 1";
        else if (i === 1) rankBadge = "🥈 𝓝𝓸. 2";
        else if (i === 2) rankBadge = "🥉 𝓝𝓸. 3";
        else rankBadge = `🔹 𝓡𝓪𝓷𝓴 ${i + 1}`;

        msg += `${rankBadge}\n`;
        msg += `┏━━━━━━━ ● ● ━━━━━━━┓\n`;
        msg += `┃ 👤 ${user.name}💐\n`;
        msg += `┃ 💰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: $${formattedBalance}\n`;
        msg += `┗━━━━━━━ ● ● ━━━━━━━┛\n\n`;
      }

      // --- Stylish Footer ---
      msg += `🌀 𝐊𝐞𝐞𝐩 𝐆𝐫𝐢𝐧𝐝𝐢𝐧𝐠 𝐌𝐫.𝐊𝐈𝐍𝐆'𝐬 𝐁𝐚𝐛𝐢𝐞𝐬 🌪️\n`;
      msg += `🐲 ━━━━━━━━━━━━━━━ 🐉`;

      return message.reply(msg);

    } catch (err) {
      console.error(err);
      return message.reply("❌ | 𝐁𝐚𝐛𝐲, 𝐈 𝐜𝐨𝐮𝐥𝐝𝐧'𝐭 𝐨𝐩𝐞𝐧 𝐭𝐡𝐞 𝐭𝐫𝐞𝐚𝐬𝐮𝐫𝐲!");
    }
  },
};

/**
 * Endless Economy Formatter
 */
function formatEndlessEconomy(number) {
  if (number < 1000) return number.toLocaleString();

  const suffixes = [
    "", "𝙺", "𝙼", "𝙱", "𝚃", 
    "𝚀𝚊", "𝚀𝚒", "𝚂𝚡", "𝚂𝚙", 
    "𝙾𝚌", "𝙽𝚘", "𝙳𝚌"
  ];

  const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
  const scaled = number / Math.pow(10, suffixIndex * 3);

  // Formatting short units like 1.50 M instead of Million for style
  return scaled.toFixed(2) + " " + (suffixes[suffixIndex] || "♾️");
}