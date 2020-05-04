const rumahSakit = require("../models/rumah_sakit")

exports.createRumahSakit = (req, res) => {
    rumahSakit.create(req.body, (err, doc) => {
        if (err) res.send({ err })
        else {
            res.redirect("/page/rumahSakit-mdr-page")
        }
    })
}

exports.findAllRumahSakit = (req, res) => {
    rumahSakit.find((err, doc) => {
        if (err) res.send({ err })
        else {
            res.send(doc)
        }
    })
}

exports.findRumahSakitById = (req, res) => {
    rumahSakit.findById({_id:req.params.id},(err, doc) => {
        if (err) res.send({ err })
        else {
            res.send(doc)
        }
    })
}

exports.updateRumahSakitById = (req, res) => {
    rumahSakit.findByIdAndUpdate(req.body._id,{
        ...req.body
    },{ new: true }, (err, doc) => {
        if (err) res.send({ err })
        else {
            res.redirect("/page/rumahSakit-mdr-page")
        }
    })
}

exports.deleteRumahSakitById = (req,res) =>{
    rumahSakit.deleteOne({_id:req.body.id},(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}