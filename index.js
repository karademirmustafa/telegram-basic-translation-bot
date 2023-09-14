const express = require("express");

const app = express();
require('dotenv').config();
const { translate } = require('bing-translate-api');
const TelegramBot = require('node-telegram-bot-api');


const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/ceviri/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Lütfen çevirmek istediğiniz metni girin:');
});


bot.on('text', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    const translatedText = await translate(text,"tr","en");

    bot.sendMessage(chatId, `Çeviri sonucu: ${translatedText.translation}`);
});





const PORT = process.env.PORT || 4999;
app.listen(PORT, () => {
    console.log("server is running!")
})