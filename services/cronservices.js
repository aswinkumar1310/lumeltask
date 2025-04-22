const cron = require('node-cron');
const sales = require("../src/products/models/salesActivity")
const subscriptionCron = () => {
    cron.schedule('0 23 * * *', () => {
        console.log('running a task 11 pm');
        refreshDB()
    });
}


const refreshDB = async () => {
    //sample data set for this going to  written in database;
    const dataset = [{
        orderId: "1233",
        productId: "P456",
        customerId: "C101",
        "productName": "iPhone 15 Pro"
    }];
    const bulkData = []
    const existingData = await sales.find({}).lean();
    if (existingData.length) {
        for (const item of dataset) {
            const checkData = existingData.find(itemEntry => itemEntry.orderId === item.orderId)
            if (!checkData) {
                bulkData.push(item)
            }
        }
        if (bulkData.length) {
            sales.insertMany(bulkData)
        }
    } else {
        sales.insertMany(dataset)
    }
}
subscriptionCron()
module.exports = {
    subscriptionCron
}
