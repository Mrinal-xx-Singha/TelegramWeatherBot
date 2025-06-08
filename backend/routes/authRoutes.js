const express = require("express")
const { login, register, logout, checkSelf } = require("../controllers/authController")
const router = express.Router()

router.post("/register",register)
router.get("/checkSelf",checkSelf)

router.post("/login",login)
router.post("/logout",logout)

module.exports= router