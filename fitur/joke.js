const axios = require('axios');

async function sendJoke(bot, chatId) {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    const joke = response.data;

    const jokeText = `${joke.setup}\n\n${joke.punchline}`;

    bot.sendMessage(chatId, jokeText);
  } catch (error) {
    console.error('Error fetching joke:', error);
    bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat mengambil lelucon.');
  }
}

module.exports = { sendJoke };
