const mongoose = require('mongoose');
require('dotenv').config();

const clientPromise = mongoose.connect(process.env.DATABASE_URL)
  .then((m) => {
    console.log('Connexion à la base de données réussie !');
    return m.connection.getClient();
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
    throw err;
  });

module.exports = { clientPromise };