const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const settingRoutes = require("./routes/settingRoutes")
const cookieParser = require("cookie-parser")
const cors = require("cors")
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))


app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/settings",settingRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})