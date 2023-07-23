import User from "../models/user";
import { signupSchema, signinSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    // validate đầu vào
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors,
      });
    }
    // Kiểm tra xem trong db có tài khoản này chưa
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        messages: "Email đã tồn tại",
      });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Thêm tài khoản vào db
    const user = await User.create({ ...req.body, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, "banThayDat", { expiresIn: "1d" });

    user.password = undefined;
    return res.status(200).json({
      message: "Tạo tài khoản thành công",
      user,
    });
  } catch (error) { }
};
// B1: Kiểm tra thông tin req.body có hợp lệ hay không
// B2: Kiểm tra email đã tồn tại hay chưa?
// B2.1: Mã hóa mật khẩu trước khi tạo user mới
// B3: Tạo user mới
// B4: Tạo token mới chứa id của user
// B5: Trả về client

export const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors,
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        messages: "Email không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        messages: "Sai mật khẩu",
      });
    }

    const token = jwt.sign({ id: user._id }, "banThayDat", { expiresIn: "1d" });

    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) { }
};
// Đăng nhập
// B1: Kiểm tra thông tin req.body có hợp lệ hay không
// B2: Kiểm tra email đã tồn tại hay chưa?
// B2.1: So sánh password client với password trong db
// B3: Tạo token mới chứa id của user
// B4: Trả về client

// export const getUser = async (rep, res) => {
//   try {
//     const user = await User.findById(req.params.id).populate(
//       "orders"
//     );
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//     // const products = await Product.find({ categoryId: req.params.id });
//     return res.status(200).json({
//       user,
//       // ...category.toObject(),
//       // products,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// }