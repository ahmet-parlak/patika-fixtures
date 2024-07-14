const express = require('express');
const pageController = require('../controllers/pageController');
const guestMiddleware = require('../middlewares/guest');

const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/furnitures', pageController.getFurnituresPage);
router.get('/contact', pageController.getContactPage);
router.get('/login', guestMiddleware, pageController.getLoginPage);

module.exports = router;
