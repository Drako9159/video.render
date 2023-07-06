import { Router } from "express";
import uploadMiddleware from "../utils/handleMulter.js";
import {
  deleteAllVideos,
  getVideos,
  render,
} from "../controllers/video.controller.js";
const router = Router();

// upload video
router.post("/video", uploadMiddleware.single("myFile"), (req, res) => {
  res.send({ message: "ok" });
});

// delete all videos
router.delete("/video", deleteAllVideos);

router.post("/render", render);

router.get("/video", getVideos);

export default router;
