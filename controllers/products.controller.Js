const Product = require('../database/models/product.model'); // Gardez une seule déclaration
const { getProducts, createProduct, deleteProduct, getProduct, updateProduct } = require('../queries/product.queries');

exports.productList = async (req, res, next) => {
  try {
    const products = await getProducts();
    res.render('products/product-list', { products, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  } catch (e) {
    next(e);
  }
};

exports.productNew = (req, res, next) => {
  res.render('products/product-form', { product: {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
};

exports.productCreate = async (req, res, next) => {
  try {
    const { name, price, imageUrl, description, category } = req.body;
    const availability = req.body.availability === 'on'; // Convertir en booléen
    const product = new Product({ name, price, imageUrl, description, availability, category });
    await product.save();
    res.redirect('/');
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res.status(400).render('products/product-form', { errors, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await deleteProduct(productId);
    const products = await getProducts();
    res.render('includes/product-list', { products });
  } catch (e) {
    next(e);
  }
};

exports.productEdit = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await getProduct(productId);
    res.render('products/product-form', { product, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  } catch (e) {
    next(e);
  }
};

exports.productUpdate = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const body = req.body;
    await updateProduct(productId, body);
    res.redirect('/products');
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    const product = await getProduct(productId);
    res.status(400).render('products/product-form', { errors, product, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
};

exports.productDetail = async (req, res, next) => {
  try {
    const productId = req.params.productId; // Récupère l'ID du produit depuis l'URL
    const product = await Product.findById(productId).exec(); // Récupère le produit par son _id
    if (!product) {
      return res.status(404).send('Produit non trouvé');
    }
    res.render('products/product-detail', { product });
  } catch (error) {
    next(error);
  }
};