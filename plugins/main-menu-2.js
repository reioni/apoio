import { promises, readFileSync } from "fs";
import { join } from "path";
import { xpRange } from "../lib/levelling.js";
import moment from "moment-timezone";
import os from "os";
import fs from "fs";
import fetch from "node-fetch";
const {
  makeWASocket,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  downloadContentFromMessage,
  downloadHistory,
  proto,
  getMessage,
  generateWAMessageContent,
  prepareWAMessageMedia,
} = (await import("@adiwajshing/baileys")).default;
let emot = `${pickRandom([
  "⎔",
  "✦",
  "⭑",
  "ᯬ",
  "⭔",
  "◉",
  "⬟",
  "▢",
  "᭻",
  "»",
  "〆",
  "々",
  "⛥",
  "✗",
  "⛊",
  "⚜",
  "⚝",
  "⚚",
  "♪",
])}`;

const defaultMenu = {
  before: `
╭─────═[ INFO USER ]═─────⋆
│╭───────────────···
┴│☂︎ *Name:* %name
${emot}│☂︎ *Tag:* %tag
${emot}│☂︎ *Premium:* %prems
${emot}│☂︎ *Limit:* %limit
${emot}│☂︎ *Money:* %money
${emot}│☂︎ *Role:* %role
${emot}│☂︎ *Level:* %level [ %xp4levelup Xp For Levelup]
${emot}│☂︎ *Xp:* %exp / %maxexp
┬│☂︎ *Total Xp:* %totalexp
│╰────────────────···
┠─────═[ TODAY ]═─────⋆
│╭────────────────···
┴│    *${ucapan()} %name!*
${emot}│☂︎ *Tanggal:* %week %weton
${emot}│☂︎ *Date:* %date
${emot}│☂︎ *Tanggal Islam:* %dateIslamic
┬│☂︎ *Waktu:* %time
│╰────────────────···
┠─────═[ INFO BOT ]═─────⋆
│╭────────────────···
┴│☂︎ *Nama Bot:* %me
${emot}│☂︎ *Mode:* %mode
${emot}│☂︎ *Prefix:* [ *%_p* ]
${emot}│☂︎ *Baileys:* Multi Device
${emot}│☂︎ *Battery:* ${
    conn.battery != undefined
      ? `${conn.battery.value}% ${conn.battery.live ? "🔌 pengisian" : ""}`
      : "tidak diketahui"
  }
${emot}│☂︎ *Platform:* %platform
${emot}│☂︎ *Type:* Node.Js
${emot}│☂︎ *Uptime:* %muptime
┬│☂︎ *Database:* %rtotalreg dari %totalreg
│╰────────────────···
╰──────────═┅═──────────

⃝▣──「 *INFO CMD* 」───⬣
│ *Ⓟ* = Premium
│ *Ⓛ* = Limit
▣────────────⬣
%readmore
`.trimStart(),
  header: "⃝▣──「 %category 」───⬣",
  body: `${emot} %cmd %isPremium %islimit`,
  footer: "▣───────────⬣\n",
  after: `%c4 %me`,
};
let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  let res = JSON.parse(readFileSync("./json/emoji.json"));
  let em = res.emoji;
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let bot = await conn.profilePictureUrl(who).catch((_) => hwaifu.getRandom());
  let tags;
  let teks = `${args[0]}`.toLowerCase();
  let arrayMenu = [
    "all",
    "anime",
    "update",
    "maker",
    "berita",
    "edukasi",
    "news",
    "random",
    "logo",
    "menbalas",
    "game",
    "openai",
    "xp",
    "islamic",
    "stiker",
    "rpg",
    "kerangajaib",
    "quotes",
    "admin",
    "group",
    "premium",
    "internet",
    "anonymous",
    "nulis",
    "downloader",
    "tools",
    "fun",
    "database",
    "quran",
    "vote",
    "nsfw",
    "audio",
    "jadibot",
    "info",
    "owner",
    "nocategory",
  ];
  if (!arrayMenu.includes(teks)) teks = "404";
  if (teks == "all")
    tags = {
      main: "Main",
      game: "Game",
      openai: "OpenAI",
      rpg: "RPG Games",
      xp: "Exp & Limit",
      sticker: "Sticker",
      kerang: "Kerang Ajaib",
      quotes: "Quotes",
      fun: "Fun",
      anime: "Anime",
      admin: "Admin",
      group: "Group",
      vote: "Voting",
      absen: "Absen",
      premium: "Premium",
      anonymous: "Anonymous Chat",
      internet: "Internet",
      downloader: "Downloader",
      tools: "Tools",
      nulis: "MagerNulis & Logo",
      audio: "Audio",
      logo: "Logo Menu",
      maker: "Maker",
      berita: "Berita",
      database: "Database",
      quran: "Al Qur'an",
      owner: "Owner",
      host: "Host",
      advanced: "Advanced",
      info: "Info",
      "": "No Category",
    };
  if (teks == "game")
    tags = {
      game: "Game",
    };
  if (teks == "openai")
    tags = {
      openai: "OpenAI",
    };
  if (teks == "anime")
    tags = {
      anime: "Anime",
    };
  if (teks == "nsfw")
    tags = {
      nsfw: "Nsfw",
    };
  if (teks == "rpg")
    tags = {
      rpg: "Rpg",
    };
  if (teks == "edukasi")
    tags = {
      edukasi: "Edukasi",
    };
  if (teks == "news")
    tags = {
      news: "News",
    };
  if (teks == "random")
    tags = {
      random: "Random",
    };
  if (teks == "xp")
    tags = {
      xp: "Exp & Limit",
    };
  if (teks == "stiker")
    tags = {
      sticker: "Stiker",
    };
  if (teks == "kerangajaib")
    tags = {
      kerang: "Kerang Ajaib",
    };
  if (teks == "quotes")
    tags = {
      quotes: "Quotes",
    };
  if (teks == "berita")
    tags = {
      berita: "Berita",
    };
  if (teks == "admin")
    tags = {
      admin: `Admin ${global.opts["restrict"] ? "" : "(Dinonaktifkan)"}`,
      group: "Grup",
    };
  if (teks == "group")
    tags = {
      group: "Group",
    };
  if (teks == "premium")
    tags = {
      premium: "Premium",
    };
  if (teks == "internet")
    tags = {
      internet: "Internet",
    };
  if (teks == "anonymous")
    tags = {
      anonymous: "Anonymous Chat",
    };
  if (teks == "nulis")
    tags = {
      nulis: "Nulis",
      maker: "Maker",
    };
  if (teks == "downloader")
    tags = {
      downloader: "Downloader",
    };
  if (teks == "tools")
    tags = {
      tools: "Tools",
    };
  if (teks == "menbalas")
    tags = {
      menbalas: "Menfess",
    };
  if (teks == "fun")
    tags = {
      fun: "Fun",
    };
  if (teks == "database")
    tags = {
      database: "Database",
    };
  if (teks == "vote")
    tags = {
      vote: "Voting",
    };
  if (teks == "logo")
    tags = {
      logo: "Logo Menu",
    };
  if (teks == "absen")
    tags = {
      absen: "Absen",
    };
  if (teks == "quran")
    tags = {
      quran: "Al-Qur'an",
      islamic: "Islamic",
    };
  if (teks == "audio")
    tags = {
      audio: "Audio",
    };
  if (teks == "jadibot")
    tags = {
      jadibot: "Jadi Bot",
    };
  if (teks == "info")
    tags = {
      info: "Info",
    };
  if (teks == "owner")
    tags = {
      owner: "Owner",
      host: "Host",
      advanced: "Advanced",
    };
  if (teks == "nsfw")
    tags = {
      nsfw: "Nsfw",
    };
  if (teks == "nocategory")
    tags = {
      "": "No Category",
    };
  try {
    // DEFAULT MENU
    let dash = global.dashmenu;
    let m1 = global.dmenut;
    let m2 = global.dmenub;
    let m3 = global.dmenuf;
    let m4 = global.dmenub2;

    // COMMAND MENU
    let cc = global.cmenut;
    let c1 = global.cmenuh;
    let c2 = global.cmenub;
    let c3 = global.cmenuf;
    let c4 = global.cmenua;

    // LOGO L P
    let lprem = global.lopr;
    let llim = global.lolm;
    let tag = `@${m.sender.split("@")[0]}`;

    //-----------TIME---------
    let ucpn = `${ucapan()}`;
    let d = new Date(new Date() + 3600000);
    let locale = "id";
    let week = d.toLocaleDateString(locale, { weekday: "long" });
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
        ? conn.user.jid
        : m.sender;
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor(d / 84600000) % 5
    ];
    let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    let _uptime = process.uptime() * 1000;
    let _muptime;
    if (process.send) {
      process.send("uptime");
      _muptime =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);
    let _mpt;
    if (process.send) {
      process.send("uptime");
      _mpt =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let mpt = clockString(_mpt);

    let usrs = db.data.users[m.sender];

    const sections = [
      {
        title: `${htki} MAIN ${htka}`,
        rows: [
          {
            title: `⚡ ${pmenus} SPEED BOT`,
            rowId: ".speed",
            description: "Menampilkan kecepatan respon BOT",
          },
          {
            title: `💌 ${pmenus} OWNER BOT`,
            rowId: ".owner",
            description: "Menampilkan List owner BOT",
          },
          {
            title: `⏰ ${pmenus} RUNTIME BOT`,
            rowId: ".runtime",
            description: "𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 Waktu Bot Berjalan",
          },
          {
            title: `📔 ${pmenus} SCRIPT BOT`,
            rowId: ".sc",
            description: `Source Code ${namebot}`,
          },
          {
            title: `📜 ${pmenus} RULES BOT`,
            rowId: ".rules",
            description: `𝙼𝚎𝚗𝚊𝚖𝚙𝚒𝚕𝚔𝚊𝚗 rules Bot`,
          },
        ],
      },
      {
        title: `${htki} SUPPORT ${htka}`,
        rows: [
          {
            title: `🔖 ${pmenus} SEWA`,
            rowId: ".sewa",
            description: "Menampilkan list harga sewa BOT",
          },
          {
            title: `🌟 ${pmenus} BUY PREMIUM`,
            rowId: ".premium",
            description: "Menampilkan list harga premium",
          },
          {
            title: `💹 ${pmenus} DONASI`,
            rowId: ".donasi",
            description: "Support BOT agar lebih fast respon",
          },
        ],
      },
      {
        title: `${htki} MENU MENFESS ${htka}`,
        rows: [
          {
            title: `💬 ${pmenus} Menfess Balas`,
            rowId: ".menu2 menbalas",
            description: "Menampilkan Semua command BOT",
          },
        ],
      },
      {
        title: `${htki} MENU ${htka}`,
        rows: [
          {
            title: `💬 ${pmenus} All`,
            rowId: ".menu2 all",
            description: "Menampilkan Semua command BOT",
          },
          {
            title: `🌱 ${pmenus} Rpg`,
            rowId: ".menu2 rpg",
            description: "Game Epic Rpg!",
          },
          {
            title: `✨ ${pmenus} Exp`,
            rowId: ".menu2 xp",
            description: "Ayo tingkatkan pangkat mu!",
          },
          {
            title: `🎮 ${pmenus} Game`,
            rowId: ".menu2 game",
            description: "Gamenya seru seru lho >-<",
          },
          {
            title: `🤖 ${pmenus} OpenAI`,
            rowId: ".menu2 openai",
            description: "OpenAI ( New )",
          },
          {
            title: `🧩 ${pmenus} Fun`,
            rowId: ".menu2 fun",
            description: "Fitur yang aman untuk keluarga",
          },
          {
            title: `🐚 ${pmenus} Kerang`,
            rowId: ".menu2 kerangajaib",
            description: "Tanyakan pada ketua club",
          },
          {
            title: `📑 ${pmenus} Quotes`,
            rowId: ".menu2 quotes",
            description: "Random Inspirasi",
          },
          {
            title: `⛩️ ${pmenus} Anime`,
            rowId: ".menu2 anime",
            description: "Kamu wibu ya bang?",
          },
          {
            title: `🔞 ${pmenus} Nsfw`,
            rowId: ".menu2 nsfw",
            description: "Tch, dasar sagne",
          },
          {
            title: `🌟 ${pmenus} Premium`,
            rowId: ".menu2 premium",
            description: "Only premium Users",
          },
          {
            title: `🎭 ${pmenus} Anonymous Chats`,
            rowId: ".menu2 anonymous",
            description: "Bicara dengan orang tidak dikenal",
          },
          {
            title: `📖 ${pmenus} Al-Quran`,
            rowId: ".menu2 quran",
            description: "Tobat yuk kak",
          },
          {
            title: `🌎 ${pmenus} Internet`,
            rowId: ".menu2 internet",
            description: "Cari sesuatu diBOT",
          },
          {
            title: `🌎 ${pmenus} Berita`,
            rowId: ".menu2 berita",
            description: "Cari berita terupdate",
          },
          {
            title: `📩 ${pmenus} Downloaders`,
            rowId: ".menu2 downloader",
            description: "Download sesuatu diBOT",
          },
          {
            title: `🎨 ${pmenus} Stikers`,
            rowId: ".menu2 stiker",
            description: "Buat Sticker diBOT",
          },
          {
            title: `🎨 ${pmenus} Logo`,
            rowId: ".menu2 logo",
            description: "Buat Logo Kamu diBOT",
          },
          {
            title: `✏️ ${pmenus} Nulis`,
            rowId: ".menu2 nulis",
            description: "Nulis kok males kak?",
          },
          {
            title: `🎧 ${pmenus} Audio`,
            rowId: ".menu2 audio",
            description: "Ubah Audio dengan Filter",
          },
          {
            title: `🎧 ${pmenus} Sound Menu`,
            rowId: ".soundmenu",
            description: "Kumpulan 120 Sound",
          },
          {
            title: `🎧 ${pmenus} Sound Kane Menu`,
            rowId: ".soundkanemenu",
            description: "Kumpulan 24 Sound",
          },
          {
            title: `🏢 ${pmenus} Group`,
            rowId: ".menu2 group",
            description: "Only Groups",
          },
          {
            title: `👑 ${pmenus} Admin`,
            rowId: ".menu2 admin",
            description: "Only Admin Group",
          },
          {
            title: `🗂️ ${pmenus} Database`,
            rowId: ".menu2 database",
            description: "Simpan sesuatu diBOT",
          },
          {
            title: `🛠️ ${pmenus} Tools`,
            rowId: ".menu2 tools",
            description: "Mungkin tools ini bisa membantu?",
          },
          {
            title: `ℹ️ ${pmenus} Info`,
            rowId: ".menu2 info",
            description: "Info info BOT",
          },
          {
            title: `👩‍💻 ${pmenus} Owner`,
            rowId: ".menu2 owner",
            description: "Owner Only!",
          },
          {
            title: `❓ ${pmenus} No Category`,
            rowId: ".menu2 nocategory",
            description: "Fitur tanpa kategory!",
          },
        ],
      },
    ];

    let tek = `✧────···[ Dashboard ]···────✧
*${ucapan()} ${conn.getName(m.sender)}*
╭━━━━━━━━━━━━━━━━┈─✧
┴
┬
│${emot} 「 Hai Kak👋 」
├❖ 「 ${conn.getName(m.sender)} 」
├❖  Bagaimana Harimu? 😄
├❖  Terima Kasih Telah Menggunakan Bot Kami
│
├━━━━━━━━━━━━━━━━┈─⋆
│  「 *U s e r  I n f o 克* 」
│${emot} *ɴᴀᴍᴇ:* ${usrs.registered ? usrs.name : conn.getName(m.sender)}
│${emot} *ᴛᴀɢs:* @${m.sender.split`@`[0]}
│${emot} *sᴛᴀᴛᴜs:* ${
      m.sender.split`@`[0] == nomorown
        ? "Developer"
        : usrs.premiumTime >= 1
        ? "Premium User"
        : "Free User"
    }
│${emot} *ᴘʀᴇᴍɪᴜᴍ:* ${usrs.premiumTime > 1 ? "Yes" : "No"}
│
├━━━━━━━━━━━━━━━━┈─⋆
│  「 *S t a t u s  I n f o 比* 」
│${emot} *ᴛɪᴍᴇ:* ${moment.tz("Asia/Jakarta").format("HH")} H  ${moment
      .tz("Asia/Jakarta")
      .format("mm")} M  ${moment.tz("Asia/Jakarta").format("ss")} S
│${emot} *ᴜsᴇʀs:* ${Object.keys(global.db.data.users).length}
│${emot} *ʟɪᴍɪᴛ:* ${usrs.limit}
│${emot} *ʟᴇᴠᴇʟ:* ${usrs.level}
│
├━━━━━━━━━━━━━━━━┈─⋆
│  「 *I n f o   B o t 比* 」
│${emot} Aktif selama ${mpt}
│${emot} Baterai ${
      conn.battery != undefined
        ? `${conn.battery.value}% ${conn.battery.live ? "🔌 pengisian" : ""}`
        : "tidak diketahui"
    }
│${emot} Prefix : [ ${_p} ]
│${emot} *${Object.keys(global.db.data.users).length}* Pengguna
│${emot} *${
      Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned)
        .length
    }* Chat Terbanned
│${emot} *${
      Object.entries(global.db.data.users).filter((user) => user[1].banned)
        .length
    }* Pengguna Terbanned
│
├━━━━━━━━━━━━━━━━┈─⋆
│
│ ▸ *YouTube :* ${nameown}
│ ▸ *ᴀᴜᴛʜᴏʀ :* ${nameown}
┴ ▸ *ᴏᴡɴᴇʀ :* ${nameown}
✧
┬ 📌 𝗣𝗶𝗻𝗻𝗲𝗱 :
│ ʙᴇʀɪ ᴊᴇᴅᴀ ʏᴀʜ ᴋᴀᴋ ^ω^
│
├━━━━━━━━━━━━━━━━┈─⋆
│${emot} *ʀᴏʟᴇ:* ${usrs.role}${
      usrs.premiumTime > 1
        ? `
│${emot} *ᴇxᴘɪʀᴇᴅ ᴘʀᴇᴍɪᴜᴍ:*
│${emot} ${clockStringP(usrs.premiumTime - new Date())}`
        : ""
    }
╰━━━━━━━━━━━━━━━━┈─◂`;
    const listMessage = {
      text: tek,
      footer: `📮 *Note:* Jika menemukan bug, error atau kesulitan dalam penggunaan silahkan laporkan/tanyakan kepada Owner\n\nᴍᴀᴅᴇ ᴡɪᴛʜ ❤ ʙʏ ${nameown}\n\n${botdate}\n\n${wm2}`,
      mentions: await conn.parseMention(tek),
      title: ``,
      buttonText: `CLICK HERE ⎙`,
      sections,
    };
    if (teks == "404") {
      return conn.sendMessage(m.chat, listMessage, {
        quoted: fakes,
        mentions: await conn.parseMention(tek),
        contextInfo: { forwardingScore: 99999, isForwarded: true },
      });
    }

    /**************************** TIME *********************/
    let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    let wibh = moment.tz("Asia/Jakarta").format("HH");
    let wibm = moment.tz("Asia/Jakarta").format("mm");
    let wibs = moment.tz("Asia/Jakarta").format("ss");
    let wit = moment.tz("Asia/Jayapura").format("HH:mm:ss");
    let wita = moment.tz("Asia/Makassar").format("HH:mm:ss");
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`;

    let mode = global.opts["self"] ? "Private" : "Publik";
    let _package =
      JSON.parse(
        await promises
          .readFile(join(__dirname, "../package.json"))
          .catch((_) => ({}))
      ) || {};
    let { age, exp, limit, level, role, registered, money } =
      global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let premium = global.db.data.users[m.sender].premiumTime;
    let prems = `${premium > 0 ? "Premium" : "Free"}`;
    let platform = os.platform();

    //---------------------

    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(
      (user) => user.registered == true
    ).length;
    let help = Object.values(global.plugins)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => {
        return {
          help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: "customPrefix" in plugin,
          limit: plugin.limit,
          premium: plugin.premium,
          enabled: !plugin.disabled,
        };
      });
    let groups = {};
    for (let tag in tags) {
      groups[tag] = [];
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin);
    }
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after =
      conn.menu.after ||
      (conn.user.jid == global.conn.user.jid
        ? ""
        : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) +
        defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map((tag) => {
        return (
          header.replace(/%category/g, tags[tag]) +
          "\n" +
          [
            ...help
              .filter(
                (menu) => menu.tags && menu.tags.includes(tag) && menu.help
              )
              .map((menu) => {
                return menu.help
                  .map((help) => {
                    return body
                      .replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
                      .replace(/%islimit/g, menu.limit ? llim : "")
                      .replace(/%isPremium/g, menu.premium ? lprem : "")
                      .trim();
                  })
                  .join("\n");
              }),
            footer,
          ].join("\n")
        );
      }),
      after,
    ].join("\n");
    let text =
      typeof conn.menu == "string"
        ? conn.menu
        : typeof conn.menu == "object"
        ? _text
        : "";
    let replace = {
      "%": "%",
      p: uptime,
      muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage
        ? _package.homepage.url || _package.homepage
        : "[unknown github url]",
      tag,
      dash,
      m1,
      m2,
      m3,
      m4,
      cc,
      c1,
      c2,
      c3,
      c4,
      lprem,
      llim,
      ucpn,
      platform,
      wib,
      mode,
      _p,
      money,
      age,
      tag,
      name,
      prems,
      level,
      limit,
      name,
      weton,
      week,
      date,
      dateIslamic,
      time,
      totalreg,
      rtotalreg,
      role,
      readmore: readMore,
    };
    text = text.replace(
      new RegExp(
        `%(${Object.keys(replace).sort((a, b) => b.length - a.length)
          .join`|`})`,
        "g"
      ),
      (_, name) => "" + replace[name]
    );

    //----------------- FAKE
    let fvn = {
      quoted: {
        key: { participant: "0@s.whatsapp.net" },
        message: {
          audioMessage: {
            mimetype: "audio/ogg; codecs=opus",
            seconds: "2022",
            ptt: "true",
          },
        },
      },
    };
    let floc = {
      quoted: {
        key: { participant: "0@s.whatsapp.net" },
        message: {
          liveLocationMessage: {
            caption: `Menu`,
            h: `${name}`,
            jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
          },
        },
      },
    };
    let fdocs = {
      quoted: {
        key: { participant: "0@s.whatsapp.net" },
        message: {
          documentMessage: {
            title: `Hai Kak ${name}!`,
            jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
          },
        },
      },
    };
    let fgclink = {
      quoted: {
        key: { participant: "0@s.whatsapp.net" },
        message: {
          groupInviteMessage: {
            groupJid: "17608914335-1625305606@g.us",
            inviteCode: null,
            groupName: `Hai ${name}!`,
            caption: wm,
            jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
          },
        },
      },
    };
    let fgif = {
      quoted: {
        key: { participant: "0@s.whatsapp.net" },
        message: {
          videoMessage: {
            title: `Hai Kak ${name}!`,
            h: `Hmm`,
            seconds: "999999999",
            gifPlayback: "true",
            caption: wm,
            jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
          },
        },
      },
    };
    let fkon = {
      key: {
        fromMe: false,
        participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "16504228206@s.whatsapp.net" } : {}),
      },
      message: {
        contactMessage: {
          displayName: `${name}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${
            m.sender.split("@")[0]
          }:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        },
      },
    };

    let ftoko = {
      key: {
        fromMe: false,
        participant: `${m.sender.split`@`[0]}` + "@s.whatsapp.net",
        remoteJid: "status@broadcast",
      },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: "image/jpeg",
              jpegThumbnail: fs.readFileSync("./thumbnail.jpg"),
            },
            title: `${ucapan()}`,
            description: "𝗧 𝗜 𝗠 𝗘 : " + wktuwib,
            currencyCode: "US",
            priceAmount1000: "100",
            retailerId: wm,
            productImageCount: 999,
          },
          businessOwnerJid: `${m.sender.split`@`[0]}@s.whatsapp.net`,
        },
      },
    };

    let urls = pickRandom([
      "https://telegra.ph/file/035e524939ab0294ba91f.jpg",
      "https://telegra.ph/file/96b2275d3b14d071290bc.jpg",
      "https://telegra.ph/file/2c6b7660bc6126404a9bb.jpg",
      "https://telegra.ph/file/c635bf577bb9d59a3e00b.jpg",
      "https://telegra.ph/file/be8dd52f6363f9e9f5a60.jpg",
      "https://telegra.ph/file/02e53361b9dc946f63c8d.jpg",
      "https://telegra.ph/file/298ed2f1bba17aeb64ca8.jpg",
      "https://telegra.ph/file/be2a18221974147f66ea0.jpg",
    ]);

    const pp = await conn
      .profilePictureUrl(conn.user.jid)
      .catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png");

    //FAKE TROLI

    const ftrol = {
      key: {
        remoteJid: "status@broadcast",

        participant: "0@s.whatsapp.net",
      },

      message: {
        orderMessage: {
          itemCount: 2022,

          status: 1,

          surface: 1,

          message: `Hai Kak ${name}!`,

          orderTitle: `▮Menu ▸`,

          thumbnail: await (await fetch(fla + "Menu")).buffer(), //Gambarnye

          sellerJid: "0@s.whatsapp.net",
        },
      },
    };

    const fload = {
      key: {
        remoteJid: "status@broadcast",

        participant: "0@s.whatsapp.net",
      },

      message: {
        orderMessage: {
          itemCount: 2022,

          status: 1,

          surface: 1,

          message: "[❗] Memuat Menu " + teks + "...\n Sabar Ya Kak ^ω^",

          orderTitle: `▮Menu ▸`,

          thumbnail: await (await fetch(fla + "Loading")).buffer(), //Gambarnye

          sellerJid: "0@s.whatsapp.net",
        },
      },
    };

    conn.reply(m.chat, "*Tunggu Sebentar Kak. . .*", ftrol);

    //------------------< MENU >----------------

    //------------------ SIMPLE
    /*conn.reply(m.chat, text, fkon, { contextInfo: { mentionedJid: [m.sender],
        externalAdReply: {
            title: `${htjava} ${namebot}`,
            body: titlebot,
            description: titlebot,
            mediaType: 2,
          thumbnail: await(await fetch(thumb2)).buffer(),
         mediaUrl: sig
        }
     }
    })*/

    //------------------ DOCUMENT
    let d1 =
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    let d2 =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    let d3 =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    let d4 = "application/pdf";
    let d5 = "application/vnd.android.package-archive";
    let d6 = "application/zip";
    let td = `${pickRandom([d1, d2, d3, d4, d5, d6])}`;

    // Thanks Rlxfly https://github.com/Rlxfly
    //------- MENU LOCATION
    const pre = generateWAMessageFromContent(
      m.chat,
      {
        liveLocationMessage: {
          degreesLatitude: 34.672314,
          degreesLongitude: 135.484802,
          accuracyInMeters: 100,
          speedInMps: 999,
          degreesClockwiseFromMagneticNorth: 99,
          caption: text.trim(),
          sequenceNumber: 774236889,
          timeOffset: 8600,
          jpegThumbnail: await (await fetch(thumb)).buffer(),
          contextInfo: { mentionedJid: [m.sender] },
        },
      },
      { quoted: m }
    );

    //return conn.relayMessage(m.chat, pre.message, { messageId: pre.key.id })

    //-------DOC TEMPLATE
    const message = {
      document: { url: thumbdoc },
      jpegThumbnail: await (await fetch(urls)).buffer(),
      fileName: wm,
      mimetype: td,
      fileLength: fsizedoc,
      pageCount: fpagedoc,
      caption: text.trim(),
      footer: titlebot,
      templateButtons: [
        {
          urlButton: {
            displayText: "YouTube",
            url: syt,
          },
        },
        {
          quickReplyButton: {
            displayText: "Owner🎐",
            id: ".owner",
          },
        },
        {
          quickReplyButton: {
            displayText: "Speed⚡",
            id: ".ping",
          },
        },
        {
          quickReplyButton: {
            displayText: "Donasi💵",
            id: ".donasi",
          },
        },
      ],
    };
    //await conn.sendMessage(m.chat, message, m, { mentionedJid: [m.sender] })

    //------------------- 2BUTTON VID
    // conn.sendMessage(m.chat, { image: { url: 'https://i.ibb.co/XZrK6yQ/transformers.jpg' }, text, footer: 'ᴍᴀᴅᴇ ᴡɪᴛʜ ❤ ʙʏ', templateButtons: [{ quickReplyButton: { displayText: 'Speedtest⚡', id: `${_p}speedtest` }}, { quickReplyButton: { displayText: 'Owner🎀', id: `${_p}owner` }} ] })

    // FIX MENU WHATSAPP BASE NEW DAN BAKAL EXPIRED SAAT MARK SUDAH FIX WHATSAPP UPDATE ENTAH VERSI BERAPA
    // MAU YANG NO ENC 10K AJA , MINAT PC GW wa.me/6289503433262
    // MAU YANG NO ENC MENFESS BALAS NAMBAH 5K :), TOTAL HARGA 15K EXPIRED SAMPAI TANGGAL 20 OKTOBER 2022

    // KALAU UDAH LEWAT TANGGAL 20 OKTOBER 2022 HARGA TOTAL AKAN MENJADI 25K
    conn.send3ButtonVid(
      m.chat,
      "https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4",
      "┅────┅─❏ *𝐃𝐀𝐒𝐇𝐁𝐎𝐀𝐑𝐃* ❏─┅────┅",
      text.trim() + ("\nᴍᴀᴅᴇ ᴡɪᴛʜ \u2764 ʙʏ " + nameown + "\n") + botdate,
      "Menu",
      ".menu",
      "Owner",
      ".owner",
      "Credit",
      ".credit",
      m,
      {
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaUrl: sig,
            mediaType: 2,
            description: sgc,
            title: "Follow Lah Cᴜʏ!!!",
            body: wm,
            thumbnail: await (await fetch(bot)).buffer(),
            sourceUrl: sig,
          },
        },
      }
    );
    //------------------- PAYMENT MENU
    /*await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 10000000,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: text.trim(),
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})*/

    //------------------- 2BUTTON LOCATION
    /*conn.sendButton(m.chat, `${ucapan()}﹗`, text.trim(), `${timeimg()}`, [
      ['ᴍᴇɴᴜ', `${_p}menu`],
      ['sᴘᴇᴇᴅᴛᴇsᴛ', `${_p}speedtest`]
    ], m, {asLocation: true})*/
  } catch (e) {
    conn.reply(m.chat, "Maaf, menu sedang error", m);
    throw e;
  }
};
handler.command = /^(menu2)$/i;

handler.register = false;
handler.exp = 3;

export default handler;

//----------- FUNCTION -------

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, " H ", m, " M ", s, " S "]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10;
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12;
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30;
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    ye,
    " *Years 🗓️*\n",
    mo,
    " *Month 🌙*\n",
    d,
    " *Days ☀️*\n",
    h,
    " *Hours 🕐*\n",
    m,
    " *Minute ⏰*\n",
    s,
    " *Second ⏱️*",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Kok Belum Tidur Kak? 🥱";
  if (time >= 4) {
    res = "Pagi Lord 🌄";
  }
  if (time >= 10) {
    res = "Siang Lord ☀️";
  }
  if (time >= 15) {
    res = "Sore Lord 🌇";
  }
  if (time >= 18) {
    res = "Malam Lord 🌙";
  }
  return res;
}