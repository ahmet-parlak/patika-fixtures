const Category = require('../models/Category');

exports.create = async (req, res) => {
  const name = req.body.name;

  if (!(name?.length > 0)) {
    req.flash('errors', ['Please enter the category name!']);
    return res.redirect('/admin/products/categories');
  }

  const category = await Category.findOne({ name });

  if (category) {
    req.flash('errors', ['category already exists']);
    return res.redirect('/admin/products/categories');
  }

  await Category.create({ name });
  req.flash('success', ['category created']);
  res.redirect('/admin/products/categories');
};

exports.update = async (req, res) => {
  const name = req.body.name;
  const catergoryId = req.params.id;

  if (!(name?.length > 0)) {
    req.flash('errors', ['Please enter the category name!']);
    return res.redirect('/admin/products/categories');
  }

  const category = await Category.findOne({ name });

  if (category && category?.name === name) {
    req.flash('errors', ['Category already exists']);
    return res.redirect('/admin/products/categories');
  }

  Category.findByIdAndUpdate(catergoryId, { name })
    .then(() => {
      req.flash('success', ['category updated']);
      res.redirect('/admin/products/categories');
    })
    .catch((e) => {
      req.flash('errors', ['Something wrong!']);
      res.redirect('/admin/products/categories');
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  Category.findByIdAndDelete(id)
    .then(() => {
      req.flash('success', ['Category removed!']);
      return res.redirect('/admin/products/categories');
    })
    .catch(() => {
      req.flash('errors', ['Somethings wrong']);
      return res.redirect('/admin/products/categories');
    });
};
