package controllers

import javax.inject.Inject

import daos.ProductsDAO
import daos.CategoriesDAO
import models.ProductsREST
import models.CategoriesREST
import models.CategoriesPOST
import models.Products
import models.Categories
import play.api.libs.json._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Application @Inject() (productsDAO: ProductsDAO, categoriesDAO: CategoriesDAO) extends Controller
{
	implicit val categoriesWrites = new Writes[Option[models.Categories]] 
	{
		def writes(option: Option[Categories]) = Json.obj(
			"catId"	-> option.get.catId,
			"tytul"	-> option.get.tytul,
			"opis"	-> option.get.opis
		)
	}

	def index = Action 
	{ implicit request =>
		Ok(views.html.index.render(""))
	}

	def listproducts = Action.async 
	{ implicit request =>
		productsDAO.all map 
		{
			products => Ok(Json.toJson(products))
		}
	}

	def getproduct(id: Long) = Action.async 
	{ implicit request =>
		productsDAO.get(id) map
		{
			products => Ok(Json.toJson(products))
		}
	}

	def newproduct = Action 
	{ implicit request =>
		var json:ProductsREST = request.body.asJson.get.as[ProductsREST]
		var product = Products(prodId = 0, tytul = json.tytul, opis = json.opis, catId = json.catId)
		println(product);
		productsDAO.insert(product)
		Ok(request.body.asJson.get)
	}

	def listcategories = Action.async 
	{ implicit request =>
		categoriesDAO.all map
		{
			categories => Ok(Json.toJson(categories))
		}
	}

	def newcategory = Action 
	{ implicit request =>
		var json:CategoriesPOST = request.body.asJson.get.as[CategoriesPOST]
		var category = Categories(catId = 0, tytul = json.tytul, opis = json.opis)
		categoriesDAO.insert(category)
		Ok(request.body.asJson.get)
	}

	def getcategory(id: Long) = Action.async 
	{ implicit request =>
		categoriesDAO.get(id) map
		{
			category => Ok(Json.toJson(category))
		}
	}	
}
