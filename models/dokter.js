const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const dokterSchema = new mongoose.Schema({
  id_user: {
    type: ObjectId,
    ref: "user"
  },
  nama_lengkap: String
})

const dokter = mongoose.model("doctor", dokterSchema)

module.exports = dokter
