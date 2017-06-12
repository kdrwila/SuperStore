# --- !Ups

CREATE TABLE `ProductTypes` (
  `type_id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `ProductTypes`
  ADD PRIMARY KEY (`type_id`);

ALTER TABLE `ProductTypes`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;

# --- !Downs

DROP TABLE IF EXISTS ProductTypes;