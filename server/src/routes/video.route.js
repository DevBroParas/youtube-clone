import express from 'express'
import { protect } from "../middleware/auth.js"
import { AddComment, AddLike, GetComment, GetLikeStatus, GetRecomVideos, GetRelatedVideos, GetTrendVideos, GetVideoById, searchVideos, UploadVideo } from '../controllers/video.controller.js'
import { uploadMedia } from '../utils/multer.js'

const router = express.Router()

// Get recommended videos (HOME PAGE)
router.get("/", GetRecomVideos)



//Search videos
router.get("/search", async (req, res, next) => {
    console.log("✅ /search route hit");

    try {
        await searchVideos(req, res, next);
    } catch (error) {
        console.error("❌ Error calling searchVideos:", error);
        next(error);
    }
});

//Get trending videos
router.get("/trending", GetTrendVideos)

//Get video by id
router.get("/:videoId", GetVideoById)

//Upload a video
router.post("/", protect, uploadMedia.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), UploadVideo)

//Add Like/Dislike to video
router.post("/:videoId/like",protect, AddLike)

//Get video like status
router.get("/:videoId/like-status", protect, GetLikeStatus);

//Add comment to video
router.post("/:videoId/comments", protect, AddComment)

//Get comments for a video
router.get("/:videoId/comments", GetComment)

// Get related videos
router.get("/:videoId/related", GetRelatedVideos);


export default router
