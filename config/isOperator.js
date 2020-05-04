module.exports = (req,res,next) =>{
    if(req.session.role === "2"){
        res.redirect("/page/admin")
    }else{
        res.redirect("/page/dashboard")
    }
}