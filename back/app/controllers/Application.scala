package controllers

import javax.inject.Inject

import daos.CategoriesDAO
import daos.ProductsDAO
import daos.ProductTypesDAO
import models.CategoriesREST
import models.CategoriesPOST
import models.ProductsREST
import models.ProductsPOST
import models.ProductTypesPOST
import models.Categories
import models.Products
import models.ProductTypes
import play.api.libs.json._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Application @Inject() (productsDAO: ProductsDAO, categoriesDAO: CategoriesDAO, productTypesDAO: ProductTypesDAO) extends Controller
{
	implicit val categoriesWrites = new Writes[Option[models.Categories]] 
	{
		def writes(option: Option[Categories]) = Json.obj(
			"catId"	-> option.get.catId,
			"tytul"	-> option.get.tytul,
			"opis"	-> option.get.opis
		)
	}
	
	implicit val productsWrites = new Writes[Option[models.Products]] 
	{
		def writes(option: Option[Products]) = Json.obj(
			"prodId"	-> option.get.prodId,
			"tytul"		-> option.get.tytul,
			"opis"		-> option.get.opis,
			"catId"		-> option.get.catId
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
		var product : JsValue = Json.obj()
		productsDAO.get(id) map
		{ products => 
			product = Json.toJson(products)
		}
		productTypesDAO.getForProduct(id) map
		{ types =>
			Json.toJson(types);
			Ok(Json.obj(
				"product" -> product,
				"types" -> types
			));
		}
	}

	def newproduct = Action 
	{ implicit request =>
		var json: ProductsPOST = request.body.asJson.get.as[ProductsPOST]
		var product = Products(prodId = 0, tytul = json.tytul, opis = json.opis, catId = json.catId)
		productsDAO.insert(product)
		Ok(request.body.asJson.get)
	}

	def updateproduct(id: Long) = Action
	{ implicit request =>
		var json: ProductsPOST = request.body.asJson.get.as[ProductsPOST]
		var product = Products(prodId = id, tytul = json.tytul, opis = json.opis, catId = json.catId)
		println(product)

		productsDAO.update(product)
		Ok(request.body.asJson.get)
	}

	def removeproduct(id: Long) = Action
	{ implicit request =>
		productsDAO.remove(id)
		Ok("")
	}

	def addproducttype(productId: Long) = Action
	{ implicit request =>
		var json: ProductTypesPOST = request.body.asJson.get.as[ProductTypesPOST]
		var productType = ProductTypes(type_id = 0, title = json.title, price = json.price, quantity = json.quantity, product_id = productId)
		productTypesDAO.insert(productType)
		Ok(request.body.asJson.get)
	}

	def removeproducttype(p_id: Long, id: Long) = Action
	{ implicit request =>
		productTypesDAO.remove(id)
		Ok("")
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
}
