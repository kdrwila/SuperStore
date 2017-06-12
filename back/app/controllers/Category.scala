package controllers

import javax.inject.Inject

import daos.CategoriesDAO
import daos.ProductsDAO
import models.CategoriesPOST
import models.Categories
import models.Products
import play.api.libs.json._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Category @Inject() (categoriesDAO: CategoriesDAO, productsDAO: ProductsDAO) extends Controller
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

	def getCategory(id: Long) = Action.async 
	{ implicit request =>
		var cat : JsValue = Json.obj()
		categoriesDAO.get(id) map
		{ category => 
			cat = Json.toJson(category)
		}
		productsDAO.getFromCat(id) map
		{ products => 
			Json.toJson(products)
			Ok(Json.obj(
				"category" -> cat,
				"products" -> products
			))
		}
	}

    def removeCategory(id: Long) = Action
	{ implicit request =>
		categoriesDAO.remove(id)
		Ok("")
	}
}
