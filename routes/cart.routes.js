const express = require('express');
const router = express.Router();

// Route pour afficher le panier
router.get('/', (req, res) => {
  res.render('cart', { session: req.session });
});

// Route pour ajouter un produit au panier
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

router.get('/', (req, res) => {
  console.log('Session actuelle :', req.session); // Log de la session
  res.render('cart', { session: req.session });
});



// por log a effacer

router.post('/add', (req, res) => {
  console.log('Données reçues pour le panier :', req.body);
  console.log('Session avant mise à jour :', req.session);

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

  console.log('Panier mis à jour :', req.session.cart);
  res.redirect('/cart');
});

router.get('/', (req, res) => {
  console.log('Session actuelle :', req.session);
  res.render('cart', { session: req.session });
});
module.exports = router;