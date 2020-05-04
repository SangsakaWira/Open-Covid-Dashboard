const express = require("express");
const isAuth = require("../config/auth");
const isOperator = require("../config/isOperator");
const router = express.Router();
const RumahSakitController = require("../controllers/rumah_sakit");

// Router
router.post("/createRumahSakit",RumahSakitController.createRumahSakit);
router.get("/findAllRumahSakit",RumahSakitController.findAllRumahSakit);
router.get("/findRumahSakitById/:id",RumahSakitController.findRumahSakitById);
router.post("/updateRumahSakitById",RumahSakitController.updateRumahSakitById)
router.post("/deleteRumahSakitById",RumahSakitController.deleteRumahSakitById)

module.exports = router;