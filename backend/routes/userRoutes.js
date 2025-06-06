const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  getUsers,
  blockUser,
  unblockUser,
  deletUser,
  subscribeUser,
} = require("../controllers/userController");

const router = express.Router();
router.get("/", verifyToken, getUsers);
router.post("/block/:id", verifyToken, blockUser);
router.post("/unblock/:id", verifyToken, unblockUser);
router.delete("/:id", verifyToken, deletUser);

// Telegram Bot route
router.post("/subscribe", subscribeUser);
module.exports = router;
