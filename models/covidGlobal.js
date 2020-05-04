const mongoose = require("mongoose")

const globalCovidSchema = new mongoose.Schema({
  positif:String,
  pdp:String,
  odp:String,
  otg:String,
  sembuh:String,
  meninggal:String,
  lokasi:String,
  level:String,
  tgl:Date
});

const globalCovid = mongoose.model("globalCovid", globalCovidSchema);

module.exports = globalCovid;