const { body } = require('express-validator');
const Furniture = require('../../models/Furniture');
const Category = require('../../models/Category');

module.exports = [
  body('name').not().isEmpty().withMessage('Please enter the furniture name!'),
  body('name').custom(async (value, { req }) => {
    const existingFurniture = await Furniture.findOne({ name: value });
    if (existingFurniture && existingFurniture.id !== req.params.id) {
      throw new Error('A product already exists with this name');
    }
  }),
  body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter the furniture description!'),

  body('category').custom(async (value) => {
    try {
      const existingCategory = await Category.findById(value);
      if (!existingCategory) {
        throw new Error('Please select a category!');
      }
    } catch (error) {
      throw new Error('Please select a category!');
    }
  }),
];
