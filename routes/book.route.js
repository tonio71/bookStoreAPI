import express from "express";
import security from "../security/functions.security.js"

import BookController from "../controllers/book.controller.js";
const router = express.Router();

router.post("/",security.authorize('admin'), BookController.createBook);
router.get("/", security.authorize('admin','vendedor'), BookController.getBooks);
router.get("/:id", security.authorize('admin','vendedor'), BookController.getBook);
router.delete("/:id", security.authorize('admin'), BookController.deleteBook);
router.put("/", security.authorize('admin'), BookController.updateBook);

export default router;
