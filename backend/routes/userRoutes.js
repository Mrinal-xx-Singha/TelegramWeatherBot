const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser,
  subscribeUser,
  checkBlocked,
} = require("../controllers/userController");

const router = express.Router();
router.post("/subscribe",subscribeUser)
router.post("/check",checkBlocked)
router.get("/", verifyToken, getUsers);
router.post("/block/:id", verifyToken, blockUser);
router.post("/unblock/:id", verifyToken, unblockUser);
router.delete("/:id", verifyToken, deleteUser);

// Telegram Bot route
router.post("/subscribe", subscribeUser);
module.exports = router;
