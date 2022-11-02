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
DROP TABLE IF EXISTS product_feature;
DROP TABLE IF EXISTS feature;
DROP TABLE IF EXISTS product;


CREATE TABLE product (
  product_id INTEGER NULL PRIMARY KEY,
  "name" VARCHAR(30) NULL DEFAULT NULL,
  slogan VARCHAR(50) NULL DEFAULT NULL,
  "description" VARCHAR(255) NULL DEFAULT NULL,
  category VARCHAR(30) NULL DEFAULT NULL,
  default_price INT NULL DEFAULT NULL
);

-- ---
-- Table feature
--
-- ---


CREATE TABLE feature (
  feature_id INT NULL PRIMARY KEY,
  feature_name VARCHAR NULL DEFAULT NULL
);

-- ---
-- Table product-feature
--
-- ---

CREATE TABLE product_feature (
  product_id INTEGER NULL PRIMARY KEY REFERENCES product (product_id),
  feature_id INTEGER NULL DEFAULT NULL REFERENCES feature (feature_id),
  feature_value INTEGER NULL DEFAULT NULL
);

-- ---
-- Table style
--
-- ---


CREATE TABLE style (
  style_id INTEGER NULL DEFAULT NULL PRIMARY KEY,
  product_id INTEGER NULL DEFAULT NULL REFERENCES product (product_id),
  "name" VARCHAR NULL DEFAULT NULL,
  original_price INTEGER NULL DEFAULT NULL,
  sale_price INTEGER NULL DEFAULT NULL,
  "default" BOOLEAN NULL DEFAULT NULL,
  photos INTEGER NULL DEFAULT NULL
);

-- ---
-- Table style photo
--
-- ---


CREATE TABLE style_photo (
  style_id INTEGER NULL DEFAULT NULL PRIMARY KEY REFERENCES style (style_id),
  thumbnail_url VARCHAR NULL DEFAULT NULL,
  "url" VARCHAR NULL DEFAULT NULL
);

-- ---
-- Table sku
--
-- ---


CREATE TABLE sku (
  sku_id INTEGER NULL DEFAULT NULL PRIMARY KEY REFERENCES style (style_id),
  style_id INTEGER NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  size INTEGER NULL DEFAULT NULL
);


-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE style ADD FOREIGN KEY (product_id) REFERENCES product (product_id);
-- ALTER TABLE style_photo ADD FOREIGN KEY (style_id) REFERENCES style (style_id);
-- ALTER TABLE sku ADD FOREIGN KEY (style_id) REFERENCES style (style_id);
-- ALTER TABLE product_feature ADD FOREIGN KEY (product_id) REFERENCES product (product_id);
-- ALTER TABLE product_feature ADD FOREIGN KEY (feature_id) REFERENCES feature (feature_id);

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

-- ---
-- Test Data
-- ---

-- INSERT INTO products (id,name,slogan,description,category,default price) VALUES
-- (,,,,,);
-- INSERT INTO product (product_id,name,slogan,description,category,default_price) VALUES
-- (,,,,,);
-- INSERT INTO feature (feature_id,feature_name) VALUES
-- (,);
-- INSERT INTO style (style_id,product_id,name,original_price,sale_price,default?,photos) VALUES
-- (,,,,,,);
-- INSERT INTO style photo (style_id,thumbnail_url,url) VALUES
-- (,,);
-- INSERT INTO sku (sku_id,style_id,quantity,size) VALUES
-- (,,,);
-- INSERT INTO product-feature (product_id,feature_id,feature_value) VALUES
-- (,,);