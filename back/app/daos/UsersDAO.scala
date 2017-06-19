package daos

import javax.inject.Inject

import models.{ Users, UsersREST }
import play.api.db.slick.{ DatabaseConfigProvider, HasDatabaseConfigProvider }
import slick.driver.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{ ExecutionContext, Future }
import scala.util.Try
import scala.util.Success
import scala.util.Failure

/**
 * Created by kprzystalski on 23/04/17.
 */

class UsersDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  import driver.api._

  val Users = TableQuery[UsersTable]

  def getWithEmail(email: String): Future[Option[Users]] =
    {
      val query = Users.filter(_.email === email)
      val result = query.result
      db.run(result.headOption)
    }

  def insert(user: Users)(implicit ec: ExecutionContext): Unit =
    {
      val q = Users.filter(a => a.email === user.email)
      val result = q.result
      val futureUsers = db.run(result.headOption.asTry)

      futureUsers.map { result =>
        result match {
          case Success(user_) =>
            {
              if (user_ == None) {
                db.run(Users += user).map { _ => () }
              } else {
                val usr = models.Users(user_.get.id, user.name, user.surname, user.email)

                db.run {
                  val query = for { u <- Users if u.email === user.email } yield u
                  query.update(usr).map(_ => ())
                }
              }
            }
          case Failure(user_) => {}
        }
      }
    }

  def remove(id: Long): Future[Unit] = db.run {
    val query = for { u <- Users if u.id === id } yield u
    query.delete.map(_ => ())
  }

  class UsersTable(tag: Tag) extends Table[Users](tag, "Users") {
    def id = column[Long]("id", O.AutoInc, O.AutoInc)
    def name = column[Option[String]]("name")
    def surname = column[Option[String]]("surname")
    def email = column[Option[String]]("email")
    def * = (id, name, surname, email) <> (models.Users.tupled, models.Users.unapply)
  }

}
