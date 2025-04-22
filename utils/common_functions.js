const jwt = require('jsonwebtoken');
const config = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs');
const constants = require('./constants');
//function for success response
//function for error response
function sendResponse(res, status, statusCode, message, data) {
    return res.status(statusCode).json({ status, statusCode, message: message, data: data });
}
function errorHandler(err, res) {
    const response = {
        code: err.statusCode,
        message: err.message,
    };
    if (!response.code) {
        response.code = 400;
    }
    console.log(err)
    return res
        .status(response.code)
        .json({ message: 'Oops,something went wrong', error: ' ' + err });
}

// function convertData(data) {
//     const CHUNK_SIZE = 1000000;

//     for(const)
//     return data.map(item => ({
//         orderId: Number(item['Order ID']),
//         productId: item['Product ID'],
//         customerId: item['Customer ID'],
//         productName: item['Product Name'],
//         category: item['Category'],
//         region: item['Region'],
//         dateofSale: new Date(item['Date of Sale']).toISOString(), // Convert to ISO string format
//         quantitySold: Number(item['Quantity Sold']),
//         unitPrice: parseFloat(item['Unit Price']),
//         discount: parseFloat(item['Discount']),
//         shippingCost: parseFloat(item['Shipping Cost']),
//         paymentMethod: item['Payment Method'],
//         customerName: item['Customer Name'],
//         customerEmail: item['Customer Email'],
//         customerAddress: item['Customer Address']
//     }));
// }

// Function to convert data
function convertData(data) {
    return data.map(item => ({
        orderId: Number(item['Order ID']),
        productId: item['Product ID'],
        customerId: item['Customer ID'],
        productName: item['Product Name'],
        category: item['Category'],
        region: item['Region'],
        dateofSale: new Date(item['Date of Sale']).toISOString(),
        quantitySold: Number(item['Quantity Sold']),
        unitPrice: parseFloat(item['Unit Price']),
        discount: parseFloat(item['Discount']),
        shippingCost: parseFloat(item['Shipping Cost']),
        paymentMethod: item['Payment Method'],
        customerName: item['Customer Name'],
        customerEmail: item['Customer Email'],
        customerAddress: item['Customer Address']
    }));
}

function processInChunks(data) {
    const chunkSize=constants.CHUNK_SIZE
    const chunkedData = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const convertedChunk = convertData(chunk);
        chunkedData.push(...convertedChunk);
    }
    return chunkedData;
}

module.exports = {
    sendResponse,
    errorHandler,
    processInChunks
};
