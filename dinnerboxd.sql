CREATE DATABASE IF NOT EXISTS dinnerboxd;
USE dinnerboxd;

CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    userImg VARCHAR(255),
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
    restaurantText TEXT,
    restaurantBanner VARCHAR(255),
    FK_userId INT,
    FK_categoryId INT,
    FK_modalityyId INT,
    FOREIGN KEY (FK_userId) REFERENCES User(id) ON DELETE CASCADE
    FOREIGN KEY (FK_categoryId) REFERENCES RestaurantCategory(categoryId) 
    FOREIGN KEY (FK_modalityId) REFERENCES RestaurantModality(modalityId) 
);

CREATE TABLE IF NOT EXISTS Review (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    reviewText TEXT NOT NULL,
    reviewRating INT NOT NULL,
    reviewDate VARCHAR(15) NOT NULL,
    FK_userId INT,
    FK_restaurantId INT,
    FOREIGN KEY (FK_userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (FK_restaurantId) REFERENCES Restaurant(RestaurantId) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS RestaurantOpenHour (
    openHoursId INT AUTO_INCREMENT PRIMARY KEY,
    hourOpen1 VARCHAR(5),
    hourClose1 VARCHAR(5),
    hourOpen2 VARCHAR(5),
    hourClose2 VARCHAR(5),
    hourOpen3 VARCHAR(5),
    hourClose3 VARCHAR(5),
    hourOpen4 VARCHAR(5),
    hourClose4 VARCHAR(5),
    hourOpen5 VARCHAR(5),
    hourClose5 VARCHAR(5),
    hourOpen6 VARCHAR(5),
    hourClose6 VARCHAR(5),
    hourOpen7 VARCHAR(5),
    hourClose7 VARCHAR(5),
    FK_restaurantId INT,
    FOREIGN KEY (FK_restaurantId) REFERENCES Restaurant(RestaurantId) ON DELETE CASCADE
    
);

CREATE TABLE IF NOT EXISTS RestaurantModality (
    modalityId INT AUTO_INCREMENT PRIMARY KEY,
    modality VARCHAR(30)
    
);


CREATE TABLE IF NOT EXISTS RestaurantCategory (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(30)
);