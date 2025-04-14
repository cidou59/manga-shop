const Product = require('../database/models/product.model');

exports.getProducts = () => {
  return Product.find({}).exec();
}

exports.createProduct = (product) => {
  const newProduct = new Product(product);
  return newProduct.save();
}

exports.deleteProduct = (productId) => {
  return Product.findByIdAndDelete(productId).exec();
}

exports.getProduct = (productId) => {
  return Product.findOne({ _id: productId }).exec();
} 

exports.updateProduct = (productId, product) => {
  return Product.findByIdAndUpdate(productId, { $set: product }, { runValidators: true });
}