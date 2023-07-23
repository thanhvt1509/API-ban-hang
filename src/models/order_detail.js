import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderDetailSchema = new mongoose.Schema(

    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalMoney: {
            type: Number,
            required: true
        },
    },
    { timestamps: true, versionKey: false }
);

orderDetailSchema.plugin(mongoosePaginate);

export default mongoose.model("OrderDetail", orderDetailSchema);
