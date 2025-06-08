const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = (req, res, next) => {

  // Allowing cron jobs via secret header
  const cronSecret = req.headers['x-cron-secret']

  if(cronSecret && cronSecret === process.env.CRON_SECRET){
    return next()
  }
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized -Invalid Token" });
    }
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
