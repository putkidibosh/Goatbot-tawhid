module.exports = {
  config: {
    name: "types",
    aliases: ["type", "typing"],
    version: "1.3",
    author: "Mr.King",
    countDown: 10,
    role: 0,
    shortDescription: { en: "Type text without emojis for 1B reward" },
    category: "Game",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ api, event, usersData, message }) {
    const { senderID } = event;
    const name = await usersData.getName(senderID);

    // ১. শব্দ এবং ইমোজি ব্যাংক
    const words = ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "success", "patience", "islamic", "history", "wisdom", "faith", "technology", "modern", "future", "world", "practice", "perfect", "believe", "yourself", "powerful", "system", "heart", "respect", "community", "unity", "support", "member", "direction", "ocean", "time", "resource", "mercy", "creator", "darkest", "purity", "noble", "character", "leader", "smile", "charity", "blessing", "mystery", "dream", "reality", "bridge", "innovation", "truth", "triumph", "soul", "strength", "wiser", "stronger", "peaceful", "wealth", "discipline", "humble", "highest", "peak", "journey", "attitude", "focus", "goal", "distract", "diamond", "stress", "lesson", "mirror", "energy", "listen"];
    const emojis = ["😎", "😴", "🐸", "😺", "🍎", "🔥", "💎", "✨", "🌈", "⚡", "🍀", "👻", "🦄", "🍕", "🎸", "🚀", "🛸", "👾","🚬","⛓️"];

    // ২. ৮০টি র্যান্ডম শব্দ এবং ইমোজি মিক্স করা
    let targetCleanText = "";
    let displayEmojiText = "";

    for (let i = 0; i < 80; i++) {
      let randomWord = words[Math.floor(Math.random() * words.length)];
      let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      targetCleanText += randomWord + (i === 79 ? "" : " ");
      displayEmojiText += randomWord + randomEmoji + (i === 79 ? "" : " ");
    }

    // ৩. স্টাইলিশ ইন্টারফেস এবং ওয়ার্নিং নোট
    const header = `👑 🌕 ( 𝐄𝐌𝐎𝐉𝐈-𝐓𝐄𝐗𝐓 𝐂𝐇𝐀𝐋𝐋𝐄𝐍𝐆𝐄 ) 🪶🪶\n━━━━━━━━━━━━━━━━━━\n`;
    const body = `👤 | 𝐔𝐬𝐞𝐫: ${name}\n📝 | 𝐂𝐨𝐩𝐲 & 𝐅𝐢𝐥𝐭𝐞𝐫 𝐭𝐡𝐢𝐬 𝐭𝐞𝐱𝐭:\n\n${displayEmojiText}\n\n`;
    const instruction = `⚠️ 𝐆𝐈𝐕𝐄 𝐌𝐄 𝐓𝐇𝐈𝐒 𝐓𝐄𝐗𝐓 𝐖𝐈𝐓𝐇𝐎𝐔𝐓 𝐀𝐍𝐘 𝐄𝐌𝐎𝐉𝐈𝐄𝐒\n\n`;
    const warningNote = `🛑 𝐈𝐅 𝐘𝐎𝐔 𝐖𝐀𝐍𝐓 𝐓𝐎 𝐂𝐎𝐏𝐘 𝐏𝐀𝐒𝐓𝐄 𝐈𝐓, 𝐓𝐇𝐄𝐍 𝐌𝐘 𝐅𝐑𝐈𝐄𝐍𝐃 𝐘𝐎𝐔 𝐀𝐑𝐄 𝐆𝐀𝐘.(others app or web not allowed)\n`;
    const footer = `━━━━━━━━━━━━━━━━━━\n⏳ ১৮০ সেকেন্ড সময় আছে!\n💰 পুরস্কার: 𝟏,𝟎𝟎𝟎,𝟎𝟎𝟎,𝟎𝟎𝟎 (𝟏𝐁) 💰\n• 𝐌𝐚𝐝𝐞 𝐛𝐲 𝐌𝐫.𝐊𝐢𝐧𝐠 𝐰𝐢𝐭𝐡 𝐋𝐨𝐯𝐞 💕`;

    return message.reply(header + body + instruction + warningNote + footer, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        author: senderID,
        target: targetCleanText,
        msgID: info.messageID
      });

      // ১৮০ সেকেন্ড অটো টাইমআউট
      setTimeout(async () => {
        if (global.GoatBot.onReply.has(info.messageID)) {
          global.GoatBot.onReply.delete(info.messageID);
          api.unsendMessage(info.messageID);
          message.send(` 🪄| ${name}, সময় শেষ! ১ বিলিয়ন জেতার সুযোগ হারালেন। ✨`);
        }
      }, 180000);
    });
  },

  onReply: async function ({ api, event, Reply, usersData, message }) {
    const { senderID, body } = event;
    const { author, target, msgID } = Reply;

    if (senderID !== author) return message.reply("⚠️ | 𝐎𝐡 𝐛𝐛𝐲! এটা আপনার চ্যালেঞ্জ না।");

    // ৪. ইমোজিহীন টেক্সট ম্যাচিং এবং ১বি পুরস্কার প্রদান
    if (body.trim() === target) {
      api.unsendMessage(msgID);
      global.GoatBot.onReply.delete(msgID);

      const uData = await usersData.get(senderID);
      const reward = 1000000000; // 1 Billion

      await usersData.set(senderID, { money: (uData.money || 0) + reward });

      return message.reply(`🪄 𝐌𝐀𝐒𝐇𝐀𝐀𝐋𝐋𝐀𝐇 ✨\n━━━━━━━━━━━━━━━━━━\n🎯 একদম নিখুঁত টাইপিং! আপনি জিতেছেন।\n💰 পুরস্কার: ১,০০০,০০০,০০০ (𝟏𝐁) টাকা যোগ হয়েছে!\n━━━━━━━━━━━━━━━━━━\n𝐊𝐞𝐞𝐩 𝐢𝐭 𝐮𝐩 𝐛𝐛𝐲 🐉 🥰🥰😍`);
    } else {
      return message.reply("❌ | ভুল হয়েছে bby! কোনো ইমোজি রাখা যাবে না এবং স্পেলিং ঠিক থাকতে হবে। ✨");
    }
  }
};