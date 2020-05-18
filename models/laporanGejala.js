const moment = require("moment-timezone")
const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const laporanGejalaSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now
  },
  id_pasien: {
    type: ObjectId,
    ref: "pasienCovid"
  },
  batuk: String,
  demam: String,
  lemas: String,
  mual: String,
  pusing: String,
  sesak: String
})

const laporanGejala = mongoose.model("laporanGejala", laporanGejalaSchema)

module.exports = laporanGejala
