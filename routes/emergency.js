const express = require("express");
const isAuth = require("../config/auth");
const isOperator = require("../config/isOperator");
const router = express.Router();
const EmergencyController = require("../controllers/emergency");

// Router
router.post("/createEmergency",EmergencyController.createEmergency);
router.get("/findAllEmergency",EmergencyController.findAllEmergency);
router.get("/findEmergencyById/:id",EmergencyController.findEmergencyById);
router.post("/updateEmergencyById",EmergencyController.updateEmergencyById)
router.get("/findAllEmergencyByJenis/:jenis",EmergencyController.findAllEmergencyByJenis)
router.post("/deleteEmergencyById",EmergencyController.deleteEmergencyById)

module.exports = router;