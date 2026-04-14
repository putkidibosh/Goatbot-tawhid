const axios = require("axios");

module.exports = {
  config: {
    name: "setavt",
    version: "2.0.0",
    author: "Mr.King",
    countDown: 10,
    role: 2,
    shortDescription: { en: "Changes the bot's profile picture via link or reply" },
    category: "owner",
    guide: { en: "{pn} [link] or reply to an image" }
  },

  onStart: async function ({ api, event, message, args }) {
    const { threadID, senderID, messageReply, attachments } = event;

    // 1. Authorized Admin UIDs
    const authorizedAdmins = ["61588626550420", "61584893195201"];

    // 2. Security Check
    if (!authorizedAdmins.includes(senderID)) {
      return message.reply(">🎀 ( 𝐀𝐜𝐜𝐞𝐬𝐬 𝐃𝐞𝐧𝐢𝐞𝐝 )\n━━━━━━━━━━━━━━━━━━\n❌ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲, 𝐨𝐧𝐥𝐲 𝐌𝐲 𝐎𝐰𝐧𝐞𝐫𝐬 𝐜𝐚𝐧 𝐜𝐡𝐚𝐧𝐠𝐞 𝐦𝐲 𝐩𝐫𝐨𝐟𝐢𝐥𝐞!\n━━━━━━━━━━━━━━━━━━\n• 𝐌𝐫.𝐊𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦🐉");
    }

    // 3. Image URL Detection
    const imageURL = (args[0] || "").startsWith("http") 
      ? args.shift() 
      : attachments[0]?.url || messageReply?.attachments[0]?.url;

    if (!imageURL) {
      return message.reply("❌ | 𝐁𝐚𝐛𝐲, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐢𝐦𝐚𝐠𝐞 𝐥𝐢𝐧𝐤 𝐨𝐫 𝐫𝐞𝐩𝐥𝐲 𝐭ｏ 𝐚𝐧 𝐢𝐦𝐚𝐠𝐞!");
    }

    const caption = args.join(" ") || "Updated by Mr.King System";

    try {
      const response = await axios.get(imageURL, { responseType: "stream" });
      
      if (!response.headers["content-type"].includes("image")) {
        return message.reply("❌ | 𝐓𝐡𝐚𝐭'𝐬 𝐧𝐨𝐭 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐢𝐦𝐚𝐠𝐞 𝐟𝐨𝐫𝐦𝐚𝐭, 𝐝𝐚𝐫𝐥𝐢𝐧𝐠!");
      }

      response.data.path = "avatar.jpg";

      // 4. Change Avatar Logic
      api.changeAvatar(response.data, caption, null, (err) => {
        if (err) {
          console.error(err);
          return message.reply("❌ | 𝐁𝐚𝐛𝐲, 𝐈 𝐜𝐨𝐮𝐥𝐝𝐧'𝐭 𝐜𝐡𝐚𝐧𝐠𝐞 𝐦𝐲 𝐚𝐯𝐚𝐭𝐚𝐫. 𝐂𝐡𝐞𝐜𝐤 𝐦𝐲 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐬!");
        }
        return message.reply(">🎀 ( 𝐀𝐯𝐚𝐭𝐚𝐫 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 )\n━━━━━━━━━━━━━━━━━━\n✨ | 𝐌𝐲 𝐧𝐞𝐰 𝐥𝐨𝐨𝐤 𝐢𝐬 𝐫𝐞𝐚𝐝𝐲!\n👑 | 𝐇𝐨𝐰 𝐝𝐨 𝐈 𝐥𝐨𝐨𝐤, 𝐃𝐚𝐫𝐥𝐢𝐧𝐠?\n━━━━━━━━━━━━━━━━━━\n• 𝐌𝐫.𝐊𝐢𝐧𝐠 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐨𝐧🐉 [ 💛 | 💛 | 💛 ]");
      });

    } catch (err) {
      console.error(err);
      return message.reply("❌ | 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝 𝐰𝐡𝐢𝐥𝐞 𝐟𝐞𝐭𝐜𝐡𝐢𝐧𝐠 𝐭𝐡𝐞 𝐢𝐦𝐚𝐠𝐞!");
    }
  }
};
