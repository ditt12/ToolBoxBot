const axios = require('axios');  // Import axios untuk HTTP request

// Fungsi untuk mendapatkan kutipan motivasi dari API
async function sendMotivasi(bot, chatId) {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    
    // Ambil kutipan dari API response
    const quote = response.data[0].q;
    const author = response.data[0].a;

    // Kirimkan kutipan ke chat Telegram
    bot.sendMessage(chatId, `"${quote}" - ${author}`);
  } catch (error) {
    console.error('Error fetching motivation:', error);
    bot.sendMessage(chatId, 'Oops! Terjadi kesalahan saat mengambil kutipan motivasi.');
  }
}

module.exports = { sendMotivasi };
