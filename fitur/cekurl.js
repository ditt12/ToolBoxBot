const axios = require('axios');
const xss = require('xss');  // Import module xss untuk memeriksa potensi XSS

module.exports = (bot, chatId, url) => {
  // Validasi URL menggunakan regex
  const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
  if (!regex.test(url)) {
    bot.sendMessage(chatId, 'URL tidak valid! Pastikan menggunakan format http:// atau https://');
    return;
  }

  // Fungsi untuk cek URL dan keamanan dari XSS
  const checkUrl = async () => {
    try {
      // Periksa apakah URL mengandung potensi XSS
      const cleanUrl = xss(url); // Cek apakah URL aman
      if (cleanUrl !== url) {
        bot.sendMessage(chatId, `URL ini mungkin rentan terhadap serangan XSS: ${url}`);
        return;
      }

      // Lakukan HTTP request ke URL untuk memverifikasi apakah URL aktif
      const response = await axios.get(url);
      bot.sendMessage(chatId, `URL valid: ${url} - Status: ${response.status}`);
    } catch (error) {
      bot.sendMessage(chatId, `URL tidak valid atau tidak dapat diakses: ${url}. Error: ${error.message}`);
    }
  };

  checkUrl();
};
