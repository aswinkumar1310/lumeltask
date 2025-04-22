const SaleActivity = require("./models/salesActivity")

const importActivities = async (data) => {
    const activities = await SaleActivity.insertMany(data)
    return activities
}

const getRevenues = async (options) => {
    const result = await SaleActivity.aggregate([options])
    return result;
}
module.exports = {
    importActivities,
    getRevenues
}