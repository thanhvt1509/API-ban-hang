import Order from "../models/order";
import User from "../models/user";
import { orderSchema } from "../schemas/order";

// lấy tất cả hóa đơn ra ở phía admin
export const getAll = async (req, res) => {
    // req.query._sort => price
    const {
        _page = 1,
        _limit = 10,
        _sort = "createAt",
        _order = "asc",
    } = req.query;
    const optinos = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? "-1" : "1",
        },
    };
    try {
        const { docs: orders } = await Order.paginate({}, optinos);
        if (!orders) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

// lấy tất cả hóa đơn của 1 user ra
export const getByUser = async (req, res) => {
    try {
        const user = await User.find({ userId: req.params.id })
        if (!user) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        const orders = await Order.find({ userId: user._id })
        return res.status(200).json({
            message: "Order found successfully",
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}

// lấy hóa đơn ra theo id của hóa đơn
export const get = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "userId",
            "orders"
        );
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json({
            message: "Order found successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

// thêm hóa đơn tức là khi khách hàng mua hàng
export const create = async (req, res) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            });
        }
        const order = await Order.create(req.body);
        if (!order) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        await User.findByIdAndUpdate(order.userId, {
            $addToSet: {
                orders: order._id,
            },
        });
        return res.status(200).json({
            message: "Product created successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
// export const remove = async (req, res) => {
//     try {
//         const product = await Product.findOneAndDelete({ _id: req.params.id });
//         return res.status(200).json({
//             message: "Product delete successfully",
//             data: product,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error,
//         });
//     }
// };

// thay đổi trạng thái của đơn hàng ở cả bên user và bên admin
export const update = async (req, res) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) {
            res.json({
                message: error.details[0].message,
            });
        }
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        return res.status(200).json({
            message: "Order updated successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
