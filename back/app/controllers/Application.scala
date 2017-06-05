package controllers

import javax.inject.Inject

import daos.ProductsDAO
import models.ProductsREST
import models.Products
import play.api.libs.json.Json
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Application @Inject() (productsDAO: ProductsDAO) extends Controller
{
//  def index = Action { implicit request =>
//    Ok(request.body)
//  }

  def index = Action { implicit request =>
    Ok(views.html.index.render(""))
  }

  def listproducts = Action.async { implicit  request =>
    productsDAO.all map {
      products => Ok(Json.toJson(products))
    }
  }

  def getproduct(id: Long) = Action.async { implicit request =>
    productsDAO.get(id) map
    {
      products => Ok(Json.toJson(products))
    }
  }

  def newproduct = Action { implicit request =>
    var json:ProductsREST = request.body.asJson.get.as[ProductsREST]
    var product = Products(prodId = 0, tytul = json.tytul, opis = json.opis)
    productsDAO.insert(product)
    Ok(request.body.asJson.get)
  }
}
