import express from "express";
import { protect } from "../middleware/auth.js";
import { uploadAvatar } from "../utils/multer.js";
import {
  GetLikedVideos,
  GetSubscribedChannels,
  GetUserProfile,
  SubscribeToChannel,
  UnsubscribeFromChannel,
  UpdateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

//Update user profile
router.put(
  "/profile",
  protect,
  uploadAvatar.single({ name: "avatar", maxCount: 1 }),
  UpdateUserProfile
);

//Get liked videos
router.get("/liked-videos", protect, GetLikedVideos);

//Get subscribed channels
router.get("/subscriptions", protect, GetSubscribedChannels);

//Get user profile
router.get("/:userId", GetUserProfile);

//Subscribe to a channel
router.post("/:userId/subscribe", protect, SubscribeToChannel);

//Unsubscribe from a channel
router.delete("/:userId/unsubscribe", protect, UnsubscribeFromChannel);

export default router;
  