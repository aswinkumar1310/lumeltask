const { model, Schema } = require('mongoose');
const { ObjectId } = require('mongodb');
const constants = require('../../../utils/constants');
const productSchema = new Schema(
    {
        name: { type: String },
        catgeory: { type: String },
        quanity: { type: Number },
        price: { type: Number },
        discount: { type: Number, default: 0 },
        barcode: { type: String },
        expiryDate:{type:Date},
        isActive: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = model(constants.PRODUCTS, productSchema);