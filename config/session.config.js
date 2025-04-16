const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'je suis un secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 14
      },
      store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        ttl: 60 * 60 * 24 * 14,
        autoRemove: 'native',
        touchAfter: 24 * 3600
      })
    })
  );
};