const { model, Schema } = require('mongoose');
const constants = require('../../../utils/constants');
const activitySchema = new Schema(
    {
        "orderId": { type: Number, },
        "productId": { type: String },
        "customerId": { type: String },
        "productName": { type: String },
        "category": { type: String },
        "region": { type: String },
        "dateofSale": { type: Date },
        "quantitySold": { type: Number, },
        "unitPrice": { type: Number, },
        "discount": { type: Number, },
        "shippingCost": { type: Number, },
        "paymentMethod": { type: String },
        "customerName": { type: String },
        "customerEmail": { type: String },
        "customerAddress": { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = model(constants.SALESACTIVITY, activitySchema);


