const connectionPool = require('./connect.js')
// const pool = require('pg').pool;
// const pool = new Pool();


// make queries array
// push each promised return value of a query into queries
// use promise.all

const getAllProducts = (request, response) => {
  var limit = request.query.count || 5;
  var offset = ((request.query.page - 1) * limit) || 0;
  var query = `SELECT * FROM product OFFSET $1 LIMIT $2`;
  connectionPool
    .query(query, [offset, limit])
    .then(res => {
      response.send(res.rows)
    })
    .catch(err => {
      console.error('Error executing get all products query', err.stack);
      response.status(500);
    });
}

const getProduct = (request, response) => {
  var product_id = request.params.product_id;
  var query1 = `SELECT * from product where product_id = ${product_id}`;
  var query2 = `SELECT feature, value from feature where product_id = ${product_id}`
  connectionPool
    .query(query1)
    .then(res => {
      let product = res.rows[0];
      connectionPool
        .query(query2)
        .then(res => {
          product.features = res.rows;
          response.send(product);
        })
    })
    .catch(err => {
      console.error('Error executing to get product information', err.stack);
      response.status(500);
    });
}

const getProductStyles = (request, response) => {
  var product_id = request.params.product_id;
  var query = `SELECT * from style where product_id = ${product_id}`;
  connectionPool
    .query(query)
    .then(res => {
      var styles = res.rows;
      let photoPromises = [];
      let skuPromises = [];
      styles.forEach((style) => {
        photoPromises.push(connectionPool.query(`SELECT thumbnail_url, url from style_photo WHERE style_id = ${style.style_id}`)
          .then(res => res.rows)
        )
        skuPromises.push(connectionPool.query(`SELECT size, quantity from sku WHERE style_id = ${style.style_id}`)
          .then(res => res.rows))
        })
        Promise.all(photoPromises)
          .then((res) => {
            styles.forEach((style, index) => {
              style.photo = res[index];
            })
            Promise.all(skuPromises)
              .then((res) => {
                console.log(res)
                styles.forEach((style, index) => {
                  style.skus = res[index];
                })
                response.send(styles);
              })
          })
    })
    .catch(err => {
      console.error('Error executing to get style information', err.stack);
      response.status(500);
    });
}

const getRelatedItems = (request, response) => {
  var product_id = request.params.product_id;
  var query = `SELECT * from related where current_product_id = ${product_id}`;
  connectionPool
    .query(query)
    .then(res => response.send(res.rows))
    .catch(err => {
      console.error('Error executing to get style information', err.stack);
      response.status(500);
    });
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
  getRelatedItems,
  addToCart
};