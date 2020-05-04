const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
  tgl:Date,
  status:{
      type:String,
      default:"Open"
  },
  msg:String
});

const notification = mongoose.model("notification", notificationSchema);

module.exports = notification;