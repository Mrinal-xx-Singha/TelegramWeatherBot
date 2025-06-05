const mongoose = require("mongoose")
const settingSchema = new mongoose.Schema({
    weatherApiKey:{type:String,required:true},
},{
    timestamps:true
})


module.exports = mongoose.model("Setting",settingSchema)