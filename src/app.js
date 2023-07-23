import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import authRouter from "./routers/auth";
import orderRouter from "./routers/order";
import orderDetailRouter from "./routers/order_detail";

const app = express();
// middleware
app.use(express.json());
app.use(cors());
// router
// api sản phẩm
app.use("/api", productRouter);

// api danh mục sản phẩm
app.use("/api", categoryRouter);

// api tài khoản
app.use("/api", authRouter);

// api về hóa đơn
app.use("/api", orderRouter);

// api về chi tiết hóa đơn
app.use("/api", orderDetailRouter);

// server
mongoose.connect("mongodb://127.0.0.1:27017/we17307");
export const viteNodeApp = app;
