package models

import play.api.libs.json.Json

/**
 * Created by kprzystalski on 23/04/17.
 */
case class CategoriesREST(catId: Long, tytul: String, opis: String)
case class CategoriesPOST(tytul: String, opis: String)
case class ProductsREST(prodId: Long, tytul: String, opis: String, catId: Long)
case class ProductsPOST(tytul: String, opis: String, catId: Long)
case class ProductTypesREST(type_id: Long, title: String, price: Float, quantity: Long, product_id: Long)
case class ProductTypesPOST(title: String, price: Float, quantity: Long)
case class BasketProductsREST(id: Long, user_id: Long, quantity: Long, product_id: Long, type_id: Long)
case class BasketProductsPOST(user_id: Long, quantity: Long, product_id: Long, type_id: Long)

object CategoriesREST {
  implicit val productsFormat = Json.format[CategoriesREST]
}

object CategoriesPOST {
  implicit val productsFormat = Json.format[CategoriesPOST]
}

object ProductsREST {
  implicit val productsFormat = Json.format[ProductsREST]
}

object ProductsPOST {
  implicit val productsFormat = Json.format[ProductsPOST]
}

object ProductTypesREST {
  implicit val productsFormat = Json.format[ProductTypesREST]
}

object ProductTypesPOST {
  implicit val productsFormat = Json.format[ProductTypesPOST]
}

object BasketProductsREST {
  implicit val productsFormat = Json.format[BasketProductsREST]
}

object BasketProductsPOST {
  implicit val productsFormat = Json.format[BasketProductsPOST]
}

