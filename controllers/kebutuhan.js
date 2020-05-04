// router.get("/createKebutuhan",isAuth,kebutuhanController.createKebutuhan);
// router.get("/findAllKebutuhan",isAuth,kebutuhanController.findAllKebutuhan);
// router.get("/findKebutuhanById/:id",isAuth,kebutuhanController.findKebutuhanById);
// router.get("/updateKebutuhanById/:id",isAuth,kebutuhanController.updateKebutuhanById)

const kebutuhan = require("../models/kebutuhan")

exports.createKebutuhan = (req,res) =>{
    kebutuhan.create(req.body,(err,doc)=>{
        if(err) res.send({err})
        else{
            req.flash("kebutuhan","Berhasil Menambahkan")
            res.redirect("/page/kebutuhan/apd")
        }
    })
}

exports.findAllKebutuhan = (req,res) =>{
    kebutuhan.find((err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.findKebutuhanById = (req,res) =>{
    kebutuhan.findById(req.params.id,(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.updateKebutuhanById = (req,res) =>{
    kebutuhan.findByIdAndUpdate(req.params.id,{new:true},(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.findAllKebutuhanByJenis = (req,res) =>{
    kebutuhan.find({jenis:req.params.jenis},(err,doc)=>{
        res.send(doc)
    })
}