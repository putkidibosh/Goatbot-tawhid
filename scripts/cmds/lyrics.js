const axios = require("axios");
const { getStreamFromURL, shortenURL } = global.utils;

async function fetchTikTokVideos(query) {
  try {
    const response = await axios.get(`https://lyric-search-neon.vercel.app/kshitiz?keyword=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  config: {
    name: "lyrics",
    aliases: ["lyricvideo", "video", "status", "lv", "🕊️", "🦟"],
    author: "Mr.King",
    version: "2.8",
    countDown: 10,
    shortDescription: { en: "Play Stylish Lyric Video" },
    category: "fun",
    guide: { en: "{pn} [song name] or reply to audio/video" }
  },

  handleEvent: async function ({ api, event }) {
    const { body, threadID, messageID } = event;
    const aliases = ["lyrics", "lyricvideo", "video", "status", "lv", "🕊️", "🦟"];
    
    if (body) {
      const input = body.toLowerCase().trim();
      const isAlias = aliases.some(alias => input.startsWith(alias));
      
      if (isAlias) {
        const args = body.split(/\s+/);
        const command = args.shift().toLowerCase();
        // এটি চেক করবে যদি এটা কমান্ড হিসেবে কাজ করে (prefix ছাড়া)
        return this.onStart({ api, event, args });
      }
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, messageReply } = event;
    
    const mrKingEmojis = ["🦥", "🕊️", "🥷🏼", "🦟", "💀", "🔥", "🎧", "👑"];
    api.setMessageReaction(
      mrKingEmojis[Math.floor(Math.random() * mrKingEmojis.length)],
      messageID,
      () => {},
      true
    );

    try {
      let query = "";

      // ১. যদি শুধু কমান্ড লিখে সার্চ না করে, তবে র‍্যান্ডম লিস্ট থেকে নিবে
      if (args.length === 0 && !messageReply) {
        const randomSongs = [
          "Bangla lofi song", 
          "Hindi lofi status", 
          "Viral lofi song", 
          "Best lofi remix", 
          "Sleep losing lofi", 
          "Sad lofie status", 
          "New song lofi 4k", 
          "Besi song lofi", 
          "Bhojpuri song lofi status"
        ];
        query = randomSongs[Math.floor(Math.random() * randomSongs.length)];
      } 
      // ২. যদি অডিও/ভিডিওতে রিপ্লাই দেয়
      else if (messageReply && messageReply.attachments.length > 0) {
        const attachment = messageReply.attachments[0];
        if (attachment.type === "video" || attachment.type === "audio") {
          const shortUrl = await shortenURL(attachment.url);
          const musicRecognition = await axios.get(
            `https://audio-reco.onrender.com/kshitiz?url=${encodeURIComponent(shortUrl)}`
          );
          query = musicRecognition.data.title;
        } else {
          return api.sendMessage("❌ | 𝐁𝐛𝐲, 𝐫𝐞𝐩𝐥𝐲 𝐨𝐧𝐥𝐲 𝐭𝐨 𝐚𝐮𝐝𝐢𝐨 𝐨𝐫 𝐯𝐢𝐝𝐞𝐨!", threadID, messageID);
        }
      } 
      // ৩. যদি গানের নাম লিখে সার্চ করে
      else if (args.length > 0) {
        query = args.join(" ");
      }

      const finalQuery = `${query} lyrics status video 4k`;
      const videos = await fetchTikTokVideos(finalQuery);

      if (!videos || videos.length === 0) {
        return api.sendMessage(`❌ | 𝐍𝐨 𝐯𝐢𝐝𝐞𝐨 𝐟𝐨𝐮𝐧𝐝 𝐟𝐨𝐫: ${query}`, threadID, messageID);
      }

      const selectedVideo = videos[Math.floor(Math.random() * videos.length)];
      const videoUrl = selectedVideo.videoUrl;

      if (!videoUrl) {
        return api.sendMessage("❌ | 𝐕𝐢𝐝𝐞𝐨 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝!", threadID, messageID);
      }

      const videoStream = await getStreamFromURL(videoUrl);

      return api.sendMessage({
        body: "", 
        attachment: videoStream
      }, threadID, messageID);

    } catch (e) {
      console.log(e);
      return api.sendMessage("❌ | 𝐄𝐫𝐫𝐨𝐫 𝐰𝐡𝐢𝐥𝐞 𝐟𝐞𝐭𝐜𝐡𝐢𝐧𝐠 𝐯𝐢𝐝𝐞𝐨!", threadID, messageID);
    }
  }
};