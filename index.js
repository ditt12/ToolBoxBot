const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// Mengimpor fitur dari folder fitur
const cekurl = require('./fitur/cekurl');
const spam = require('./fitur/spam');
const motivasi = require('./fitur/motivasi');
const joke = require('./fitur/joke');
const fototolink = require('./fitur/fototolink'); // Mengimpor fotoToLink

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json')));
const token = settings.token;  // Token bot

const bot = new TelegramBot(token, { polling: true });

// Menu Utama
const menu = `
┌─────────────────────────┐
│   Ini adalah fitur menu 
│     /toolsmenu          
│     /funmenu            
└─────────────────────────┘
`;

// Menu Tools
const toolsMenu = `
┌─────────────────────────┐
│ Pilihan Tools           
│ /cekurl [URL]           
│ /spam [URL]             
│ /motivasi               
│ /fototolink             
└─────────────────────────┘
`;

// Menu Fun
const funMenu = `
┌─────────────────────────┐
│ Pilihan Fun             
│ /joke                   
└─────────────────────────┘
`;

// Perintah /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const botName = msg.bot.username;  // Mengambil nama bot dari Telegram
  bot.sendMessage(chatId, `Hai, saya adalah ${botName}, Ketik /menu untuk melihat menu yang ada di bot ini`);
});

// Perintah /menu
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, menu);
});

// Perintah /toolsmenu untuk menampilkan menu alat
bot.onText(/\/toolsmenu/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, toolsMenu);
});

// Perintah /funmenu untuk menampilkan menu fun
bot.onText(/\/funmenu/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, funMenu);
});

// Perintah /cekurl untuk mengecek keamanan URL
bot.onText(/\/cekurl (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];  // Mendapatkan URL yang dimasukkan setelah /cekurl
  cekurl.checkUrl(bot, chatId, url);
});

// Perintah /spam untuk melakukan spam pada URL
bot.onText(/\/spam (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];
  spam.spamUrl(bot, chatId, url);
});

// Perintah /motivasi untuk mengirim kutipan motivasi
bot.onText(/\/motivasi/, (msg) => {
  const chatId = msg.chat.id;
  motivasi.sendMotivasi(bot, chatId);
});

// Perintah /joke untuk mengirimkan lelucon acak
bot.onText(/\/joke/, async (msg) => {
  const chatId = msg.chat.id;
  joke.sendJoke(bot, chatId);
});

// Perintah /fototolink untuk mengupload gambar dan mengembalikan URL gambar
bot.on('photo', (msg) => {
  const chatId = msg.chat.id;
  const photo = msg.photo[msg.photo.length - 1];  // Mendapatkan foto ukuran terbesar
  fototolink.fotoToLink(bot, chatId, photo); // Memanggil fungsi fotoToLink dari fototolink.js
});
