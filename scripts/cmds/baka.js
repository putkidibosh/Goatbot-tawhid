const fs = require("fs-extra");

module.exports = {
  config: {
    name: "baka",
    version: "1.0.0",
    author: "R O NI",
    countDown: 5,
    role: 0,
    category: "Fun",
    guide: { en: "Reply to someone with {pn}" }
  },

  onStart: async function ({ api, event, message }) {
    const { type, messageReply, senderID, threadID, messageID } = event;

    
    const insults = [
      "বলদ 🐸", "গাধা 💩", "আবাল 🐸", "ছাগল 💩", "বেয়াদব 🐸", "অসভ্য 💩", "মূর্খ 🐸", 
      "কুত্তার বাচ্চা 🐸", "নির্লজ্জ 💩", "বেহায়া 🐸", "পাগল 💩", "লুইচ্চা 🐸", "ভন্ড 💩", "হারামি 🐸", "চোদানির পোলা 💩", "বাল পাকনা 🐸", "টোকাই 💩", 
      "বস্তির ছেলে 🐸", "বুদ্ধিপ্রতিবন্ধী 💩", "গাধার বাচ্চা 🐸", "পাথর মগজ 💩", "বিলাইর গু 🐸", "গুই সাপের বাচ্চা 💩", "ফেসবুক সেলিব্রেটি 🐸", "ফকিন্নি 💩", "চেঁচড়া 🐸", "ল্যাদখোর 💩", 
      "আবাল 🐸", "চুতিয়া 💩", "পাগলু 🐸", "নর্দমার কিট 💩", "পাপীষ্ঠ 🐸", "কুলাঙ্গার 💩", "অকাল কুষ্মাণ্ড 🐸", "গোবর গণেশ 💩", "চালু মাল 🐸", "ফাউল লোক 💩", 
      "বাটপার 🐸", "চিটার 💩", "শয়তানের হাড্ডি 🐸", "নষ্টা 💩", "মাল 🐸", "হাইব্রিড আবাল 💩", "পান্তা ভাতের মাড় 🐸", "লুলা 💩", "কানা 🐸", "বোবা 💩", 
      "বদের হাড্ডি 🐸", "তেলাপোকা 💩", "ইঁদুরের বাচ্চা 🐸", "চামচিকা 💩", "ডাইনি 🐸", "পেত্নী 💩", "হিজড়া 🐸", "বেজন্ম 💩", "কালপ্রিট 🐸", "বজ্জাত 💩"
    ];

    
    const protectedUID = "61588626550420";
    
    
    let targetID, targetName;

    if (type === "message_reply") {
      targetID = messageReply.senderID;
    } else {
      return message.reply("🐸 কাউরে রিপ্লাই দিয়ে কমান্ডটা দে 💩");
    }

   
    const userInfo = await api.getUserInfo(targetID);
    targetName = userInfo[targetID].name;

    
    if (targetID === protectedUID) {
      return message.reply(`এ তো ভালো মানুষ, তোর মতো কি অশ্লীল পাইছস? বেয়াদব! 😒💩`);
    }

    
    const randomInsult = insults[Math.floor(Math.random() * insults.length)];
    const finalMessage = `${targetName}, তুই একটা ${randomInsult}`;

    return message.reply(finalMessage);
  }
};