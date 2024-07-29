const Category = require('../models/Category');
const Furniture = require('../models/Furniture');
const User = require('../models/User');

exports.getIndexPage = (req, res) => {
  const currentPage = 'index';
  res.status(200).render('index', { currentPage });
};

exports.getAboutPage = (req, res) => {
  const currentPage = 'about';
  res.status(200).render('about', { currentPage });
};

exports.getFurnituresPage = async (req, res) => {
  const currentPage = 'furnitures';
  const furnitures =
    user?.role == 'admin'
      ? await Furniture.find().populate('category')
      : await Furniture.find({ status: 'active' }).populate('category');
  res.status(200).render('furnitures', { currentPage, furnitures });
};

exports.getFurniturePage = async (req, res) => {
  const currentPage = 'furniture';

  const slug = req.params.slug;

  try {
    const furniture = await Furniture.findOne({ slug }).populate('category');

    if (!furniture) {
      req.flash('errors', ['Product not found!']);
      res.status(403).redirect('/furnitures');
      return;
    }

    if (user?.role === 'admin') {
      res.status(200).render('furniture', { currentPage, furniture });
      return;
    }

    if (furniture.status === 'active') {
      res.status(200).render('furniture', { currentPage, furniture });
    } else {
      req.flash('errors', ['Not Authorized']);
      res.status(403).redirect('/furnitures');
    }
  } catch (e) {
    console.log(e);
    req.flash('errors', ['Shomethings wrong! Please try again.']);
    res.status(403).redirect('/furnitures');
  }
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

exports.getUserPage = async (req, res) => {
  const currentPage = 'account';

  const userData = await User.findById(user.id)
    .populate('reserved_furnitures.furniture')
    .select('reserved_furnitures');

  res.status(200).render('user', {
    currentPage,
    reservedFurnitures: userData.reserved_furnitures,
  });
};

exports.getAdminPage = (req, res) => {
  const currentPage = 'admin';

  res.status(200).render('admin', { currentPage });
};

exports.getUsersPage = async (req, res) => {
  const currentPage = 'users';

  const users = await User.find();

  res.status(200).render('users', { currentPage, users });
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

exports.getReservesPage = async (req, res) => {
  const currentPage = 'reserves';

  const reserves = await User.find({
    reserved_furnitures: { $exists: true, $not: { $size: 0 } },
  }).populate({
    path: 'reserved_furnitures.furniture',
    populate: { path: 'category' },
  });

  console.log(reserves[0].reserved_furnitures);

  res.status(200).render('reserves', { currentPage, reserves });
};
