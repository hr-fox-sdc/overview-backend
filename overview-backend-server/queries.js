const connectionPool = require('./connect.js')

const getAllProducts = (request, response) => {
  var limit = request.query.count || 5;
  var offset = ((request.query.page - 1) * limit) || 0;
  var query = `SELECT id, name, slogan, description, category, default_price FROM product OFFSET $1 LIMIT $2`;
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
  var query = `
    SELECT * FROM
    (SELECT *,
      (SELECT json_agg(f) FROM
        (SELECT feature, value FROM feature WHERE product_id = product.id) f )
        as features FROM product WHERE id = ${product_id}) p`;

  // var query = `
  //   SELECT json_build_object
  //   ('id', id,
  //   'name', name,
  //   'slogan', slogan,
  //   'description', description,
  //   'category', category,
  //   'default_price', default_price,
  //   'features', (SELECT array_agg
  //                 (json_build_object
  //                   ('feature', feature,
  //                   'value', value))
  //               ) FROM feature WHERE product_id = product.id
  //   ) FROM product WHERE id = ${product_id}
  //   `;

  // var query = `(SELECT json_agg FROM
  //   (json_build_object
  //     ('feature', feature,
  //     'value', value))
  // ) FROM feature WHERE product_id = {product_id}`

  connectionPool
    .query(query)
    .then(res => response.send(res.rows[0]))
    .catch(err => {
        console.error('Error executing to get product information', err.stack);
    })
}

const getProductStyles = (request, response) => {
  var product_id = request.params.product_id;
  var query = `
    SELECT json_build_object
      (
        'product_id', ${product_id},
        'results', (SELECT json_agg
                    (json_build_object
                      (
                        'style_id', id,
                        'name', name,
                        'original_price', original_price,
                        'sale_price', sale_price,
                        'default?', default_style,
                        'photos', (SELECT json_agg(json_build_object
                                  (
                                    'thumbnail_url', thumbnail_url,
                                    'url', url
                                  )) FROM photos where photos.styleId = styles.id),
                        'skus', (SELECT json_object_agg(
                                id, (SELECT json_build_object(
                                  'quantity', quantity,
                                  'size', size)
                                  )
                                ) FROM skus WHERE skus.styleId = styles.id)
                      )) from styles where productId = {product_id} limit 5
                    )
      ) as t
  `;
  connectionPool
    .query(query)
    .then(res => response.send(res.rows[0].t))
    .catch(err => {
      console.error('Error executing to get style information', err.stack);
      response.status(500);
    });
}

const getRelatedItems = (request, response) => {
  var product_id = request.params.product_id;
  var query = `(SELECT array_agg(related_product_id) FROM related WHERE current_product_id = ${product_id})`;
  connectionPool
    .query(query)
    .then(res => response.send(res.rows[0].array_agg))
    .catch(err => {
      console.error('Error executing to get related products', err.stack);
      response.status(500);
    });
}

const addToCart = (req, res) => {
  // var id = req.body.sku_id;
}

module.exports = {
  getAllProducts,
  getProduct,
  getProductStyles,
  getRelatedItems,
  addToCart
};