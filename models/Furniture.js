const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  photo: { type: String },
  created: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'passive', 'draft'],
    default: 'draft',
  },
});

FurnitureSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

FurnitureSchema.pre('findoneAndUpdate', function (next) {
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

const Furniture = mongoose.model('Furniture', FurnitureSchema);

module.exports = Furniture;
