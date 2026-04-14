module.exports = {
  config: {
    name: "duck",
    version: "2.0.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Hunt the golden duck and win 2B money!" },
    category: "Game",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ api, event, usersData, message }) {
    const { senderID } = event;
    const name = await usersData.getName(senderID);

    // ১. গেম মেকানিজম (৮টি পজিশন)
    const duckPositions = ["🦆", "🦆", "🦆", "🦆", "🦆", "✨🦆✨", "🦆", "🦆"];
    const shuffledDucks = [...duckPositions].sort(() => 0.5 - Math.random());
    const goldenIndex = shuffledDucks.indexOf("✨🦆✨") + 1;

    // ২. স্টাইলিশ ইন্টারফেস
    const header = `👑 🌕 ( 𝐇𝐈𝐆𝐇-𝐒𝐓𝐀𝐊𝐄 𝐃𝐔𝐂𝐊 𝐇𝐔𝐍𝐓 ) 🌪️🌀 🕺🏼💃🏼\n━━━━━━━━━━━━━━━━━━\n`;
    const body = `👤 | 𝐔𝐬𝐞𝐫: ${name}\n🎯 | 𝐇𝐮𝐧𝐭 𝐭𝐡𝐞 𝐆𝐨𝐥𝐝𝐞𝐧 𝐃𝐮𝐜𝐤: ✨🦆✨\n\n`;
    
    let options = "";
    shuffledDucks.forEach((_, index) => {
      options += `[ ${index + 1} ]  `;
    });

    const footer = `\n\n━━━━━━━━━━━━━━━━━━\n⏳ ১২০ সেকেন্ডের মধ্যে পজিশন নম্বর লিখো!\n💰 পুরস্কার: 𝟐,𝟎𝟎𝟎,𝟎𝟎𝟎,𝟎𝟎𝟎 (𝟐𝐁) 💰\n• 𝐄𝐧𝐣𝐨𝐲 𝐛𝐛𝐲🐉 [ 💛 | 💛 | 💛 ]`;

    return message.reply(header + body + options + footer, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        author: senderID,
        correct: goldenIndex,
        msgID: info.messageID
      });

      // ১২০ সেকেন্ড অটো টাইমআউট
      setTimeout(() => {
        if (global.GoatBot.onReply.has(info.messageID)) {
          global.GoatBot.onReply.delete(info.messageID);
          api.unsendMessage(info.messageID);
        }
      }, 120000);
    });
  },

  onReply: async function ({ api, event, Reply, usersData, message }) {
    const { senderID, body } = event;
    const { author, correct, msgID } = Reply;

    // ইউজার লক সিস্টেম
    if (senderID !== author) return message.reply("⚠️ | 𝐎𝐡 𝐛𝐛𝐲! এটা তোমার গেম না। নিজের গেম শুরু করতে /duck লিখো।");

    const shot = parseInt(body);
    if (isNaN(shot) || shot < 1 || shot > 8) {
      return message.reply("❌ | ১ থেকে ৮ এর মধ্যে সঠিক নম্বরটি দাও! 🦆");
    }

    api.unsendMessage(msgID);
    global.GoatBot.onReply.delete(msgID);

    // ৩. ইকোনমি আপডেট (২ বিলিয়ন রিওয়ার্ড)
    if (shot === correct) {
      const uData = await usersData.get(senderID);
      const currentMoney = uData.money || 0;
      const reward = 2000000000; // 2 Billion
      
      await usersData.set(senderID, { money: currentMoney + reward });

      return message.reply(`👑 𝐌𝐀𝐒𝐇𝐀𝐀𝐋𝐋𝐀𝐇 🕺🏼💃🏼\n━━━━━━━━━━━━━━━━━━\n🎯 চমৎকার শিকার! তুমি পেয়েছো ✨🦆✨\n💰 পুরস্কার: ২,০০০,০০০,০০০ (𝟐𝐁) টাকা আপনার অ্যাকাউন্টে যোগ করা হয়েছে!\n━━━━━━━━━━━━━━━━━━\n𝐊𝐞𝐞𝐩 𝐢𝐭 𝐮𝐩 𝐛𝐛𝐲 🐉 🥰🥰😍`);
    } else {
      return message.reply(`❌ মিস হয়েছে! 🌕\n🌪️🌀 হাঁসটি [ ${correct} ] নম্বর পজিশনে লুকিয়ে ছিল।\nআবার চেষ্টা করো bby! 🕺🏼💃🏼`);
    }
  }
};