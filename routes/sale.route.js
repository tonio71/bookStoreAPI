import express from "express";
import security from "../security/functions.security.js"

import SaleController from "../controllers/sale.controller.js";
const router = express.Router();

router.post("/",  security.authorize('admin','vendedor'), SaleController.createSale);
router.get("/", security.authorize('admin'), SaleController.getSales);
router.get("/:id",security.authorize('admin'), SaleController.getSale);
router.delete("/:id",security.authorize('admin'), SaleController.deleteSale);
router.put("/",security.authorize('admin'), SaleController.updateSale);

export default router;
