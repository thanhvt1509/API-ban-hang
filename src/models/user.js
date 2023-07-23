import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
    },
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
