const pool = new Pool();


// make queries
// use promise.all
// push each into an array

const getAllProducts = (req, res) => {
  // axios.get(`${api}/products`, requestConfig)
  //   .then((response) => {
  //     res.send(response.data);
  //   })
  //   .catch((error) => {
  //     res.status(500);
  //   });
  var query = 'SELECT * from product limit 10';
  pool
    .query(query)
    .then(res => console.log(res.rows))
    .catch(err => console.error('Error executing get all products query', err.stack));
}

const getProduct = (req, res) => {
  // let itemId = req.params.product_id;
  // axios.get(`${api}/products/${itemId}`, requestConfig)
  //   .then((productInfo) => {
  //     res.send(productInfo.data);
  //   })
  //   .catch((error) => {
  //     res.status(500);
  //   });
  var product_id = req.body.product_id;
  var query = `SELECT * from product where product_id = ${product_id}`;
  pool
    .query(query)
      .then(res => console.log(res.rows))
      .catch(err => console.error('Error executing to get product information', err.stack));
    // features query
}

const getProductStyles = (req, res) => {
  // let itemId = req.params.product_id;
  // axios.get(`${api}/products/${itemId}/styles`, requestConfig)
  //   .then((styles) => {
  //     res.send(styles.data);
  //   })
  //   .catch((error) => {
  //     res.status(500);
  //   });
}

const addToCart = (req, res) => {
  // var id = req.body.sku_id;
  // axios.post(`${api}/cart`, {sku_id: id}, noCompressionConfig)
  //   .then((response)=> {
  //     res.sendStatus(response.status);
  //   })
  //   .catch((err)=>{
  //     console.log('Error, cannot post to cart. Error: ', err)
  //   })
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductStyles,
  addToCart
};