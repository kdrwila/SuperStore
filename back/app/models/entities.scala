package models

import java.sql.Timestamp

import play.api.libs.json.Format

/**
  * Created by kprzystalski on 23/04/17.
  */

case class Categories(catId: Long, tytul: String, opis: String)

case class Products(prodId: Long, tytul: String, opis: String, catId: Long)

case class ProductTypes(type_id: Long, title: String, price: Float, quantity: Long, product_id: Long)

case class BasketProducts(id: Long, user_id: Long, quantity: Long, product_id: Long)

//case class Purchases(purId: Long, prodId: Long, userId: Long)

//case class Users(userId: Long, username: String)