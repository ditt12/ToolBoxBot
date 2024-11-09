const axios = require('axios');
const xss = require('xss');  
module.exports = (bot, chatId, url) => {
  
  const regex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
  if (!regex.test(url)) {
    bot.sendMessage(chatId, 'URL tidak valid! Pastikan menggunakan format http:// atau https://');
    return;
  }

  const checkUrl = async () => {
    try {
      
      const cleanUrl = xss(url); 
      if (cleanUrl !== url) {
        bot.sendMessage(chatId, `URL ini mungkin rentan terhadap serangan XSS: ${url}`);
        return;
      }

      const response = await axios.get(url);
      bot.sendMessage(chatId, `URL valid: ${url} - Status: ${response.status}`);
    } catch (error) {
      bot.sendMessage(chatId, `URL tidak valid atau tidak dapat diakses: ${url}. Error: ${error.message}`);
    }
  };

  checkUrl();
};
