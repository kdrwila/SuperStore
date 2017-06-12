# --- !Ups

CREATE TABLE `BasketProducts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `BasketProducts`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `BasketProducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

# --- !Downs

DROP TABLE IF EXISTS BasketProducts;