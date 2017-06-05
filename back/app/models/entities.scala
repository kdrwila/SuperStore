package models

import java.sql.Timestamp

import play.api.libs.json.Format

/**
  * Created by kprzystalski on 23/04/17.
  */

case class Products(prodId: Long, tytul: String, opis: String)

//, catId: Long, createdAt: Timestamp

case class Categories(catId: Long, tytul: String, opis: String)

//case class Purchases(purId: Long, prodId: Long, userId: Long)

//case class Users(userId: Long, username: String)