package controllers

import javax.inject.Inject

import daos.BasketProductsDAO
import models.BasketProductsPOST
import models.BasketProducts
import play.api.libs.json._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Basket @Inject() (basketProductsDAO: BasketProductsDAO) extends Controller
{
	def getBasketForUser(id: Long) = Action.async
    { implicit request =>
        basketProductsDAO.getForUser(id) map
        { products =>
            println(products)
            Ok(Json.toJson(products))
        }
    }

    def insertBasketProduct = Action 
	{ implicit request =>
		var json:BasketProductsPOST = request.body.asJson.get.as[BasketProductsPOST]
		var product = BasketProducts(id = 0, user_id = json.user_id, quantity = json.quantity, product_id = json.product_id, type_id = json.type_id)
		basketProductsDAO.insert(product)
		Ok(request.body.asJson.get)
	}
}
