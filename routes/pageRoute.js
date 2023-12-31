const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/furnitures', pageController.getFurnituresPage);
router.get('/contact', pageController.getContactPage);

module.exports = router;
