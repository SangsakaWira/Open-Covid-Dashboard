const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema({
  lat:String,
  long:String
});

const setting = mongoose.model("setting", settingSchema);

module.exports = setting;