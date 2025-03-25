import express from 'express'
import { protect} from "../middleware/auth"
import { GetRecomVideos, GetTrendVideos, GetVideoById } from '../controllers/video.controller'


const router = express.Router()




// Get recommended videos (HOME PAGE)
router.get("/", GetRecomVideos)

//Get trending videos
router.get("/trending", GetTrendVideos)

//Get video by id
router.get("/:videoId", GetVideoById)

//Upload a video
router.post("/",protect,,)

//Add Like/Dislike to video
router.post("/:videoId/like",protect,)


//Add comment to video
router.post("/:videoId/comments",protect,)

//Get comments for a video
router.get("/:videoId/comments")

export default router
