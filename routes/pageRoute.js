const express = require('express');
const pageController = require('../controllers/pageController');
const guestMiddleware = require('../middlewares/guest');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/furnitures', pageController.getFurnituresPage);
router.get('/furnitures/:slug', pageController.getFurniturePage);
router.get('/contact', pageController.getContactPage);
router.get('/login', guestMiddleware, pageController.getLoginPage);

router.get('/user', authMiddleware, pageController.getUserPage);

router.get(
  '/admin',
  authMiddleware,
  adminMiddleware,
  pageController.getAdminPage
);

router.get(
  '/admin/users',
  authMiddleware,
  adminMiddleware,
  pageController.getUsersPage
);

router.get(
  '/admin/products',
  authMiddleware,
  adminMiddleware,
  pageController.getProductsPage
);

router.get(
  '/admin/products/categories',
  authMiddleware,
  adminMiddleware,
  pageController.getCategoriesPage
);

router.get(
  '/admin/reserves',
  authMiddleware,
  adminMiddleware,
  pageController.getReservesPage
);

module.exports = router;
