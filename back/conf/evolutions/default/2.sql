# --- !Ups

CREATE TABLE ProductTypes
(
	"type_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	"title" VARCHAR  NOT NULL,
	"price" FLOAT NOT NULL,
	"quantity" INTEGER NOT NULL,
	"product_id" INTEGER NOT NULL
);

# --- !Downs

DROP TABLE ProductTypes;