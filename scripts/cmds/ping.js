const os = require("os");
const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
    config: {
        name: "ping",
        version: "3.0",
        author: "Mr.King",
        countDown: 5,
        role: 0,
        category: "system"
    },

    onStart: async function ({ api, event }) {
        const { threadID, messageID } = event;
        const startPing = Date.now();

        // --- Loading Bar Effect ---
        const loadingFrames = [
            "🌪️ [▯▯▯▯▯▯▯▯▯▯] 𝟎%",
            "🌪️ [▬▬▬▯▯▯▯▯▯▯] 𝟑𝟓%",
            "🌪️ [▬▬▬▬▬▬▯▯▯] 𝟕𝟎%",
            "🌪️ [▬▬▬▬▬▬▬▬▬▬] 𝟏𝟎𝟎%",
            "🚀 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦 𝐑𝐞𝐩𝐨𝐫𝐭..."
        ];

        const processingMsg = await api.sendMessage(loadingFrames[0], threadID);
        
        for (let i = 1; i < loadingFrames.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 450));
            await api.editMessage(loadingFrames[i], processingMsg.messageID);
        }

        try {
            const endPing = Date.now() - startPing;

            // --- Uptime Calculation ---
            const uptimeInSeconds = process.uptime();
            const days = Math.floor(uptimeInSeconds / (3600 * 24));
            const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
            const seconds = Math.floor(uptimeInSeconds % 60);
            const uptimeStr = `${days}𝐃 ${hours}𝐇 ${minutes}𝐌 ${seconds}𝐒`;
            
            // --- Canvas Generation ---
            const width = 1280;
            const height = 720;
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext("2d");

            const bgUrl = "https://i.ibb.co/Lh838qHS/image.jpg";
            const background = await loadImage(bgUrl);
            ctx.drawImage(background, 0, 0, width, height);

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
            ctx.shadowBlur = 20;
            
            const centerX = width / 2;
            const centerY = height - 130;

            // 1. Title: SYSTEM STATUS
            ctx.font = "bold 55px sans-serif";
            ctx.fillStyle = "#ffffff";
            ctx.fillText("SYSTEM STATUS", centerX, centerY - 80);

            
            ctx.beginPath();
            ctx.moveTo(centerX - 350, centerY - 30);
            ctx.lineTo(centerX + 350, centerY - 30);
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();

            // 2. Info: Uptime & Ping
            ctx.font = "bold 45px sans-serif";
            ctx.fillText(`UPTIME: ${days}D ${hours}H ${minutes}M ${seconds}S`, centerX, centerY + 30);
            ctx.font = "bold 40px sans-serif";
            ctx.fillText(`𝐏𝐈𝐍𝐆: ${endPing} MS`, centerX, centerY + 90);

            const cacheDir = path.join(__dirname, "cache");
            if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
            const filePath = path.join(cacheDir, `ping_${Date.now()}.jpg`);
            const buffer = canvas.toBuffer("image/jpeg");
            fs.writeFileSync(filePath, buffer);

            // --- Final Text Message ---
            let status = endPing < 150 ? "🚀 𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭" : endPing < 350 ? "⚖️ 𝐆𝐨𝐨𝐝" : "🐢 𝐋𝐚𝐠𝐠𝐲";

            const infoText = `
🪶𝐒𝐘𝐒𝐓𝐄𝐌 𝐑𝐄𝐏𝐎𝐑𝐓 🕊️
━━━━━━━━━━━━━━━
 🪶𝐔𝐩𝐭𝐢𝐦𝐞: ${uptimeStr}
 🪶𝐏𝐈𝐍𝐆: ${endPing}𝐦𝐬
🪶𝐒𝐭𝐚𝐭𝐮𝐬: ${status}
 🪶𝐒𝐲𝐬𝐭𝐞𝐦: 𝐎𝐧𝐥𝐢𝐧𝐞
━━━━━━━━━━━━━━━`;

            api.unsendMessage(processingMsg.messageID);
            return api.sendMessage({
                body: infoText.trim(),
                attachment: fs.createReadStream(filePath)
            }, threadID, () => {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }, messageID);

        } catch (err) {
            console.error(err);
            api.unsendMessage(processingMsg.messageID);
            return api.sendMessage("💀 𝐄𝐫𝐫𝐨𝐫 𝐝𝐞𝐭𝐞𝐜𝐭𝐞𝐝 𝐢𝐧 𝐬𝐲𝐬𝐭𝐞𝐦 𝐜𝐡𝐞𝐜𝐤", threadID, messageID);
        }
    }
};