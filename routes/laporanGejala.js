const express = require("express")
const router = express.Router()
const laporanGejalaController = require("../controllers/laporanGejala")
const { apiMiddleware } = require("../config/middleware")

// Router
router.post("/api/create", apiMiddleware, laporanGejalaController.create)
router.post(
  "/api/findByIdPasien",
  apiMiddleware,
  laporanGejalaController.findByIdPasien
)
router.post("/api/findById", apiMiddleware, laporanGejalaController.findById)

module.exports = router
