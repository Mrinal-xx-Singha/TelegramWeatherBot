const User = require("../models/User");

//* @desc Get all users
//* @route GET /api/users

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("[UserController.getUsers]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//* @desc Block a user by ID
//* @route POST /api/users/block/:id

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isBlocked: true });
    res.json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("[UserController.blockUser]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//* @desc Unblock a user
//* @route POST /api/suers/unblock/:id
exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isBlocked: false });
    res.status(200).json({ message: "User unblocked" });
  } catch (error) {
    console.error("[unblockUser]", error);
    res.status(500).json({ message: "Failed to unblock user" });
  }
};

//* @desc Delete a user
//* @route DELETE /api/users/:id
exports.deletUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
    if(!user){
      return res.status(401).json({message:`User with Id ${id} not found.`})
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted! " });
  } catch (error) {
    console.error("[deleteUser]", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

//* @desc  Called by bot to register or update a user
//* @route POST /api/users/subscribe

exports.subscribeUser = async (req, res) => {
  try {
    const { telegramId, username, city } = req.body;
    if (!telegramId || !city || !username) {
      return res.status(400).json({ message: "Missing fields" });
    }
    let user = await User.findOne({ telegramId });

  
    if (!user) {
      user = new User({
        telegramId,
        username,
        city,
        isSubscribed: true,
      });
    } else {
      user.city = city;
      user.isSubscribed = true;
    }
    await user.save();
    res.status(200).json({ message: "User subscribed" });
  } catch (error) {
    console.error("[subscribeUser]", error);
    res.status(500).json({ message: "Failed to subscribe user" });
  }
};
