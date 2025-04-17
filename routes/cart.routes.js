const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
  console.log('Données reçues pour le panier :', req.body); // Log des données reçues
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

  console.log('Panier mis à jour :', req.session.cart); // Log du panier mis à jour
  res.redirect('/cart');
});

module.exports = router;