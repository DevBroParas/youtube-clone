import express from "express"
import { register } from "../controllers/auth.controller.js"


const router = express.Router()


//Register user
router.post("/register", register )

// //Login user
// router.post("/login", )

// //Logout user
// router.get("/logout", )

export default router
