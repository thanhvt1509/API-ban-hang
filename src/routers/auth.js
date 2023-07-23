import express from "express";
import { signup, signin } from "../controllers/auth";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
// router.get("/getUser/:id", getUser)

export default router;
