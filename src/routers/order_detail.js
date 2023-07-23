import express from "express";
import { create } from "../controllers/order_detail";
// import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

// router.get("/order_details", getAll);
// router.get("/order_details/:id", get);
router.post("/order_details", create);
// router.delete("/order_details/:id", checkPermission, remove);
// router.patch("/order_details/:id", update);

export default router;
