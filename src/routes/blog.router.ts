import { Router } from "express";
import {
  createBlogController,
  getBlogsController,
} from "../controllers/blog.controller";
import { uplouder } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";
import { validateCreateBlog } from "../validators/blog.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getBlogsController);
router.post(
  "/",
  verifyToken,
  uplouder().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  validateCreateBlog,
  createBlogController
);

export default router;
