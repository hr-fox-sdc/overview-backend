COPY product(product_id, name, slogan, description, category, default_price) FROM '/Users/huongnguyen/Documents/hr/sdc/overview-backend/data/product.csv'
DELIMITER ','
CSV HEADER;

COPY style(style_id, product_id, name, sale_price, original_price, default_style) FROM '/Users/huongnguyen/Documents/hr/sdc/overview-backend/data/styles.csv'
(format csv, null "null",
DELIMITER ',',
HEADER);

COPY sku(sku_id, style_id, size, quantity) FROM '/Users/huongnguyen/Documents/hr/sdc/overview-backend/data/skus.csv'
DELIMITER ','
CSV HEADER;

COPY style_photo(id, style_id, thumbnail_url, url) FROM '/Users/huongnguyen/Documents/hr/sdc/overview-backend/data/photos.csv'
DELIMITER ','
CSV HEADER;

COPY feature(feature_id, product_id, feature, value) FROM '/Users/huongnguyen/Documents/hr/sdc/overview-backend/data/features.csv'
DELIMITER ','
CSV HEADER;