# --- !Ups

CREATE TABLE BasketProducts
(
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	"user_id" INTEGER  NOT NULL,
	"quantity" INTEGER NOT NULL,
	"product_id" INTEGER NOT NULL
);

# --- !Downs

DROP TABLE BasketProducts;