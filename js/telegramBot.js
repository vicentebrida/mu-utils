const TelegramBot = require('node-telegram-bot-api');

const token = '1186972349:AAFFrl5UHqPGrzmhFMJM3n5FyvtpHuly2ic';

const bot = new TelegramBot(token, {polling: true});

const configChatId = 860449002;

function enableTelegramBot() {
  bot.onText(/\/(.+)/, (msg, match) => {
  
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    if (resp === 'status') {
      console.log(chatId);
      bot.sendMessage(chatId, 'Beleza, me da um segundo que já te envio print.');
      // sendMessageTelegramBot(chatId);
    }
  
    // send back the matched "whatever" to the chat
    // 
  });
  
  bot.on('message', (msg) => {
    const { id: chatId, first_name } = msg.chat;
    const { text } = msg;
  
    if (text.substr(0, 1) !== '/') {
      bot.sendMessage(chatId, 'Fala ' + first_name);
    }
  });
}

function sendMessageTelegramBot(chatId, data = []) {
  bot.sendPhoto(chatId, './image1.png');
}