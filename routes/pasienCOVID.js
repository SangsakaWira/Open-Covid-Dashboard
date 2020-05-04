const express = require("express")
const multer = require("multer")
const isAuth = require("../config/auth")
const isOperator = require("../config/isOperator")
const router = express.Router()
const pasienController = require("../controllers/pasienCOVID")
const upload = multer()

// Router
router.post("/createPasien", upload.single(), pasienController.createPasien)
router.get("/findAllPasien", pasienController.findAllPasien)
router.get("/findPasienById/:id", pasienController.findPasienById)
router.post("/updatePasienById", pasienController.updatePasienById)
router.get(
  "/findAllPasienByJenis/:jenis",
  pasienController.findAllPasienByJenis
)
router.post("/deletePasienById", pasienController.deletePasienById)

// Router FindWithFilter
router.get("/findAllPasienSembuh", pasienController.findAllPasienSembuh)
router.get("/findAllPasienMeninggal", pasienController.findAllPasienMeninggal)
router.get("/findAllPasienPositif", pasienController.findAllPasienPositif)
router.get("/findAllPasienPDP", pasienController.findAllPasienPDP)
router.get("/findAllPasienODP", pasienController.findAllPasienODP)
router.get("/findAllPasienOTG", pasienController.findAllPasienOTG)

// Find Pasien Global
router.get("/findAllPasienGlobal", pasienController.findAllPasienGlobal)
router.post("/updatePasienGlobal", pasienController.updateAllPasienGlobal)
router.post("/createAllPasienGlobal", pasienController.createAllPasienGlobal)

module.exports = router
