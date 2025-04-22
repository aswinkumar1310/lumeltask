const router = require("express").Router();
const multer = require('multer');
const productController = require("./products.controller")
const upload = multer({ dest: 'uploads/' });
const { validate } = require("../../middleware/validation");
const { revenue } = require("./products.validations")
router.post("/uploads", upload.single('file'), productController.importActivities)
router.post("/revenue", validate(revenue), productController.getRevenues)
module.exports = router