const router = require('express').Router();
const products = require('./products.routes');
const Product = require('../database/models/product.model');
const users = require('./users.routes');
const auth = require('./auth.routes');


router.use('/products', products);

router.use('/users', users);

router.use('/auth', auth);


router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.render('home', { products });
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.render('home', { products: [] });
  }
});

router.get('/product/new', (req, res) => {
  res.render('products/product-form');
});

router.get('/mentions-legales', (req, res) => {
  res.render('mentions-legales');
});

module.exports = router;