import Product from "../models/product";
import Category from "../models/category";

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    // const products = await Product.find({ categoryId: req.params.id });
    return res.status(200).json({
      category,
      // ...category.toObject(),
      // products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category) {
      return res.status(404).json({
        message: "Category not created",
      });
    }
    return res.status(200).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "Category delete successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
