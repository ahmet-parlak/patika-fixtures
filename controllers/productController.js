const Furniture = require('../models/Furniture');

const { validationResult } = require('express-validator');
const User = require('../models/User');

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

exports.reserve = async (req, res) => {
  const slug = req.params.slug;

  try {
    const furniture = await Furniture.findOne({ slug });

    if (!furniture || furniture.status != 'active') {
      req.flash('errors', ['Furniture not found!']);
      res.redirect('back');
      return;
    }

    const userData = await User.findById(user.id).select('reserved_furnitures');

    const isReserved = userData.reserved_furnitures.some(
      (reserved) => reserved.furniture.toString() === furniture.id.toString()
    );

    if (isReserved) {
      req.flash('errors', ['Furniture already reserved!']);
      res.redirect('back');
      return;
    }

    userData.reserved_furnitures.push({
      furniture: furniture.id,
    });

    await userData.save();

    req.flash('success', 'Furniture reserved');
    res.redirect('back');
  } catch (error) {
    console.log(error);
    req.flash('errors', ['Somethings wrong']);
    res.redirect('back');
    return;
  }
};

exports.unReserve = async (req, res) => {
  const slug = req.params.slug;

  try {
    const furniture = await Furniture.findOne({ slug });

    if (!furniture || furniture.status != 'active') {
      req.flash('errors', ['Furniture not found!']);
      res.redirect('back');
      return;
    }

    const userData = await User.findById(user.id).select('reserved_furnitures');

    const isReserved = userData.reserved_furnitures.some(
      (reserved) => reserved.furniture.toString() === furniture.id.toString()
    );

    if (!isReserved) {
      req.flash('errors', ['Furniture is not reserved!']);
      res.redirect('back');
      return;
    }

    userData.reserved_furnitures.pop({
      furniture: furniture.id,
    });

    await userData.save();

    req.flash('success', 'Furniture reservation cancelled!');
    res.redirect('back');
  } catch (error) {
    console.log(error);
    req.flash('errors', ['Somethings wrong']);
    res.redirect('back');
    return;
  }
};
