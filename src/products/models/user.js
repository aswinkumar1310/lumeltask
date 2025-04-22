const { model, Schema } = require('mongoose');
const { ObjectId } = require('mongodb');
const constants = require('../../../utils/constants');
const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        countryCode: { type: String },
        phoneNumber: {
            type: String,
            required: false,
        },
        address: { type: String },
        city: {
            type: String
        },
        region: {
            type: String
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

module.exports = model(constants.User, userSchema);