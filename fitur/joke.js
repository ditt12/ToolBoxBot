const axios = require('axios');

// Fungsi untuk mengirimkan lelucon acak
async function sendJoke(bot, chatId) {
  try {
    // Mengambil data lelucon dari API
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    const joke = response.data;

    // Format lelucon
    const jokeText = `${joke.setup}\n\n${joke.punchline}`;

    // Kirim lelucon ke pengguna
    bot.sendMessage(chatId, jokeText);
  } catch (error) {
    console.error('Error fetching joke:', error);
    bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat mengambil lelucon.');
  }
}

module.exports = { sendJoke };
