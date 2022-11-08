const express = require('express');
const fs = require('fs');
const connectionPool = require('./connect.js')
// const bodyParser = require('body-parser');
const db = require('./queries.js');
const app = express();
const port = 3005;
require('dotenv').config();
const path = require('path');
const cors = require('cors');

// const reactConfig = require(path.join(__dirname, '../config/config.static.json'))[env];

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, reactConfig))); // serving react files

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' });
// });

const loaderKey = fs.readFileSync('./loaderio-a402317815c58b54728bac203314b3ff.txt').toString();

connectionPool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('connected to database')
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// overview routes
app.get('/products', db.getAllProducts);
app.get('/products/:product_id', db.getProduct);
app.get('/products/:product_id/styles', db.getProductStyles);
app.get('/products/:product_id/related', db.getRelatedItems);
app.get('/loaderio-a402317815c58b54728bac203314b3ff.txt', (req, res) => res.send(loaderKey))
// app.post('/cart', addToCart);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
