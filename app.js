const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes');
require('./database');

const app = express();
const port = process.env.PORT || 3000;

const cartRoutes = require('./routes/cart');
app.use('/cart', cartRoutes);



require('./config/session.config')(app);
require('./config/passport.config')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour définir isAuthenticated et currentUser
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();

  });


  app.use((req, res, next) => {
    if (!req.session.cart) {
      req.session.cart = []; // Initialiser le panier s'il n'existe pas
    }
    next();
  });

app.use(index);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';"
  );
  next();
});