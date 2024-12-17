CREATE SCHEMA IF NOT EXISTS Project; 

CREATE TABLE Project.Categories (
    categoryID serial PRIMARY KEY,
    categoryName VARCHAR(255) NOT NULL
);

CREATE TABLE Project.Suppliers (
    supplierID serial PRIMARY KEY,
    supplierName VARCHAR(255) NOT NULL,
    contactInfo TEXT NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE Project.Users (
    userID serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'standard_user',
    createdAt DATE NOT NULL
);

CREATE TABLE Project.Equipments (
    equipmentID serial PRIMARY KEY,
    equipmentName VARCHAR(255) NOT NULL,
    equipmentImgPath VARCHAR(500), 
    rating INT NOT NULL DEFAULT 5,
    modelNumber INT,
    purchaseDate DATE,
    quantity INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    categoryID INT,
    supplierID INT,
    FOREIGN KEY (categoryID) REFERENCES Project.Categories(categoryID) ON DELETE SET NULL,
    FOREIGN KEY (supplierID) REFERENCES Project.Suppliers(supplierID) ON DELETE SET NULL
);

CREATE TABLE Project.Orders (
    orderID serial PRIMARY KEY,
    userID INT NOT NULL,
    date timestamp NOT NULL,
    FOREIGN KEY (userID) REFERENCES Project.Users(userID) ON DELETE CASCADE
);

CREATE TABLE Project.Carts (
    cartID serial PRIMARY KEY,
    userID INT NOT NULL,
    equipmentID INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES Project.Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (equipmentID) REFERENCES Project.Equipments(equipmentID) ON DELETE CASCADE
);

CREATE TABLE Project.Ratings (
    ratingID serial PRIMARY KEY,
    userID INT NOT NULL,
    equipmentID INT NOT NULL,
    comment TEXT,
    score INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES Project.Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (equipmentID) REFERENCES Project.Equipments(equipmentID) ON DELETE CASCADE
);

CREATE TABLE Project.EquipmentOrders (
    orderID INT NOT NULL,
    equipmentID INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (orderID, equipmentID),
    FOREIGN KEY (orderID) REFERENCES Project.Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY (equipmentID) REFERENCES Project.Equipments(equipmentID) ON DELETE CASCADE
);
CREATE TABLE if not exists Project.Session
(
    "id" serial primary key,
    "userId" integer not null,
    "token" text not null,
    "expiresAt" timestamp not null
);