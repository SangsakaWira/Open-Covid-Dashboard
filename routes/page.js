const express = require("express");
const isAuth = require("../config/auth");
const router = express.Router();
const pageControllers = require("../controllers/page");

// Auth Pages
router.get("/login-page", pageControllers.loginPage);
router.get("/register-page", pageControllers.registerPage);
router.get("/password-page",pageControllers.passwordRecovery)

// Dashboard
router.get("/covid-19",isAuth,pageControllers.covidPage)

// Emergency
router.get("/emergency",isAuth,pageControllers.emergencyPage)
router.get("/tambah-emergency-page",isAuth,pageControllers.tambahEmergencyPage)

// Pasien
router.get("/pasien-covid-page",isAuth,pageControllers.pasienCovidPage)
router.get("/tambah-covid-page",isAuth,pageControllers.tambahPasienCovidPage)

// Detail Pasien
router.get("/covid-pasien-detail-page/:id",isAuth,pageControllers.pasienCovidDetailPage)

// Edit
router.get("/edit-pasien-covid-page/:id",isAuth,pageControllers.editPasienCOVID)
router.get("/edit-settings-page",isAuth,pageControllers.editSettings)

// Record Pasien
router.get("/lokasi-page",isAuth,pageControllers.lokasiPage)
router.get("/track-record-page",isAuth,pageControllers.trackRecordPage)

module.exports = router;