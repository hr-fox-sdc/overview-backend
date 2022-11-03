const express = require('express');
// const bodyParser = require('body-parser');
const connectionClient = require('./connect.js')
const app = express();
const port = 3005;
const db = require('./queries.js');
// const cors = require('cors');


// app.use(cors());
app.use(express.json());

// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' });
// });

connectionClient.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log(`connected to database`)
})

// overview routes
// db.getAllProducts();
app.get('/products', db.getAllProducts);
app.get('/products/:product_id', db.getProduct);
app.get('/products/:product_id/styles', db.getProductStyles);
app.post('/cart', addToCart);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
