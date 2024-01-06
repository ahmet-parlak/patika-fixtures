const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, unique: true, required: true },
  category: { type: String, trim: true, lowercase: true },
  description: { type: String, default: '', trim: true },
  slug: { type: String, unique: true },
  created_at: { type: Date, default: Date.now },
});

ProductSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

ProductSchema.pre('findOneAndUpdate', function (next) {
  const updateData = this.getUpdate();

  if (updateData.name) {
    this.findOneAndUpdate(
      {},
      {
        $set: { slug: slugify(updateData.name, { lower: true, strict: true }) },
      }
    );
  }
  next();
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
