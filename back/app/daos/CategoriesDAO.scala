package daos

import javax.inject.Inject

import models.{ Categories, CategoriesREST, CategoriesPOST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }

/**
 * Created by kprzystalski on 23/04/17.
 */

class CategoriesDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val Categories = TableQuery[CategoriesTable]

  def all(implicit ec: ExecutionContext): Future[List[CategoriesREST]] =
    {
      val query = Categories
      val results = query.result
      val futureCategories = db.run(results)
      futureCategories.map(
        _.map {
        a => CategoriesREST(catId = a.catId, opis = a.opis, tytul = a.tytul)
      }.toList
      )
    }

  def get(id: Long): Future[Option[Categories]] =
    {
      val query = Categories.filter(_.catId === id)
      val result = query.result
      db.run(result.headOption)
    }

  def insert(category: Categories): Future[Unit] = db.run(Categories += category).map { _ => () }

  def update(category: Categories): Future[Unit] = db.run {
    val query = for { c <- Categories if c.catId === category.catId } yield c
    query.update(category).map(_ => ())
  }

  def remove(id: Long): Future[Unit] = db.run {
    val query = for { c <- Categories if c.catId === id } yield c
    query.delete.map(_ => ())
  }

  class CategoriesTable(tag: Tag) extends Table[Categories](tag, "Categories") {
    def catId = column[Long]("catId", O.AutoInc, O.AutoInc)
    def tytul = column[String]("tytul")
    def opis = column[String]("opis")
    def * = (catId, tytul, opis) <> (models.Categories.tupled, models.Categories.unapply)
  }

}
