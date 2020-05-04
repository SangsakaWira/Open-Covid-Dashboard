const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "1",
    required: true
  }
})

const user = mongoose.model("user", userSchema)

module.exports = user
