# --- !Ups

CREATE TABLE Products (
 "prodId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 "tytul" VARCHAR  NOT NULL,
 "opis" TEXT NOT NULL
);

# --- !Downs

DROP TABLE Products;