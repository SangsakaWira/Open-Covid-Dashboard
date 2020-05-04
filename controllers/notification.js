const records = require("../models/records")

// router.post("/createRecord",isAuth,pasienController.createRecord);
// router.get("/findAllRecord",isAuth,pasienController.findAllRecord);
// router.get("/findRecordById/:id",isAuth,pasienController.findRecordById);
// router.post("/updateRecordById",isAuth,pasienController.updateRecordById)
// router.get("/findAllRecordByDate/:date",isAuth,pasienController.findAllRecordByDate);

exports.createRecord = (req,res) =>{
    records.create(req.body,(err,doc)=>{
        if(err) res.send({err})
        else{
            req.flash("kebutuhan","Berhasil Menambahkan")
            res.redirect("/page/kebutuhan/apd")
        }
    })
}

exports.findAllRecord = (req,res) =>{
    records.find((err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.findRecordById = (req,res) =>{
    records.findById(req.params.id,(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.updateRecordById = (req,res) =>{
    records.findById(req.params.id,(err,doc)=>{
        if(err) res.send({err})
        else{
            res.send({
                msg:"Success",
                doc:doc
            })
        }
    })
}

exports.findAllRecordByDate = (req,res) =>{
    records.findByIdAndUpdate(req.params.id,{new:true},(err,doc)=>{
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
    records.find({jenis:req.params.jenis},(err,doc)=>{
        res.send(doc)
    })
}

exports.findAllRecordByNow = (req,res) =>{
    let current_day = new Date().getDate()
    let current_month = new Date().getMonth()
    let current_year = new Date().getFullYear()
    let date = new Date().toLocaleDateString()
    console.log(date)
    records.find({status:req.params.status,time:date},(err,doc)=>{
        res.send(doc)
    })
}