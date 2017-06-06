package models

import play.api.libs.json.Json

/**
	* Created by kprzystalski on 23/04/17.
	*/
case class ProductsREST(tytul: String, opis: String)
case class CategoriesREST(catId: Long, tytul: String, opis: String)

object ProductsREST 
{
	implicit val productsFormat = Json.format[ProductsREST]
}

object CategoriesREST 
{
	implicit val productsFormat = Json.format[CategoriesREST]
}