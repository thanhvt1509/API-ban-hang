import joi from "joi";
export const orderDetailSchema = joi.object({
    orderId: joi.string().required(),
    productId: joi.string().required(),
    price: joi.number().required().min(0),
    quantity: joi.number().required().min(0),
    totalMoney: joi.number().required().min(0),
});
