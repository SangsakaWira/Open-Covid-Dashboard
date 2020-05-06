const express = require("express")
// const isAuth = require("../config/auth");
const router = express.Router()
const userController = require("../controllers/user")
const { apiMiddleware } = require("../config/middleware")

// Auth
router.post("/login", userController.login)
router.post("/register", userController.register)
router.get("/logout", userController.logout)

router.post("createUser", userController.createUser)
router.post("/api/login", apiMiddleware, userController.apiLogin)

module.exports = router
