# --- !Ups

CREATE TABLE `Categories` (
  `catId` int(11) NOT NULL,
  `tytul` varchar(128) NOT NULL,
  `opis` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Products` (
  `prodId` int(11) NOT NULL,
  `tytul` varchar(128) NOT NULL,
  `opis` text NOT NULL,
  `catId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Categories`
  ADD PRIMARY KEY (`catId`);

ALTER TABLE `Products`
  ADD PRIMARY KEY (`prodId`);

ALTER TABLE `Categories`
  MODIFY `catId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Products`
  MODIFY `prodId` int(11) NOT NULL AUTO_INCREMENT;

# --- !Downs

DROP TABLE Products;
DROP TABLE Categories;