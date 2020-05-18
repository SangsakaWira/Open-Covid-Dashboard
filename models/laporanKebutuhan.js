const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const laporanKebutuhanSchema = new mongoose.Schema({
  time: {
    type: Date,
    default: Date.now
  },
  id_pasien: {
    type: ObjectId,
    ref: "pasienCovid"
  },
  jenis_kebutuhan: String,
  keterangan: String
})

const laporanKebutuhan = mongoose.model(
  "laporanKebutuhan",
  laporanKebutuhanSchema
)

module.exports = laporanKebutuhan
