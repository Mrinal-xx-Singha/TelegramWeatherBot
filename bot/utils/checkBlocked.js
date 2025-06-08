const axios = require("axios");
// Check if the user is blocked or not 
const checkBlocked = async (telegramId) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/api/users/checkBlocked`, {
      telegramId,
    });

    return res.data?.isBlocked 
  } catch (error) {
    console.error("[checkBlocked]", error.message);
    return false;
  }
};

module.exports = checkBlocked;
