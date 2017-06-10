package daos

import javax.inject.Inject

import models.{ BasketProducts, BasketProductsREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

class BasketProductsDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
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
				a => BasketProductsREST(id = a.id, user_id = a.user_id, quantity = a.quantity, product_id = a.product_id)
			}.toList)
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
			_.map
			{
				a => BasketProductsREST(id = a.id, user_id = a.user_id, quantity = a.quantity, product_id = a.product_id)
			}.toList
		)
	}

	def insert(basketProduct: BasketProducts): Future[Unit] = db.run(BasketProducts += basketProduct).map { _ => () }

	def update(basketProduct: BasketProducts): Future[Unit] = db.run {
		val query = for { p <- BasketProducts if p.id === basketProduct.id } yield p
		query.update(basketProduct).map(_ => ())
	}

	def remove(id: Long): Future[Unit] = db.run {
		val query = for { p <- BasketProducts if p.id === id } yield p
		query.delete.map(_ => ())
	}

	class BasketProductsTable(tag: Tag) extends Table[BasketProducts](tag, "BasketProducts") 
	{
		def id = column[Long]("id", O.AutoInc, O.AutoInc)
		def user_id = column[Long]("user_id")
		def quantity = column[Long]("quantity")
		def product_id = column[Long]("product_id")
		def * = (id, user_id, quantity, product_id) <> (models.BasketProducts.tupled, models.BasketProducts.unapply)
	}

}
