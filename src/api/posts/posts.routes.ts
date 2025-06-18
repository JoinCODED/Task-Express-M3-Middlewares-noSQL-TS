import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "./posts.controller";
import upload from "./middlewares/multer";
// import { validatePost } from "./middlewares/validatePost";
// import { validateResult } from "./middlewares/validateResult";

const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single("image"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
