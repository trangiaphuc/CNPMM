CREATE TABLE `roles` (
  `roleId` int,
  `name` varchar(255),
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `users` (
  `userId` int,
  `username` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `firstName` varchar(255),
  `lastName` varchar(255),
  `phone` varchar(255),
  `dirthday` date,
  `addressId` int,
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `user_role` (
  `roleId` int,
  `userId` int,
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `address` (
  `addressId` int,
  `peovince` varchar(255),
  `district` varchar(255),
  `ward` varchar(255),
  `flatNumber` varchar(255),
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `foodCategories` (
  `catId` int,
  `catName` varchar(255),
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `foods` (
  `foodId` int,
  `catId` int,
  `foodPic` varchar(255),
  `foodName` varchar(255),
  `foodDesc` varchar(255),
  `foodCalories` float,
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `foodMaterials` (
  `foodMaterialId` int,
  `foodId` int,
  `foodMaterialName` varchar(255),
  `productId` int,
  `quantity` float,
  `quantityName` int
);

CREATE TABLE `quantity` (
  `quantityId` int,
  `quantityName` varchar(255),
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `foodCookSteps` (
  `foodCookStepId` int,
  `foodId` int,
  `stepNumber` int,
  `stepDesc` varchar(255)
);

CREATE TABLE `productCategories` (
  `catId` int,
  `catName` varchar(255),
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `products` (
  `proId` int,
  `catId` int,
  `proPic` varchar(255),
  `proName` varchar(255),
  `proDesc` varchar(255),
  `quantity` float,
  `quantityName` int,
  `price` float,
  `brand` varchar(255),
  `productionIn` varchar(255),
  `expireAt` date,
  `manual` varchar(255),
  `preserve` varchar(255),
  `createAt` datetime,
  `updateAt` datetime
);

CREATE TABLE `favoriteFoodCategories` (
  `favId` int,
  `userId` int,
  `foodCatId` int,
  `createAt` datetime,
  `updateAt` datetime
);

ALTER TABLE `users` ADD FOREIGN KEY (`addressId`) REFERENCES `address` (`addressId`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `foods` ADD FOREIGN KEY (`foodId`) REFERENCES `foodCategories` (`catId`);

ALTER TABLE `foodMaterials` ADD FOREIGN KEY (`foodId`) REFERENCES `foods` (`foodId`);

ALTER TABLE `foodMaterials` ADD FOREIGN KEY (`quantityName`) REFERENCES `quantity` (`quantityId`);

ALTER TABLE `foodCookSteps` ADD FOREIGN KEY (`foodId`) REFERENCES `foods` (`foodId`);

ALTER TABLE `products` ADD FOREIGN KEY (`catId`) REFERENCES `productCategories` (`catId`);

ALTER TABLE `foodMaterials` ADD FOREIGN KEY (`productId`) REFERENCES `products` (`proId`);

ALTER TABLE `products` ADD FOREIGN KEY (`quantityName`) REFERENCES `quantity` (`quantityId`);

ALTER TABLE `favoriteFoodCategories` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `favoriteFoodCategories` ADD FOREIGN KEY (`foodCatId`) REFERENCES `foodCategories` (`catId`);
