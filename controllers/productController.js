const Furniture = require('../models/Furniture');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = [];

  validationResult(req)
    .array()
    .forEach((error) => {
      errors.push(error.msg);
    });

  if (errors.length > 0) {
    req.flash('errors', errors.length != 0 ? errors : 'Somethings wrong');
    req.flash('registerOldVals', req.body);
    res.status(400).redirect('/admin/products');
    return;
  }

  await Furniture.create(req.body);
  req.flash('success', ['Product created']);
  res.redirect('/admin/products');
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  Furniture.findByIdAndDelete(id)
    .then(() => {
      req.flash('success', ['Product removed!']);
      return res.redirect('/admin/products');
    })
    .catch(() => {
      req.flash('errors', ['Somethings wrong']);
      return res.redirect('/admin/products');
    });
};

exports.update = async (req, res) => {
  const errors = [];

  validationResult(req)
    .array()
    .forEach((error) => {
      errors.push(error.msg);
    });

  if (errors.length > 0) {
    req.flash('errors', errors.length != 0 ? errors : 'Somethings wrong');
    req.flash('registerOldVals', req.body);
    res.status(400).redirect('/admin/products');
    return;
  }

  const furnitureId = req.params.id;

  try {
    await Furniture.findByIdAndUpdate(furnitureId, req.body);
  } catch (error) {
    console.log(error);
    req.flash('errors', ['Somethings wrong']);
    res.redirect('/admin/products');
    return;
  }

  req.flash('success', ['Product updated']);
  res.redirect('/admin/products');
};
