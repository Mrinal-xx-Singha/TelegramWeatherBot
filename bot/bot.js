require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require("express");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const app = express();

const subscriptions = new Set();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Hi Welcome to the weather forecast bot! Type /subscribe to get weather updates or /unsubscribe to stop receiving updates.`
  );
});

// subscribe command
bot.onText(/\/subscribe/, (msg) => {
  const chatId = msg.chat.id;
  subscriptions.add(chatId);
  bot.sendMessage(
    chatId,
    "You are now subscribed to weather updates, Please enter a location (city name) to get weather updates. "
  );
});

// unsubscribe commannd 
bot.onText(/\/unsubscribe/, (msg) => {
  const chatId = msg.chat.id;
  subscriptions.delete(chatId);
  bot.sendMessage(chatId, "You are unsubscribed from weather updates.");
});

// Handle city name input

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const city = msg.text;

  if(/\/(start|subscribe|unsubscribe)/i.test(city))return

  // Proceed only if text seems like a city (basic filter)


  if (!/^[a-zA-Z\s]{3,}$/.test(city)){
    bot.sendMessage(chatId,"❗ Please enter a valid city name.")

  } 

  try {
    //Step1: Fetch weather
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const data = weatherRes.data;
    const weatherInfo = `
    *Weather in ${data.name},${data.sys.country}*
    Temperature: ${data.main.temp}°C
    Condition: ${data.weather[0].description}
    Humidity: ${data.main.humidity}%
    Wind: ${data.wind.speed} m/s

    `;
    bot.sendMessage(chatId, weatherInfo, { parse_mode: "Markdown" });

    // Step2: Subscribe user to backend
    await axios.post(`${process.env.BACKEND_URL}/api/users/subscribe`, {
      telegramId: String(msg.from.id),
      username: msg.from.username || msg.from.first_name,
      city: data.name,
    });
  } catch (error) {
    console.error("[BOT ERROR]", error.message);

    bot.sendMessage(
      chatId,
      `Unable to fetch weather for "${city}" please ensure the city name is correct`
    );
  }
});

app.listen(3001, () => {
  console.log(`Bot running one PORT:3001`);
});
