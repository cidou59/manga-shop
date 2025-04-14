const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product price cannot be negative']
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image URL is required']
  },
  description: {
    type: String,
    maxlength: [500, 'Product description cannot exceed 500 characters']
  },
  availability: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;