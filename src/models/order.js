import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(

    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        note: {
            type: String,
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: Number,
            required: true
        },
        totalMoney: {
            type: Number,
            required: true
        },
        orderDetail: [{ type: mongoose.Types.ObjectId, ref: "OrderDetail" }],
    },
    { timestamps: true, versionKey: false }
);

orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
