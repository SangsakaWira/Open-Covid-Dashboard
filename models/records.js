const mongoose = require("mongoose")

const recordSchema = new mongoose.Schema({
  time:Date,
  status:{
      type:String,
      default:"Belum Minum"
  },
  id_pasien:String,
  pasien_name:String,
  pmo:String,
  no_hp:String,
  no_hp_pmo:String,
  dokter:String
});

const record = mongoose.model("record", recordSchema);

module.exports = record;