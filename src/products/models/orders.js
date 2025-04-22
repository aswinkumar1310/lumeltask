const { model, Schema } = require('mongoose');
const constants = require('../../../utils/constants');
const orderSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: constants.USER, required: true },
        quantity: { type: Number, },
        priceAtSale: { type: Number, },
        orderType: { type: String, enum: ['online', 'in_store'], default: 'in_store' },
        status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: constants.PRODUCTS, required: true }
        }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = model(constants.ORDERS, orderSchema);