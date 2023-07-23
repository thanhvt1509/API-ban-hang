import OrderDetail from "../models/order_detail";
import Order from "../models/order";
import Product from "../models/product";
import { orderDetailSchema } from "../schemas/order_detail";

// lấy tất cả những chi tiết hóa đơn của 1 hóa đơn ra
export const getOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.find({ orderId: req.params.id }).populate(
            "productId"
        );
        if (!orderDetail) {
            return res.status(404).json({
                message: "orderDetail not found",
            });
        }
        // const [{ productId }] = orderDetail
        // const products = await Product.findOne({ _id: productId })
        // console.log(products);
        return res.status(200).json({
            message: "Order found successfully",
            data: {
                orderDetail,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}

// thêm chi tiết hóa đơn
export const create = async (req, res) => {
    try {
        const { error } = orderDetailSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            });
        }
        const orderDetail = await OrderDetail.create(req.body);
        if (!orderDetail) {
            return res.status(404).json({
                message: "OrderDetail not found",
            });
        }
        await Order.findByIdAndUpdate(orderDetail.orderId, {
            $addToSet: {
                orderDetail: orderDetail._id,
            },
        });
        await Product.findByIdAndUpdate(orderDetail.productId, {
            $addToSet: {
                orderDetail: orderDetail._id,
            },
        });
        return res.status(200).json({
            message: "Product created successfully",
            data: orderDetail,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};


