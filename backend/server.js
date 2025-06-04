const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(express.json())

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))


app.get("/",(req,res)=>{
    res.send("API is running...")

})


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})