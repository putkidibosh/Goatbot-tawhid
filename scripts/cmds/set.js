module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "2.0.0",
    author: "Mr.King",
    role: 2,
    shortDescription: {
      en: "Set coins and experience points with smart units"
    },
    category: "economy",
    guide: {
      en: "{pn} set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["61588626550420", "61584893195201"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("⚠️ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐛𝐲, 𝐭𝐡𝐢𝐬 𝐢𝐬 𝐨𝐧𝐥𝐲 𝐟𝐨𝐫 𝐦𝐲 𝐛𝐨𝐬𝐬𝐞𝐬! 🌀", event.threadID, event.messageID);
    }

    const query = args[0]?.toLowerCase();
    const rawAmount = args[1];

    if (!query || !rawAmount) {
      return api.sendMessage("⚔️ | 𝐁𝐨𝐬𝐬, 𝐮𝐬𝐞: /𝐬𝐞𝐭 [𝐦𝐨𝐧𝐞𝐲|𝐞𝐱𝐩] [𝐚𝐦𝐨𝐮𝐧𝐭]", event.threadID);
    }

    // ১. স্মার্ট অ্যামাউন্ট পার্সার (k, m, b, t সাপোর্ট করে)
    const amount = parseSmartAmount(rawAmount);
    if (isNaN(amount)) {
      return api.sendMessage("⚔️ | 𝐁𝐨𝐬𝐬, 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 𝐝𝐚𝐰! (𝐞𝐠: 𝟏𝟎𝟎𝐭, 𝟓𝟎𝐛)", event.threadID);
    }

    const { threadID, messageReply, mentions } = event;
    let targetUser = Object.keys(mentions)[0] || (messageReply ? messageReply.senderID : event.senderID);

    const userData = await usersData.get(targetUser);
    if (!userData) return api.sendMessage("❌ | 𝐔𝐬𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝.", threadID);

    const name = await usersData.getName(targetUser);

    if (query === 'exp') {
      await usersData.set(targetUser, { money: userData.money, exp: amount, data: userData.data });
      return api.sendMessage(`✅ | 𝐒𝐞𝐭 𝐞𝐱𝐩𝐞𝐫𝐢𝐞𝐧𝐜𝐞 𝐭𝐨 ${amount} 𝐟𝐨𝐫 ${name}. 🐲`, threadID);
    } else if (query === 'money') {
      await usersData.set(targetUser, { money: amount, exp: userData.exp, data: userData.data });
      return api.sendMessage(`✅ | 𝐒𝐞𝐭 𝐦𝐨𝐧𝐞𝐲 𝐭𝐨 $${rawAmount.toUpperCase()} 𝐟𝐨𝐫 ${name}. 💰`, threadID);
    } else {
      return api.sendMessage("⚔️ | 𝐔𝐬𝐞 '𝐞𝐱𝐩' 𝐨𝐫 '𝐦𝐨𝐧𝐞𝐲'.", threadID);
    }
  }
};

// স্মার্ট অ্যামাউন্ট ফরম্যাটিং ফাংশন
function parseSmartAmount(str) {
  const units = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 };
  const match = str.toString().toLowerCase().match(/^(\d+(?:\.\d+)?)([kmbt]?)$/);
  if (!match) return NaN;
  const value = parseFloat(match[1]);
  const unit = match[2];
  return unit ? value * units[unit] : value;
}