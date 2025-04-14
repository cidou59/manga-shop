const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientPromise } = require('../database');

module.exports = (app) => {
  app.use(
    session({
      secret: 'je suis un secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14,
      },
      store: MongoStore.create({
        clientPromise: clientPromise,
        dbName: 'market', // Ajoutez cette ligne pour spécifier le nom de la base de données
        ttl: 60 * 60 * 24 * 14,
      }),
    })
  );
};