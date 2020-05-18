const express = require("express")
const router = express.Router()
const laporanKebutuhanController = require("../controllers/laporanKebutuhan")
const { apiMiddleware } = require("../config/middleware")

// Router
router.post("/api/create", apiMiddleware, laporanKebutuhanController.create)
router.post(
  "/api/findByIdPasien",
  apiMiddleware,
  laporanKebutuhanController.findByIdPasien
)
router.post("/api/findById", apiMiddleware, laporanKebutuhanController.findById)

module.exports = router
