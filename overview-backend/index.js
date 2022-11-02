const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const port = 3005;
const db = require('./queries');
// const cors = require('cors');


// app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// overview routes
app.get('/products', db.getAllProducts);
app.get('/products/:product_id', db.getProduct);
app.get('/products/:product_id/styles', db.getProductStyles);
// app.post('/cart', addToCart);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
