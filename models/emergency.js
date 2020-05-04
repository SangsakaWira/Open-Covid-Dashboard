const mongoose = require("mongoose")

const emergencySchema = new mongoose.Schema({
    pj:{
        type:String,
        required:true
    },
    tgl:Date,
    nama:{
        type:String,
        required:true
    },
    no_hp:{
        type:String,
        required:true
    },
    keterangan:{
        type:String
    },
    lat:{
        type:String,
        required:true
    },
    long:{
        type:String,
        required:true
    },
    alamat:String
});

const emergency = mongoose.model("emergency", emergencySchema);

module.exports = emergency;