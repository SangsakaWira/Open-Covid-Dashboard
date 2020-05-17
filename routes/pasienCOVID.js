const express = require("express")
const multer = require("multer")
const isAuth = require("../config/auth")
const isOperator = require("../config/isOperator")
const router = express.Router()
const pasienController = require("../controllers/pasienCOVID")
const { apiMiddleware } = require("../config/middleware")
const upload = multer()

// Router
router.post("/createPasien", upload.single(), pasienController.createPasien)
router.post("/updatePasienById", pasienController.updatePasienById)

// API routes
router.get("/api/findAllPasien", apiMiddleware, pasienController.findAllPasien)
router.get(
  "/api/findPasienById/:id",
  apiMiddleware,
  pasienController.findPasienById
)
router.get(
  "/api/findAllPasienByJenis/:jenis",
  apiMiddleware,
  pasienController.findAllPasienByJenis
)
router.post(
  "/api/deletePasienById",
  apiMiddleware,
  pasienController.deletePasienById
)
router.post(
  "/api/updatePasienById",
  apiMiddleware,
  pasienController.apiUpdatePasienById
)

// Router FindWithFilter
router.get(
  "/api/findAllPasienSembuh",
  apiMiddleware,
  pasienController.findAllPasienSembuh
)
router.get(
  "/api/findAllPasienMeninggal",
  apiMiddleware,
  pasienController.findAllPasienMeninggal
)
router.get(
  "/api/findAllPasienPositif",
  apiMiddleware,
  pasienController.findAllPasienPositif
)
router.get(
  "/api/findAllPasienPDP",
  apiMiddleware,
  pasienController.findAllPasienPDP
)
router.get(
  "/api/findAllPasienODP",
  apiMiddleware,
  pasienController.findAllPasienODP
)
router.get(
  "/api/findAllPasienOTG",
  apiMiddleware,
  pasienController.findAllPasienOTG
)

// Find Pasien Global
router.get("/findAllPasienGlobal", pasienController.findAllPasienGlobal)
router.post("/updatePasienGlobal", pasienController.updateAllPasienGlobal)
router.post("/createAllPasienGlobal", pasienController.createAllPasienGlobal)

module.exports = router
