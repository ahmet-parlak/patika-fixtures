const express = require('express');

const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

const furnitureValidation = require('../middlewares/validations/furniture');

const router = express.Router();

router.post('/products', furnitureValidation, productController.create);
router.patch('/products/:id', furnitureValidation, productController.update);
router.delete('/products/:id', productController.delete);

router.post('/products/categories', categoryController.create);
router.delete('/products/categories/:id', categoryController.delete);
router.patch('/products/categories/:id', categoryController.update);

module.exports = router;
