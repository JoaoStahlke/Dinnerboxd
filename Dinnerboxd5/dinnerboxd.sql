CREATE DATABASE IF NOT EXISTS dinnerboxd;
USE dinnerboxd;

CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Restaurant (
    restaurantId INT AUTO_INCREMENT PRIMARY KEY,
    restaurantDocument VARCHAR(255) NOT NULL,
    restaurantPhone VARCHAR(255) NOT NULL,
    restaurantLink VARCHAR(255) NOT NULL,
    cityAddress VARCHAR(255) NOT NULL,
    streetAddress VARCHAR(255) NOT NULL,
    districtAddress VARCHAR(255) NOT NULL,
    numberAddress VARCHAR(255) NOT NULL,
    FK_userId INT,
    FOREIGN KEY (FK_userId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Review (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    reviewText TEXT NOT NULL,
    reviewRating INT NOT NULL,
    reviewDate VARCHAR(20) NOT NULL,
    FK_userId INT,
    FK_restaurantId INT,
    FOREIGN KEY (FK_userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (FK_restaurantId) REFERENCES Restaurant(RestaurantId) ON DELETE CASCADE


);


