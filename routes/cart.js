const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body); // Vérifie les données reçues
    const { productId, productName, productPrice, quantity } = req.body;
  
    if (!req.session.cart) {
      req.session.cart = [];
    }
  
    const existingProduct = req.session.cart.find(item => item.productId === productId);
  
    if (existingProduct) {
      existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(quantity);
    } else {
      req.session.cart.push({ productId, productName, productPrice, quantity });
    }
  
    res.redirect('/cart');
  });

router.get('/', (req, res) => {
    res.render('cart', { session: req.session });
  });

module.exports = router;