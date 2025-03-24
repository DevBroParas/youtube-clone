import express from "express"
import { login, logout, me, register } from "../controllers/auth.controller.js"


const router = express.Router()


//Register user
router.post("/register", register )

//Login user
router.post("/login", login )

//Logout user
router.post("/logout", logout)

//Get current user
router.get("/me", me)

export default router
