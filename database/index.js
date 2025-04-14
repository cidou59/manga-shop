const mongoose = require('mongoose');

const clientPromise = mongoose.connect('mongodb+srv://jo:pompom@cluster0.6mzw1.mongodb.net/market?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((m) => {
  console.log('connexion db ok !');
  return m.connection.getClient();
}).catch(err => {
  console.log(err);
  throw err;
});

module.exports = { clientPromise };