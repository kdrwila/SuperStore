package daos

import javax.inject.Inject

import models.{ProductTypes, ProductTypesREST}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ExecutionContext, Future}

class ProductTypesDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
	extends HasDatabaseConfigProvider[JdbcProfile] {

	import driver.api._

	val ProductTypes = TableQuery[ProductTypesTable]

	def all(implicit ec: ExecutionContext): Future[List[ProductTypesREST]] = 
	{
		val query =  ProductTypes
		val results = query.result
		val futureProducts = db.run(results)
		futureProducts.map(
			_.map {
				a => ProductTypesREST(type_id = a.type_id, title = a.title, price = a.price, quantity = a.quantity, product_id = a.product_id)
			}.toList)
	}

	def get(id: Long): Future[Option[ProductTypes]] =
	{
		val query = ProductTypes.filter(_.type_id === id)
		val result = query.result
		db.run(result.headOption)
	}

	def getForProduct(productId: Long): Future[List[ProductTypesREST]] =
	{
		val query = ProductTypes.filter(_.product_id === productId)
		val results = query.result
		val futureProductTypes = db.run(results)

		futureProductTypes.map(
			_.map
			{
				a => ProductTypesREST(type_id = a.type_id, title = a.title, price = a.price, quantity = a.quantity, product_id = a.product_id)
			}.toList
		)
	}

	def insert(productType: ProductTypes): Future[Unit] = db.run(ProductTypes += productType).map { _ => () }

	def update(productType: ProductTypes): Future[Unit] = db.run {
		val query = for { p <- ProductTypes if p.type_id === productType.type_id } yield p
		query.update(productType).map(_ => ())
	}

	def remove(id: Long): Future[Unit] = db.run {
		val query = for { p <- ProductTypes if p.type_id === id } yield p
		query.delete.map(_ => ())
	}

	class ProductTypesTable(tag: Tag) extends Table[ProductTypes](tag, "ProductTypes") 
	{
		def type_id = column[Long]("type_id", O.AutoInc, O.AutoInc)
		def title = column[String]("title")
		def price = column[Long]("price")
		def quantity = column[Long]("quantity")
		def product_id = column[Long]("product_id")
		def * = (type_id, title, price, quantity, product_id) <> (models.ProductTypes.tupled, models.ProductTypes.unapply)
	}

}
