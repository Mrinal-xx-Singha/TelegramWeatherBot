require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require("express");
const checkBlocked = require("./utils/checkBlocked");
const cron = require("node-cron");

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
    `Hi 👋 Welcome to the weather forecast bot! Type /subscribe to get weather updates or /unsubscribe to stop receiving updates.`
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

// unsubscribe command
bot.onText(/\/unsubscribe/, (msg) => {
  const chatId = msg.chat.id;
  subscriptions.delete(chatId);
  bot.sendMessage(chatId, "You are unsubscribed from weather updates.");
});

// Handle city name input
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const city = msg.text;

  // Skip commands
  if (/\/(start|subscribe|unsubscribe)/i.test(city)) return;

  const telegramId = String(msg.from.id);

  try {
    // check if user is blocked
    const isBlocked = await checkBlocked(telegramId);

    // Check if user is blocked
    if (isBlocked) {
      bot.sendMessage(chatId, "🚫 You are blocked from using the bot.");
      return;
    }
  } catch (error) {
    console.error("[Block Check Error]", error.message);
    // Continue if block check fails
  }

  // Proceed only if text seems like a city (basic filter)
  if (!/^[a-zA-Z\s]{2,}$/.test(city)) {
    bot.sendMessage(chatId, "❗ Please enter a valid city name.");
    return;
  }

  try {
    // Step1: Fetch weather
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const data = weatherRes.data;
    const weatherInfo = `
    *Weather in ${data.name}, ${data.sys.country}*
    🌡️ Temperature: ${data.main.temp}°C
    🌥️ Condition: ${data.weather[0].description}
    💧 Humidity: ${data.main.humidity}%
    🌬️ Wind: ${data.wind.speed} m/s
    `;

    await bot.sendMessage(chatId, weatherInfo, { parse_mode: "Markdown" });

    const username = msg.from.username || msg.from.first_name;

    // Save/update user subscription
    await axios.post(`${process.env.BACKEND_URL}/api/users/subscribe`, {
      telegramId,
      username,
      city: data.name,
    });

    console.log(`✅ User ${username} subscribed for ${data.name}`);
  } catch (error) {
    console.error("[BOT ERROR]", error.message);

    if (error.response?.status === 404) {
      bot.sendMessage(
        chatId,
        `⚠️ City "${city}" not found. Please check the spelling and try again.`
      );
    } else {
      bot.sendMessage(
        chatId,
        `⚠️ Unable to fetch weather for "${city}". Please try again later.`
      );
    }
  }
});

// Cron job - Every minute for testing
cron.schedule("0 8 * * *", async () => {
  console.log("✅ Cron job started at:", new Date().toLocaleString());
  console.log("Running weather update job...");

  try {
    const res = await axios.get(`${process.env.BACKEND_URL}/api/users`, {
      headers: {
        "x-cron-secret": process.env.CRON_SECRET,
      },
    });

    const users = res.data;
    console.log(`📋 Found ${users.length} users in database`);

    for (const user of users) {
      const { telegramId, city, isSubscribed, isBlocked } = user;

      console.log(
        `📋 Processing user ${telegramId}: subscribed=${isSubscribed}, blocked=${isBlocked}, city=${city}`
      );

      // Skip if NOT subscribed OR if blocked
      if (!isSubscribed || isBlocked) {
        console.log(
          `⏭️ Skipping user ${telegramId} - not subscribed or blocked`
        );
        continue;
      }

      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        const data = weatherRes.data;

        const weatherInfo = `
        *🌤️ Weather Update for ${data.name}, ${data.sys.country}*
        🌡️ Temperature: ${data.main.temp}°C
        🌥️ Condition: ${data.weather[0].description}
        💧 Humidity: ${data.main.humidity}%
        🌬️ Wind: ${data.wind.speed} m/s

        _Updated: ${new Date().toLocaleString()}_
        `;

        await bot.sendMessage(telegramId, weatherInfo, {
          parse_mode: "Markdown",
        });

        console.log(`✅ Weather update sent to user ${telegramId} for ${city}`);
      } catch (error) {
        console.error(`[Weather Error for ${city}]`, error.message);

        try {
          await bot.sendMessage(
            telegramId,
            `⚠️ Could not fetch today's weather for "${city}". The service might be temporarily unavailable.`
          );
        } catch (sendError) {
          console.error(`[Send Error to ${telegramId}]`, sendError.message);
        }
      }
    }

    console.log("✅ Cron job completed successfully");
  } catch (error) {
    console.error("[Cron Job Error]", error.message);

    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
});

app.listen(3001, () => {
  console.log(`🚀 Bot running on PORT: 3001`);
});
