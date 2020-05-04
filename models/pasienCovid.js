const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const pasienCovidSchema = new mongoose.Schema({
  id_user: {
    type: ObjectId,
    ref: "user"
  },
  nama: String,
  umur: String,
  tgl_daftar: Date,
  berat_badan: String,
  tinggi_badan: String,
  jenis_kelamin: String,
  alamat: String,
  no_hp: String,
  lat: String,
  emergency: {
    type: String,
    default: "0"
  },
  long: String,
  kabupaten: String,
  provinsi: String,
  kategori: String,
  tahap: String,
  dewasa_anak: String,
  batuk: String,
  keadaan_khusus: String,
  gejala: String,
  demam: String,
  lemas: String,
  mual: String,
  pusing: String,
  sesak: String,
  dokter: {
    type: ObjectId,
    ref: "doctor"
  },
  skala: String,
  pendamping: {
    type: ObjectId,
    ref: "user",
    default: null
  },
  nama_pendamping: String,
  no_hp_pendamping: String,
  status_hidup: {
    type: String,
    default: "Hidup"
  },
  status_sembuh: {
    type: String,
    default: "Belum Sembuh"
  },
  status_lokasi: String,
  keterangan: String
})

const pasienCovid = mongoose.model("pasienCovid", pasienCovidSchema)

module.exports = pasienCovid
