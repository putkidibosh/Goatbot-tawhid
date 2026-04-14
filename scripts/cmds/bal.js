module.exports = {
  config: {
    name: "bal",
    aliases: ["money", "balance", "cash", "balshow"],
    version: "2.5.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Check own or tagged user balance" },
    category: "economy",
    guide: { en: "{pn} or {pn} @tag" }
  },

  onStart: async function ({ api, event, usersData, args, message }) {
    const { senderID, mentions, messageReply } = event;

    // ১. টার্গেট ইউজার নির্ধারণ (Tag, Reply অথবা নিজে)
    let targetID;
    if (Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
    } else if (messageReply) {
      targetID = messageReply.senderID;
    } else {
      targetID = senderID;
    }

    try {
      const userData = await usersData.get(targetID);
      const money = userData.money || 0;
      const name = await usersData.getName(targetID);

      // ২. ফরম্যাট করা ব্যালেন্স
      const formattedMoney = formatWorldEconomy(money);

      // ৩. আউটপুট মেসেজ
      return message.reply(
        `>🎀 ( ${name} )\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `• 𝐁𝐚𝐛𝐲, ${targetID === senderID ? "𝐘𝐨𝐮" : name} 𝐇𝐚𝐯𝐞\n` +
        `• 💸 $${formattedMoney}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `• 𝐊𝐞𝐞𝐩 𝐢𝐭 𝐮𝐩 𝐛𝐛𝐲🐉 [ 💛 | 💛 | 💛 ]`
      );
    } catch (err) {
      return message.reply("❌ | 𝐁𝐚𝐛𝐲, 𝐈 𝐜𝐨𝐮𝐥𝐝𝐧'𝐭 𝐟𝐞𝐭𝐜𝐡 𝐭𝐡𝐞 𝐛𝐚𝐥𝐚𝐧𝐜𝐞!");
    }
  }
};

// World Economy ফরম্যাট ফাংশন
function formatWorldEconomy(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toLocaleString();
}