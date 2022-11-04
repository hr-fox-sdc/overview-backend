const express = require('express');
const connectionPool = require('./connect.js')
// const bodyParser = require('body-parser');
const db = require('./queries.js');
const app = express();
const port = 3005;
// const cors = require('cors');


// app.use(cors());
app.use(express.json());

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' });
// });

connectionPool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('connected to database')
})

// overview routes
app.get('/products', db.getAllProducts);
app.get('/products/:product_id', db.getProduct);
app.get('/products/:product_id/styles', db.getProductStyles);
app.get('/products/:product_id/related', db.getRelatedItems);
// app.post('/cart', addToCart);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
