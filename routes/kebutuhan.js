const express = require("express");
const isAuth = require("../config/auth");
const isOperator = require("../config/isOperator");
const router = express.Router();
const kebutuhanController = require("../controllers/kebutuhan");

// Router
router.post("/createKebutuhan",kebutuhanController.createKebutuhan);
router.get("/findAllKebutuhan",kebutuhanController.findAllKebutuhan);
router.get("/findKebutuhanById/:id",kebutuhanController.findKebutuhanById);
router.post("/updateKebutuhanById",kebutuhanController.updateKebutuhanById)
router.get("/findAllKebutuhanByJenis/:jenis",kebutuhanController.findAllKebutuhanByJenis);

module.exports = router;