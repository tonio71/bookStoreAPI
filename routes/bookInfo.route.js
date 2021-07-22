import express from "express";
import BookInfoController from "../controllers/bookInfo.controller.js";
const router = express.Router();

router.post("/", BookInfoController.createBookInfo);
router.get("/", BookInfoController.getBooksInfo);
router.get("/:id", BookInfoController.getBookInfo);
router.put("/", BookInfoController.updateBookInfo);
router.delete("/:id", BookInfoController.deleteBookInfo);

router.post("/review", BookInfoController.createAvaliacao);
router.delete("/:id/review/:index", BookInfoController.deleteAvaliacao);

export default router;
