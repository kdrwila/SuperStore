package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.libs.json._
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import utils.auth.DefaultEnv
import daos.UsersDAO
import models.Users

import scala.concurrent.Future

/**
 * The basic application controller.
 *
 * @param messagesApi The Play messages API.
 * @param silhouette The Silhouette stack.
 * @param socialProviderRegistry The social provider registry.
 */
class ApplicationController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv],
  socialProviderRegistry: SocialProviderRegistry,
  usersDAO: UsersDAO
)
    extends Controller with I18nSupport {

  implicit val usersWrites = new Writes[Option[models.Users]] {
    def writes(option: Option[Users]) = Json.obj(
      "id" -> option.get.id,
      "name" -> option.get.name,
      "surname" -> option.get.surname,
      "email" -> option.get.email
    )
  }

  /**
   * Returns the user.
   *
   * @return The result to display.
   */
  def user = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(Json.toJson(request.identity)))
  }

  /**
   * Manages the sign out action.
   */
  def signOut = silhouette.SecuredAction.async { implicit request =>
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, Ok)
  }

  def getUserWithEmail(email: String) = Action.async { implicit request =>
    usersDAO.getWithEmail(email) map
      { user =>
        Ok(Json.toJson(user))
      }
  }
}
