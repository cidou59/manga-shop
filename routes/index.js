const router = require('express').Router();
const products = require('./products.routes');
const Product = require('../database/models/product.model');
const users = require('./users.routes');
const auth = require('./auth.routes');
const cart = require('./cart.routes'); // Import des routes du panier

router.use('/products', products);
router.use('/users', users);
router.use('/auth', auth);
router.use('/cart', cart); // Ajout des routes du panier

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.render('home', { products });
  } catch (err) {
    console.error('Error retrieving products:', err);
    res.render('home', { products: [] });
  }
});

module.exports = router;