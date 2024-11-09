const axios = require('axios');  

async function sendMotivasi(bot, chatId) {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    
    const quote = response.data[0].q;
    const author = response.data[0].a;

    bot.sendMessage(chatId, `"${quote}" - ${author}`);
  } catch (error) {
    console.error('Error fetching motivation:', error);
    bot.sendMessage(chatId, 'Oops! Terjadi kesalahan saat mengambil kutipan motivasi.');
  }
}

module.exports = { sendMotivasi };
