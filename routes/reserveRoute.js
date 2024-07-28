const express = require('express');
const authMiddleware = require('../middlewares/auth');
const productController = require('../controllers/productController');

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, productController.reserve);
router.delete('/', authMiddleware, productController.unReserve);

module.exports = router;
