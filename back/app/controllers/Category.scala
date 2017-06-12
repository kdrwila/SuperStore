package controllers

import javax.inject.Inject

import daos.CategoriesDAO
import daos.ProductsDAO
import daos.ProductTypesDAO
import daos.BasketProductsDAO
import models.CategoriesPOST
import models.Categories
import models.Products
import play.api.libs.json._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Category @Inject() (categoriesDAO: CategoriesDAO, productsDAO: ProductsDAO, productTypesDAO: ProductTypesDAO, basketProductsDAO: BasketProductsDAO) extends Controller
{
    implicit val categoriesWrites = new Writes[Option[models.Categories]] 
	{
		def writes(option: Option[Categories]) = Json.obj(
			"catId"	-> option.get.catId,
			"tytul"	-> option.get.tytul,
			"opis"	-> option.get.opis
		)
	}

    def listCategories = Action.async 
	{ implicit request =>
		categoriesDAO.all map
		{
			categories => Ok(Json.toJson(categories))
		}
	}

	def addCategory = Action 
	{ implicit request =>
		var json:CategoriesPOST = request.body.asJson.get.as[CategoriesPOST]
		var category = Categories(catId = 0, tytul = json.tytul, opis = json.opis)
		categoriesDAO.insert(category)
		Ok(request.body.asJson.get)
	}

	def getCategory(id: Long) = Action
	{ implicit request =>
		var cat : JsValue = Json.obj()
		var product: JsValue = Json.obj()

		categoriesDAO.get(id) map
		{ category => 
			cat = Json.toJson(category)
			productsDAO.getFromCat(id) map
			{ products => 
				product = Json.toJson(products)
			}
		}

		val MAX_ITERATIONS = 1000000
		var i = 0
		while(product.toString().length() < 3 && i < MAX_ITERATIONS)
		{ 
			i += 1
		}

		Ok(Json.obj(
			"category" -> cat,
			"products" -> product
		))
	}

    def removeCategory(id: Long) = Action
	{ implicit request =>
		categoriesDAO.remove(id)

		var products_r : List[models.ProductsREST] = Nil
		
		productsDAO.getFromCat(id) map
		{ products =>
			products_r = products

			products_r.foreach
			{ a => 
				productTypesDAO.removeAllFromProd(a.prodId)
				basketProductsDAO.removeProduct(a.prodId)
			}
		}
		productsDAO.removeAllFromCat(id)

		Ok("")
	}

	def updateCategory(id: Long) = Action
	{ implicit request =>
		var json: CategoriesPOST = request.body.asJson.get.as[CategoriesPOST]
		var category = Categories(catId = id, tytul = json.tytul, opis = json.opis)

		categoriesDAO.update(category)
		Ok(request.body.asJson.get)
	}
}
