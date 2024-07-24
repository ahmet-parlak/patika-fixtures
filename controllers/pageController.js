const Category = require('../models/Category');
const Furniture = require('../models/Furniture');

exports.getIndexPage = (req, res) => {
  const currentPage = 'index';
  res.status(200).render('index', { currentPage });
};

exports.getAboutPage = (req, res) => {
  const currentPage = 'about';
  res.status(200).render('about', { currentPage });
};

exports.getFurnituresPage = (req, res) => {
  const currentPage = 'furnitures';
  res.status(200).render('furnitures', { currentPage });
};

exports.getContactPage = (req, res) => {
  const currentPage = 'contact';
  res.status(200).render('contact', { currentPage });
};

exports.getLoginPage = (req, res) => {
  const currentPage = 'login';

  const loginOldVals = res.locals.flashMessages?.loginOldVals ?? [];
  const registerOldVals = res.locals.flashMessages?.registerOldVals ?? [];

  res.status(200).render('login', {
    currentPage,
    loginOldVals: loginOldVals[0],
    registerOldVals: registerOldVals[0],
  });
};

exports.getAdminPage = (req, res) => {
  const currentPage = 'admin';

  res.status(200).render('admin', { currentPage });
};

exports.getUsersPage = (req, res) => {
  const currentPage = 'users';

  res.status(200).render('users', { currentPage });
};

exports.getUsersPage = (req, res) => {
  const currentPage = 'users';

  res.status(200).render('users', { currentPage });
};

exports.getProductsPage = async (req, res) => {
  const currentPage = 'products';

  const categories = await Category.find();
  const furnitures = await Furniture.find().populate('category');

  res.status(200).render('products', { currentPage, categories, furnitures });
};

exports.getCategoriesPage = async (req, res) => {
  const currentPage = 'categories';

  const categories = await Category.find();

  res.status(200).render('categories', { currentPage, categories });
};

exports.getReservesPage = (req, res) => {
  const currentPage = 'reserves';

  res.status(200).render('reserves', { currentPage });
};
