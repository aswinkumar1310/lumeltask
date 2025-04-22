const readCSV = require('../../services/fileupload');
const { sendResponse, errorHandler, encryptPassword, generateToken, decryptPassword, generateOTP, processInChunks } = require('../../utils/common_functions');
const productServices = require("./products.services");
const { bulkValidation } = require("../../middleware/validation")
const { bulkSalesValidate } = require("./products.validations")
const fs = require("fs")
const importActivities = async (req, res) => {
    try {
        const errors = []
        const filePath = req.file.path;
        const mimeType = req.file.mimetype.split("/")[1]
        if (mimeType !== "csv") {

            return sendResponse(res, false, 422, "Invalid File format csv only allowed")
        }
        const data = await readCSV(filePath);
        fs.unlinkSync(filePath);
        const processedData = processInChunks(data)
        const validation = bulkValidation(bulkSalesValidate, { activity: processedData });
        if (validation.error) {
            validation.error.details.map((item) => {
                errors.push({
                    row: Number(item.path[1]) + 1,
                    field: item.context.label,
                    message: `${item.message
                        .replace(/"([^"]+(?="))"/g, '$1')
                        .replace('ref:', '')
                        .split('.')
                        .pop()}`,
                });
            })
        }
        if (errors.length) {
            return sendResponse(res, false, 422, "Validation Results", errors)
        }
        await productServices.importActivities(processedData)
        sendResponse(res, true, 200, "Sales Data imported succesfully", validation)
    } catch (error) {
        return errorHandler(error, res)
    }
}

const getRevenues = async (req, res) => {
    try {
        const { query: { startDate, endDate, productId, category, region } } = req;

        const start = startDate ? new Date(startDate) : new Date()
        const end = endDate ? new Date(endDate) : new Date()
        const matchData = {
            dateofSale: {
                $gte: start,
                $lte: end
            }
        }
        if (productId) {
            matchData.productId = productId
        }
        if (category) {
            matchData.category = category
        }
        if (region) {
            matchData.region = region
        }
        const options = [{
            $match: matchData
        },
        {
            $group: {
                _id: null,  // No grouping key, calculating overall sum
                totalRevenue: { $sum: { $multiply: ["$quantitySold", "$unitPrice"] } }
            }
        }
        ];
        const revenues = await productServices.getRevenues(options)
        sendResponse(res, true, 200, "Sales Revenue Datas", revenues)
    } catch (error) {
        return errorHandler(error, res)
    }
}
module.exports = {
    importActivities,
    getRevenues
}