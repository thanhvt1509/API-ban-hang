import joi from "joi";
export const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required().min(0),
  description_long: joi.string().required(),
  images: joi.array().required(),
  categoryId: joi.string().required(),
  createdAt: joi.date().default(() => new Date()),
  updatedAt: joi.date().default(() => new Date()),
  deletedAt: joi.date().default(null),
  deleted: joi.boolean().default(false),
});
