const axios = require('axios');
module.exports = (bot, chatId, url) => {
  
  const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
  if (!regex.test(url)) {
    bot.sendMessage(chatId, 'URL tidak valid! Pastikan menggunakan format http:// atau https://');
    return;
  }

  const visitUrl = async () => {
    try {
      const response = await axios.get(url);
      bot.sendMessage(chatId, `Berhasil mengunjungi ${url} - Status: ${response.status}`);
    } catch (error) {
      bot.sendMessage(chatId, `Gagal mengunjungi ${url}. Error: ${error.message}`);
    }
  };

  const interval = setInterval(() => {
    visitUrl();
  }, 1000); // Setiap detik

  // Stop setelah 1 menit
  setTimeout(() => {
    clearInterval(interval);
    bot.sendMessage(chatId, 'Spam visit link berhenti setelah 1 menit.');
  }, 60000); // Hentikan setelah 1 menit
};
