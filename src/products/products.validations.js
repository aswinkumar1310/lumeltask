const Joi = require('joi');

const bulkSalesValidate = Joi.object({
    activity: Joi.array()
        .items({
            orderId: Joi.number().integer().label("Order Id").required(),
            productId: Joi.string().label("Product Id").required(),
            customerId: Joi.string().label("Customer Id").required(),
            productName: Joi.string().label("Product Name").required(),
            category: Joi.string().label("Category").required(),
            region: Joi.string().label("Region").required(),
            dateofSale: Joi.date().label("Date of Sale").required(),
            quantitySold: Joi.number().label("Quantity Sold").integer().required(),
            unitPrice: Joi.number().label("Unit Price").required(),
            discount: Joi.number().label("Discount").required(),
            shippingCost: Joi.number().label("Shipping Cost").required(),
            paymentMethod: Joi.string().label("Payment Method").valid('Credit Card', 'Debit Card', 'PayPal', 'Cash').required(),
            customerName: Joi.string().label("Customer Name").required(),
            customerEmail: Joi.string().label("Customer Email").email().required(),
            customerAddress: Joi.string().label("Customer Address").required()
        }).min(1).required(),
}).options({ abortEarly: false });


const revenue = Joi.object({
    query: Joi.object({
        startDate: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{1,2}$/)
            .message('Date must be in yyyy-mm-d format (e.g., 2023-12-5)'),
        endDate: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{1,2}$/)
            .message('Date must be in yyyy-mm-d format (e.g., 2023-12-5)'),
        productId: Joi.string().optional(),
        category: Joi.string().optional(),
        region: Joi.string().optional(),
    })
}).unknown(true);
module.exports = {
    bulkSalesValidate,
    revenue
}