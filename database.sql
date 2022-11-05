-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table product
--
-- ---


DROP TABLE IF EXISTS style_photo;
DROP TABLE IF EXISTS sku;
DROP TABLE IF EXISTS style;
-- DROP TABLE IF EXISTS product_feature;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS feature;
DROP TABLE IF EXISTS product;


CREATE TABLE product (
  id INTEGER NOT NULL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL DEFAULT NULL,
  slogan TEXT NOT NULL DEFAULT NULL,
  "description" TEXT NOT NULL DEFAULT NULL,
  category VARCHAR(30) NOT NULL DEFAULT NULL,
  default_price VARCHAR(20) NOT NULL DEFAULT NULL
);


-- ---
-- Table feature
--
-- ---
CREATE TABLE feature (
  feature_id INT NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES product (id),
  feature VARCHAR NOT NULL DEFAULT NULL,
  "value" VARCHAR NOT NULL DEFAULT NULL
);


-- ---
-- Table feature
--
-- ---


-- CREATE TABLE feature (
--   feature_id INT NOT NULL PRIMARY KEY,
--   feature_name VARCHAR NOT NULL DEFAULT NULL
-- );

-- ---
-- Table product-feature
--
-- ---

-- CREATE TABLE product_feature (
--   product_id INTEGER NOT NULL PRIMARY KEY REFERENCES product (product_id),
--   feature_id INTEGER NOT NULL DEFAULT NULL REFERENCES feature (feature_id),
--   "value" INTEGER NOT NULL DEFAULT NULL
-- );

-- ---
-- Table style
--
-- ---


CREATE TABLE style (
  style_id INTEGER NOT NULL DEFAULT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL DEFAULT NULL REFERENCES product (id),
  "name" VARCHAR NOT NULL DEFAULT NULL,
  sale_price VARCHAR(20) NULL DEFAULT NULL,
  original_price VARCHAR(20) NOT NULL DEFAULT NULL,
  "default_style" BOOLEAN NULL DEFAULT NULL
);

-- ---
-- Table style photo
--
-- ---


CREATE TABLE style_photo (
  id INTEGER NOT NULL DEFAULT NULL,
  style_id INTEGER NOT NULL DEFAULT NULL,
  thumbnail_url VARCHAR NOT NULL DEFAULT NULL,
  "url" VARCHAR NOT NULL DEFAULT NULL
);

-- ---
-- Table sku
--
-- ---


CREATE TABLE sku (
  sku_id INTEGER NOT NULL DEFAULT NULL PRIMARY KEY,
  style_id INTEGER NOT NULL DEFAULT NULL,
  size VARCHAR(20) NOT NULL DEFAULT NULL,
  quantity INTEGER NOT NULL DEFAULT NULL
);

-- ---
-- Table related
--
-- ---

CREATE TABLE related (
  id INTEGER NOT NULL DEFAULT NULL PRIMARY KEY,
  current_product_id INTEGER NOT NULL DEFAULT NULL REFERENCES product (id),
  related_product_id INTEGER NOT NULL DEFAULT NULL
);


-- ---
-- Indexing
-- ---
CREATE INDEX product_product_id_index ON product (id);
CREATE INDEX style_product_id_index ON style (product_id);
CREATE INDEX feature_product_id_index ON feature (product_id);
CREATE INDEX style_photo_style_id_index ON style_photo (style_id);
CREATE INDEX sku_current_product_id_index ON sku (style_id);
CREATE INDEX related_product_id_index ON related (current_product_id);



-- ---
-- Table Properties
-- ---

-- ALTER TABLE products ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE feature ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE style ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE style photo ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE sku ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE product-feature ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


COPY product(id, name, slogan, description, category, default_price) FROM '/Users/huongnguyen/Documents/hr/sdc/overview-backend/data/product.csv'
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

COPY related(id, current_product_id, related_product_id) FROM '/Users/huongnguyen/Documents/hr/sdc/overview-backend/data/related.csv'
DELIMITER ','
CSV HEADER;