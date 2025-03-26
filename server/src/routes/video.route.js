import express from 'express'
import { protect} from "../middleware/auth.js"
import { AddComment, AddLike, GetComment, GetRecomVideos, GetTrendVideos, GetVideoById, UploadVideo } from '../controllers/video.controller.js'
import upload from "../middleware/multer.js"


const router = express.Router()




// Get recommended videos (HOME PAGE)
router.get("/", GetRecomVideos)

//Get trending videos
router.get("/trending", GetTrendVideos)

//Get video by id
router.get("/:videoId", GetVideoById)

//Upload a video
router.post("/",protect,upload.fields([    { name: 'video', maxCount: 1 },    { name: 'thumbnail', maxCount: 1 }  ]),UploadVideo)

//Add Like/Dislike to video
router.post("/:videoId/like",protect,AddLike)


//Add comment to video
router.post("/:videoId/comments",protect,AddComment)

//Get comments for a video
router.get("/:videoId/comments",GetComment)

export default router
