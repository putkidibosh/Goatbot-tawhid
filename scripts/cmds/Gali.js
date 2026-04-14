const fs = require("fs-extra");
const statusPath = __dirname + "/data/gali_status.json";
const protectedPath = __dirname + "/data/protected_list.json";

if (!fs.existsSync(__dirname + "/data")) fs.mkdirSync(__dirname + "/data");
if (!fs.existsSync(statusPath)) fs.writeFileSync(statusPath, JSON.stringify({ active: true }));
if (!fs.existsSync(protectedPath)) fs.writeFileSync(protectedPath, JSON.stringify(["61588626550420"]));

module.exports = {
  config: {
    name: "gali",
    version: "2.0",
    author: "MR.KING 👑🕊️",
    role: 0,
    category: "Fun",
    guide: { en: "Commands: /hop, /fawl, /dhn, /tawa, /kutta, /BTS, /jawra, /soytan, /Gali\nAdmin: /gali on/off\nProtected: /gali + UID / - UID" }
  },

  onStart: async function ({ api, event, message, args }) {
    const { senderID, body, messageReply, threadID } = event;
    const adminIDs = ["61588626550420", "61587982664508"]; 
    
    let data = JSON.parse(fs.readFileSync(statusPath));
    let protectedList = JSON.parse(fs.readFileSync(protectedPath));

    if (args[0] === "on" || args[0] === "off") {
      if (!adminIDs.includes(senderID)) return message.reply("❌ Eta shudhu admin-ra korte parbe.");
      data.active = (args[0] === "on");
      fs.writeFileSync(statusPath, JSON.stringify(data));
      return message.reply(`✅ Gali system ekhon ${args[0].toUpperCase()} kora hoyeche.`);
    }

    if (args[0] === "+" || args[0] === "-") {
      if (!adminIDs.includes(senderID)) return message.reply("❌ Shudhu admin-ra korte parbe.");
      if (args[0] === "+") {
        if (!protectedList.includes(args[1])) protectedList.push(args[1]);
        message.reply(`✅ ID ${args[1]} k protected list-e add kora hoyeche.`);
      } else {
        protectedList = protectedList.filter(id => id !== args[1]);
        message.reply(`✅ ID ${args[1]} k protected list theke remove kora hoyeche.`);
      }
      fs.writeFileSync(protectedPath, JSON.stringify(protectedList));
      return;
    }

    if (!data.active) return;
    if (!messageReply) return message.reply("Please reply to someone to roast!");
    
    const targetID = messageReply.senderID;
    if (protectedList.includes(targetID)) {
      return message.reply("🙄 Tor moto abal na, know your place 🙄");
    }

    const insults = {
      "/hop": { em: "😒", list: ["Tor moto bolod ke ke jonmo dise re?", "Tor mathay ki gobor bhora?", "Bolod-er bashay thakish naki?", "Tor buddhi ar gorur gobor duitai ek.", "Toke dekhle mone hoy tui ki-stite jonmais.", "Tor chehara dekhe mone hoy tui nosto mal.", "Tor moto abal ami age kokhono dekhini.", "Tui to dekhi shorbokaler sherha bolod.", "Tor bashay ki shudhu bolod-i thake?", "Tor matha ta to ashole ekta storej jekhane shudhu moyla thake.", "Tore dekhe mone hoy tui bhul kore prithibite ashli.", "Tor logic shune Newton kobore shuye kanna kortese.", "Tui jodio kotha bolish, mone hoy noise pollution.", "Tor shonkha-o kom na, abal-er sreshtho tui.", "Tor brain-ta mone hoy second-hand kinsish.", "Tor moto kauke dekhle amar shudhu koruna hoy.", "Tor hashle to char-pash ondhokar hoye jay.", "Tor jibon-er kono value nai, faltu.", "Tor charitrer kono thikana nai.", "Tui ekta cholonto obishap.", "Tore jail-e deya uchit kotha bolar jonne.", "Tor kothay kono logic nai, shudhu boka.", "Tui thakle poribesh-er o shantir obhab hoy.", "Tor jibon-er goal to golay gese.", "Tor moto manush-er jonne thanda pani-o gorom hoye jay.", "Tore kukur-e o bhoy pay.", "Tor shob kotha bhat-er fena.", "Tor profile dekhei bujha jay tui koto boro bal.", "Tore gali dile amar mukher ruchi nosto hobe.", "Tui keno je porda te ashli ke jane!"] },
      "/fawl": { em: "🙄", list: ["Faltu bokas na to, chup thak.", "Tor faltu kotha shonar somoy amar nai.", "Faltu kotha bole matha khabina.", "Tor jibon-er shob kotha faltu.", "Faltu manusher sathe kotha bola mane somoy nosto.", "Tor kotha shune mone hoy matha ebar fete jabe.", "Eto faltu logic tui kothay pash?", "Tor kotha-y kono shikkhonio kichu nai.", "Tui ekta cholonto faltu manush.", "Tor faltu style dekhe amar hashi pay.", "Tor faltu life-e shudhu faltu manush.", "Faltu kotha bole time waste korish na.", "Tor moto faltu insan ami dekhi nai.", "Tor faltu chinta-bhabna eke-bare low grade.", "Faltu gyan na diye ekhon chup kor.", "Tor sob kichui faltu, charitra theke shuru kore dressup.", "Faltu kotha bole ar koto manushke opoman korbi?", "Tor faltu attitude ebar thama.", "Eto faltu hole ki hoy?", "Tor faltu kotha-y amar kono interest nai.", "Faltu manush-er shonge kotha bola-i bhul.", "Tor jibon-er mission holo faltu kotha bola.", "Faltu-r hat-e paw-e pori, chup kor.", "Tor faltu buddhi-r karonei aj desh e obostha.", "Faltu kotha bole koto-jonke irritate korbi?", "Tor faltu shob planning.", "Eto faltu kotha shune amar kan betha korse.", "Tor faltu kotha-y kauke convince kora jabe na.", "Faltu bhab neya bondho kor.", "Tor moto faltu manusher jonno faltu jayga-i thik ase."] },
      "/dhn": { em: "🤢", list: ["Tor chehara dekhlei bomi ase.", "Tor mukhta nordomar moto.", "Dhon-er moto dekhte lagtese tui.", "Tore dekhle amar khida-o more jay.", "Tor chehara-r ki obostha!", "Eto dhon-er moto chehara ki kore hoy?", "Tor chehara dekhle mone hoy vul kore prithibite ashli.", "Tore mirror-e dekhle mirror-o fete jay.", "Tor chehara-y ki acid mara dorkar?", "Tor chehara dekhle ghrinna hoy.", "Dhon-er moto dekhte tui, ektu porishkar ho.", "Tor chehara-r sathe mil ache dhon-er.", "Tor chehara dekhle mone hoy kichu ekta baje hoyeche.", "Eto dhon-er moto chehara-r manush kothay pay?", "Tore dekhe mone hoy kothao dustbin-e chila tui.", "Tor chehara-y shob ghrinna lukiye ache.", "Dhon-er moto dekhte tui, ektu lajja bodh kor.", "Tor chehara-r upor kache-r mask pora dorkar.", "Tore dekhle amar chokhe pani chole ase.", "Tor chehara-r jonno amar mon kharap hoye jay.", "Tor chehara dekhle mone hoy kothao kosto pash.", "Dhon-er moto chehara, ektu soap use kor.", "Tor chehara dekhle mone hoy keu baje kichu koreche.", "Tore dekhe ghrinna hoy.", "Eto dhon-er moto chehara kothay pash?", "Tor chehara dekhle mone hoy kichu ekta baje.", "Dhon-er moto chehara-r manush tui.", "Tore dekhe amar bhoy lage.", "Tor chehara dekhle ghrinna hoy.", "Dhon-er moto chehara-r jonno shudhu ghrinna."] },
      "/tawa": { em: "🤮", list: ["Tor matha ki tawar moto gorom hoye gese?", "Shanto ho, naile tawa diye bari debo.", "Tawa-r moto chhepta chehara tor.", "Tor mathay ki tawa diya bari mara dorkar?", "Tawa-r moto gorom tui.", "Tor chehara tawa-r moto dekhatecho keno?", "Tawa-r moto chhepta tui.", "Tor matha thanda kor tawa diye.", "Tawa-r moto chhepta chehara tor, ektu plastic surgery kor.", "Tawa-r moto gorom na hoye shanto ho.", "Tawa-r moto chhepta tui, ektu smile de.", "Tor chehara tawa-r moto dekhatecho keno?", "Tawa-r moto chhepta chehara, kothay gelo sundorjo?", "Tawa-r moto gorom hoye ki labh?", "Tawa-r moto chhepta tui, ektu exercise kor.", "Tawa-r moto gorom na hoye pani kha.", "Tawa-r moto chhepta chehara, kothay gelo tui?", "Tawa-r moto gorom tui, ektu shanto ho.", "Tawa-r moto chhepta chehara tor.", "Tawa-r moto gorom hoye ki labh?", "Tawa-r moto chhepta tui, ektu makeup kor.", "Tawa-r moto gorom tui, ektu ice cream kha.", "Tawa-r moto chhepta chehara tor.", "Tawa-r moto gorom na hoye thanda ho.", "Tawa-r moto chhepta tui, ektu smile de.", "Tawa-r moto gorom tui.", "Tawa-r moto chhepta chehara tor.", "Tawa-r moto gorom na hoye shanto ho.", "Tawa-r moto chhepta tui.", "Tawa-r moto gorom tui."] },
      "/kutta": { em: "🙀", list: ["Kukur-er moto gheu gheu korish na to.", "Kukur-o tor cheye beshi bhodro.", "Kutta-r baccha!", "Kukur-er moto keno kotha bolish?", "Tor kotha kukur-er gheu gheu-r moto.", "Kukur-o tor cheye shanto.", "Kutta-r moto keno dekhaitecho?", "Kukur-er moto keno kotha bolish?", "Tor kotha kukur-er gheu gheu-r moto.", "Kukur-o tor cheye bhodro.", "Kutta-r baccha, chup kor.", "Kukur-er moto gheu gheu keno?", "Tor kotha kukur-er gheu gheu-r moto.", "Kukur-o tor cheye shanto.", "Kutta-r moto keno dekhaitecho?", "Kukur-er moto gheu gheu keno?", "Tor kotha kukur-er gheu gheu-r moto.", "Kukur-o tor cheye bhodro.", "Kutta-r baccha, chup kor.", "Kukur-er moto gheu gheu keno?", "Tor kotha kukur-er gheu gheu-r moto.", "Kukur-o tor cheye shanto.", "Kutta-r moto keno dekhaitecho?", "Kukur-er moto gheu gheu keno?", "Tor kotha kukur-er gheu gheu-r moto.", "Kukur-o tor cheye bhodro.", "Kutta-r baccha, chup kor.", "Kukur-er moto gheu gheu keno?", "Tor kotha kukur-er gheu gheu-r moto.", "Kukur-o tor cheye shanto."] },
      "/bts": { em: "🙆🏼", list: ["BTS er fan hoye labh nai, kame ay.", "Tor BTS prem amar bhalo lage na.", "BTS er nam nis na ar."] },
      "/jawra": { em: "🐣", list: ["Tui to dekhi jawra-der shordar.", "Tor moto jawra ami dekhi nai.", "Jawra-r moto dekhaitecho keno?"] },
      "/soytan": { em: "🐥", list: ["Shoytan to tor bhitorei lukiye ase.", "Shoytan-er khalato bhai naki tui?", "Shoytani kom kor."] },
      "/gali": { em: "🐤", list: ["Beshi paknami korish na, nijer chorkay tel de.", "Tore gali dile amar mukher ruchi nosto hobe.", "Oshobho kotha bole labh nai.", "Tui jotoi try kor, tor level nichei thakbe.", "Tor moto manush-er sathe kotha bola mane somoy nosto.", "Tui keno je porda te ashli ke jane!", "Tor jibon-er kono value nai, faltu.", "Tor jibon-er goal to golay gese.", "Tore dekhle mone hoy vul kore dhormo pisiye geche.", "Tor buddhi ar amar hat-er talu ek.", "Tor profile dekhei bujha jay tui koto boro bal.", "Tor kotha shunle goru-o ghash khawa chere dibe.", "Toke dekhle amar karuna hoy.", "Tor jonne aborjona felar bin-o choto.", "Tor mukher bhasha tor charitrer motoi faltu.", "Tor brain-ta mone hoy second-hand kinsish.", "Tor hashle to char-pash ondhokar hoye jay.", "Tor future to toilet-er moto ondhokar.", "Tor moto ekta piece bazaar-e pawa doshkor.", "Tore kukur-e o bhoy pay.", "Tor charitrer kono thikana nai.", "Tui ekta cholonto obishap.", "Tor shonkha-o kom na, abal-er sreshtho tui.", "Tui jodio kotha bolish, mone hoy noise pollution.", "Tor moto manush-er jonne thanda pani-o gorom hoye jay.", "Tor kothay kono logic nai, shudhu boka.", "Tui jotoi kotha bolish, totori man shoman komteche.", "Tore jail-e deya uchit kotha bolar jonne.", "Tor shob kotha bhat-er fena.", "Tui thakle poribesh-er o shantir obhab hoy."] }
    };

    const command = body.toLowerCase().split(' ')[0];
    if (insults[command]) {
      const dataObj = insults[command];
      const randomMsg = dataObj.list[Math.floor(Math.random() * dataObj.list.length)];
      const userInfo = await api.getUserInfo(targetID);
      const userName = userInfo[targetID].name;
      
      const finalMsg = `${dataObj.em} ${userName}, ${randomMsg} ${dataObj.em}`;
      return api.sendMessage(finalMsg, threadID, messageReply.messageID);
    }
  }
};