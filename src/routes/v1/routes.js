const router = require('express').Router();
const productRoute = require('../../products/products.routes');
router.use('/products', productRoute);
module.exports = router;