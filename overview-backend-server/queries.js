const connectionPool = require('./connect.js')

const getAllProducts = (request, response) => {
  var limit = request.query.count || 5;
  var offset = ((request.query.page - 1) * limit) || 0;
  var query = 'SELECT id, name, slogan, description, category, default_price FROM product OFFSET $1 LIMIT $2';
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
    (SELECT json_build_object
    ('id', id,
    'name', name,
    'slogan', slogan,
    'description', description,
    'category', category,
    'default_price', default_price,
    'features', (SELECT json_agg
                  (json_build_object
                    ('feature', feature,
                    'value', value))
                 FROM feature WHERE product_id = product.id)
    ) FROM product WHERE id = $1)
    `;

  connectionPool
    .query(query, [product_id])
    .then(res => response.send(res.rows[0].json_build_object))
    .catch(err => {
        console.error('Error executing to get product information', err.stack);
    })
}

const getProductStyles = (request, response) => {
  var product_id = request.params.product_id;
  var query = `
    SELECT json_build_object
      (
        'product_id', $1::integer,
        'results', (SELECT json_agg
                    (json_build_object
                      (
                        'style_id', style_id,
                        'name', name,
                        'original_price', original_price,
                        'sale_price', sale_price,
                        'default?', default_style,
                        'photos', (SELECT json_agg(json_build_object
                          (
                            'thumbnail_url', thumbnail_url,
                            'url', url
                          )) FROM style_photo WHERE style_photo.style_id = style.style_id),
                        'skus', (SELECT json_object_agg(
                                'id', (SELECT json_build_object(
                                  'quantity', quantity,
                                  'size', size)
                                  )
                                ) FROM sku WHERE sku.style_id = style.style_id)
                      )) FROM style where product_id = $1::integer limit 5
                    )
      ) as t
  `;
  connectionPool
    .query(query, [product_id])
    .then(res => response.send(res.rows[0].t))
    .catch(err => {
      console.error('Error executing to get style information', err.stack);
      response.status(500);
    });
}

const getRelatedItems = (request, response) => {
  var product_id = request.params.product_id;
  var query = `(SELECT json_agg(related_product_id) FROM related WHERE current_product_id = $1)`;
  connectionPool
    .query(query, [product_id])
    .then(res => response.send(res.rows[0].json_agg))
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