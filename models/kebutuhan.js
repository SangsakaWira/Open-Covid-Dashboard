const mongoose = require("mongoose")

const kebutuhanSchema = new mongoose.Schema({
    lembaga:{
        type:String,
        required:true
    },
    nama:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    jenis:{
        type:String,
        required:true
    },
    jumlah:{
        type:String,
        required:true
    },
    no_hp:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    long:{
        type:String,
        required:true
    },
    penjelasan:{
        type:String
    },
    status:{
        type:String,
        default:"0 "
    },
    alamat:String
});

const kebutuhan = mongoose.model("kebutuhan", kebutuhanSchema);

module.exports = kebutuhan;