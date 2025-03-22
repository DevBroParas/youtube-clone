import express from 'express'
import { protect} from "../middleware/auth"

const router = express.Router()

// Get recommended videos (HOME PAGE)
router.get("/", )

//Get trending videos
router.get("/trending",)

//Upload a video
router.post("/",protect,,)

//Add Like/Dislike to video
router.post("/:videoId/like",protect,)


//Add comment to video
router.post("/:videoId/comments",protect,)

//Get comments for a video
router.get("/:videoId/comments")

export default router
