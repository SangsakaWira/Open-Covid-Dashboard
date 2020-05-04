const emergency = require("../models/emergency")

// router.post("/createEmergency",EmergencyController.createEmergency);
// router.get("/findAllEmergency",EmergencyController.findAllEmergency);
// router.get("/findEmergencyById/:id",EmergencyController.findEmergencyById);
// router.post("/updateEmergencyById",EmergencyController.updateEmergencyById)
// router.get("/findAllEmergencyByJenis/:jenis",EmergencyController.findAllEmergencyByJenis);

exports.createEmergency = (req,res) =>{
    emergency.create(req.body,(err,doc)=>{
        if(err) res.send({err})
        else{
            req.flash("emergency","Berhasil ditambahkan")
            res.redirect("/page/emergency")
        }
    })
}

exports.findAllEmergency = (req,res) =>{
    emergency.find((err,doc)=>{
        if(err) res.send({err})
        else{
            res.send(doc)
        }
    })
}

exports.findEmergencyById = (req,res) =>{
    emergency.findById(req.params.id,(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.updateEmergencyById = (req,res) =>{
    emergency.findById(req.params.id,(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.findAllEmergencyByJenis = (req,res) =>{
    emergency.findByIdAndUpdate(req.params.id,{new:true},(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.deleteEmergencyById = (req,res) =>{
    emergency.deleteOne({_id:req.body.id},(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}