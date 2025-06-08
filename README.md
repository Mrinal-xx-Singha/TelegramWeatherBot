# 🌤️ Telegram Weather Bot

A comprehensive Telegram bot that provides real-time weather updates with automated daily notifications and an admin dashboard for user management.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Bot Commands](#-bot-commands)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🤖 Telegram Bot
- **Real-time Weather Updates** - Get current weather for any city
- **Subscription System** - Users can subscribe/unsubscribe from updates
- **Automated Daily Notifications** - Scheduled weather updates via cron jobs
- **User Management** - Block/unblock functionality
- **Input Validation** - City name validation and error handling
- **Graceful Error Handling** - User-friendly error messages

### 🎛️ Admin Dashboard
- **Modern Responsive UI** - Works on desktop, tablet, and mobile
- **User Statistics** - Total users, active/blocked counts, unique cities
- **User Management** - Block, unblock, and delete users
- **Real-time Updates** - Live data synchronization
- **Professional Design** - Modern gradient UI with smooth animations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **node-telegram-bot-api** - Telegram Bot API wrapper
- **node-cron** - Task scheduling
- **JWT** - Authentication
- **Axios** - HTTP client
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling framework
- **Context API** - State management
- **Axios** - API calls

### External APIs
- **OpenWeatherMap API** - Weather data
- **Telegram Bot API** - Bot functionality

## 📁 Project Structure

```
TelegramWeatherBot/
├── backend/
│   ├── models/
│   │   └── Admin.js
│   │   └── User.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── botRoutes.js
│   │   └── userRoutes.js
│   ├── controllers/
│   │   └── authController.js
│   │   └── userController.js
│   ├── server.js
│   └── bot.js
├── bot/
│   ├── utils/
│   │   ├── checkBlocked.js
│   └── bot.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   └── Login.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── lib/
│   │   │   └── axios.js
│   │   └── App.jsx
│   │   └── main.jsx
│   └── package.json
├── .env.example
├── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Telegram Bot Token (from @BotFather)
- OpenWeatherMap API key

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Mrinal-xx-Singha/TelegramWeatherBot.git
cd TelegramWeatherBot
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Configuration](#-configuration))

5. **Start the backend server**
```bash
npm start
```

### Frontend Setup

1. **Install frontend dependencies**
```bash
cd frontend
npm install
```

2. **Start the development server**
```bash
npm start
npm run dev
```

## ⚙️ Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/telegram-weather-bot

``env in bot directory
# Telegram Bot
BOT_TOKEN=your_telegram_bot_token_from_botfather

# Weather API
WEATHER_API_KEY=your_openweathermap_api_key

# Server
PORT=3000
BACKEND_URL=http://localhost:3000

# Bot
PORT=3001

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Cron Job Security
CRON_SECRET=your_cron_job_secret_key


### Getting API Keys

1. **Telegram Bot Token:**
   - Message @BotFather on Telegram
   - Create a new bot with `/newbot`
   - Copy the provided token

2. **OpenWeatherMap API Key:**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Go to API keys section
   - Generate a new API key

## 📖 Usage

### Starting the Bot

1. **Start the backend server:**
```bash
cd backend
npm run dev
```

2. **Start the development server
```bash
cd bot
npm run dev
```

2. **Start the frontend (Admin):**
```bash
cd frontend
npm run dev
```

3. **Open your Telegram bot and start using it!**

### Bot Workflow

1. User sends `/start` to begin
2. User sends `/subscribe` to get weather updates
3. User enters a city name
4. Bot provides current weather and subscribes user
5. User receives automated daily weather updates
6. Admin can manage users through the dashboard

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Bot
- `POST /api/bot/subscribe
- `PSOT /api/bot/check

### User Management
- `GET /api/users` - Get all users (admin only)
- `POST /api/users/block/:id` - Block user
- `POST /api/users/unblock/:id` - Unblock user
- `DELETE /api/users/:id` - Delete user

## 🤖 Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Welcome message and instructions |
| `/subscribe` | Subscribe to weather updates |
| `/unsubscribe` | Unsubscribe from weather updates |
| `{city_name}` | Get weather for specified city |

## 📱 Screenshots
![Screenshot (342)](https://github.com/user-attachments/assets/a07ee614-0a16-4c33-b544-ddd617be6a10)
![Screenshot (343)](https://github.com/user-attachments/assets/e459697f-5932-45d5-8077-ae95656de768)
![Screenshot (344)](https://github.com/user-attachments/assets/98b65047-8583-4f36-acee-b80ac2c6b6b3)



### Bot Interface
- Clean and intuitive Telegram interface
- Real-time weather updates with emojis
- User-friendly error messages

### Admin Dashboard
- Modern responsive design
- User statistics and management
- Search and filter functionality
- Mobile-friendly interface



## 🔄 Cron Job Schedule

The bot uses cron jobs for automated weather updates:

```javascript
// Every minute (for testing)
cron.schedule("* * * * *", async () => {
  // Send weather updates
});

// Daily at 8:00 AM (production)
cron.schedule("0 8 * * *", async () => {
  // Send daily weather updates
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Bot not responding:**
   - Check BOT_TOKEN in .env file
   - Ensure bot is started with node bot.js

2. **Weather not fetching:**
   - Verify WEATHER_API_KEY
   - Check OpenWeatherMap API limits

3. **Database connection failed:**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env

4. **Cron job not working:**
   - Verify BACKEND_URL and CRON_SECRET
   - Check server logs for errors

### Debug Mode

Enable debug logging:
```bash
DEBUG=telegram:* node bot.js
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mrinal Singha**
- GitHub: [@Mrinal-xx-Singha](https://github.com/Mrinal-xx-Singha)
- LinkedIn: [https://www.linkedin.com/in/mrinal-singha/]

## 🙏 Acknowledgments

- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Telegram Bot API wrapper
- [OpenWeatherMap](https://openweathermap.org/) - Weather data provider
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/Mrinal-xx-Singha/TelegramWeatherBot?style=social)
![GitHub forks](https://img.shields.io/github/forks/Mrinal-xx-Singha/TelegramWeatherBot?style=social)
![GitHub issues](https://img.shields.io/github/issues/Mrinal-xx-Singha/TelegramWeatherBot)
![GitHub license](https://img.shields.io/github/license/Mrinal-xx-Singha/TelegramWeatherBot)

---

⭐ **Don't forget to give this project a star if you found it helpful!** ⭐
