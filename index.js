const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;
const Synagogue = require('./models/synagogue.js');
const mongoose = require('mongoose');

const uri = `mongodb+srv://mishyjari:${process.env.MONGO_PASSWORD}@cluster0.zcuhp.mongodb.net/shul-finder?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const app = express();

app.use(cors({ origin: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Meow');
});

app.get('/synagogues', async (req, res) => {
  try {
    mongoose
      .connect(uri, connectionParams)
      .then(async db => {
        console.log('Connected');
        const syn = await Synagogue.find({});
        res.send(syn);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});

module.exports = app;
