const axios = require("axios");

const checkBlocked = async (telegramId) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_URL}/api/users/check`, {
      telegramId,
    });

    return res.data?.isBlocked ?? false;
  } catch (error) {
    console.error("[checkBlocked]", error.message);
    return false;
  }
};

module.exports = checkBlocked;
