CREATE DATABASE IF NOT EXISTS dinnerboxd;
USE dinnerboxd;

CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
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