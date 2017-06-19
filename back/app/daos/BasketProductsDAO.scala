package daos

import javax.inject.Inject

import models.{ BasketProducts, BasketProductsREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }
import scala.util.Try
import scala.util.Success
import scala.util.Failure

class BasketProductsDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val BasketProducts = TableQuery[BasketProductsTable]

  def all(implicit ec: ExecutionContext): Future[List[BasketProductsREST]] =
    {
      val query = BasketProducts
      val results = query.result
      val futureBasketProducts = db.run(results)
      futureBasketProducts.map(
        _.map {
        a => BasketProductsREST(id = a.id, user_id = a.user_id, quantity = a.quantity, product_id = a.product_id, type_id = a.type_id)
      }.toList
      )
    }

  def get(id: Long): Future[Option[BasketProducts]] =
    {
      val query = BasketProducts.filter(_.id === id)
      val result = query.result
      db.run(result.headOption)
    }

  def getForUser(userId: Long): Future[List[BasketProductsREST]] =
    {
      val query = BasketProducts.filter(_.user_id === userId)
      val results = query.result
      val futureBasketProducts = db.run(results)

      futureBasketProducts.map(
        _.map {
        a => BasketProductsREST(id = a.id, user_id = a.user_id, quantity = a.quantity, product_id = a.product_id, type_id = a.type_id)
      }.toList
      )
    }

  // def insert(basketProduct: BasketProducts): Future[Unit] = 
  // {
  // 	db.run(BasketProducts += basketProduct).map { _ => () }
  // }

  def insert(basketProduct: BasketProducts)(implicit ec: ExecutionContext): Unit =
    {
      val q = BasketProducts.filter(a => a.type_id === basketProduct.type_id && a.user_id === basketProduct.user_id)
      val result = q.result
      val futureBasketProduct = db.run(result.headOption.asTry)

      futureBasketProduct.map { result =>
        result match {
          case Success(product) =>
            {
              if (product == None) {
                db.run(BasketProducts += basketProduct).map { _ => () }
              } else {
                val bp = models.BasketProducts(product.get.id, basketProduct.user_id, basketProduct.quantity + product.get.quantity, basketProduct.product_id, basketProduct.type_id)

                db.run {
                  val query = for { p <- BasketProducts if p.id === bp.id && p.user_id === bp.user_id } yield p
                  query.update(bp).map(_ => ())
                }
              }
            }
          case Failure(product) => {}
        }
      }
    }

  def update(basketProduct: BasketProducts): Future[Unit] = db.run {
    val query = for { p <- BasketProducts if p.id === basketProduct.id } yield p
    query.update(basketProduct).map(_ => ())
  }

  def remove(id: Long): Future[Unit] = db.run {
    val query = for { p <- BasketProducts if p.id === id } yield p
    query.delete.map(_ => ())
  }

  def removeProduct(id: Long): Future[Unit] = db.run {
    val query = for { p <- BasketProducts if p.product_id === id } yield p
    query.delete.map(_ => ())
  }

  def removeType(id: Long): Future[Unit] = db.run {
    val query = for { p <- BasketProducts if p.type_id === id } yield p
    query.delete.map(_ => ())
  }

  class BasketProductsTable(tag: Tag) extends Table[BasketProducts](tag, "BasketProducts") {
    def id = column[Long]("id", O.AutoInc, O.AutoInc)
    def user_id = column[Long]("user_id")
    def quantity = column[Long]("quantity")
    def product_id = column[Long]("product_id")
    def type_id = column[Long]("type_id")
    def * = (id, user_id, quantity, product_id, type_id) <> (models.BasketProducts.tupled, models.BasketProducts.unapply)
  }

}
