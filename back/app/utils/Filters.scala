// package utils

// import javax.inject.Inject

// import play.api.http.HttpFilters
// import play.api.mvc.EssentialFilter
// import play.filters.csrf.CSRFFilter
// import play.filters.headers.SecurityHeadersFilter

// /**
//  * Provides filters.
//  */
// class Filters @Inject() (csrfFilter: CSRFFilter, securityHeadersFilter: SecurityHeadersFilter) extends HttpFilters {
//   override def filters: Seq[EssentialFilter] = Seq(csrfFilter, securityHeadersFilter)
// }

/**
 * Created by kprzystalski on 05/05/17.
 */
package utils

import javax.inject.Inject

import play.api.http.HttpFilters
import play.filters.cors.CORSFilter

class Filters @Inject() (corsFilter: CORSFilter) extends HttpFilters {
  def filters = Seq(corsFilter)
}
