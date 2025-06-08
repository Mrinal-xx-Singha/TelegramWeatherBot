const express =require("express")
const {subscribeUser,checkBlocked} = require("../controllers/userController")


const router = express.Router()

router.post("/subscribe", subscribeUser);
router.post("/check",checkBlocked)

module.exports = router