import express from "express";
import { create, get, getAll, getByUser, update } from "../controllers/order";
// import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/orders", getAll);
router.get("/orders/:id", get);
router.get("/user_orders/:id", getByUser);
router.post("/orders", create);
// router.delete("/orders/:id", checkPermission, remove);
router.patch("/orders/:id", update);

export default router;
