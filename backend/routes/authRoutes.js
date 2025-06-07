const express = require("express")
const { login, register, logout, check } = require("../controllers/authController")
const router = express.Router()

router.post("/register",register)
router.get("/check",check)

router.post("/login",login)
router.post("/logout",logout)

module.exports= router