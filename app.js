const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes');
require('./database');

const app = express();
const port = process.env.PORT || 3000;

// Configuration de base
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares de base
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des sessions et de l'authentification
require('./config/session.config')(app);
require('./config/passport.config')(app);

// Routes
const cartRoutes = require('./routes/cart');
app.use('/cart', cartRoutes);

// Middleware pour définir isAuthenticated et currentUser
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Middleware pour initialiser le panier
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

app.use(index);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https:;"
  );
  next();
});