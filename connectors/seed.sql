INSERT INTO Project.Categories (categoryName)
VALUES
('Mechanical'),
('Electrical'),
('Civil'),
('Electronics'),
('IT'),
('Instrumentation'),
('Automobile'),
('Textile'),
('Aerospace'),
('Chemical');

INSERT INTO Project.Suppliers (supplierName, contactInfo, address)
VALUES
('Supplier A', 'contact@supplierA.com', '123 Main St, City A'),
('Supplier B', 'contact@supplierB.com', '456 Oak St, City B'),
('Supplier C', 'contact@supplierC.com', '789 Pine St, City C'),
('Supplier D', 'contact@supplierD.com', '101 Maple Ave, City D'),
('Supplier E', 'contact@supplierE.com', '202 Elm St, City E'),
('Supplier F', 'contact@supplierF.com', '303 Birch Rd, City F'),
('Supplier G', 'contact@supplierG.com', '404 Cedar St, City G'),
('Supplier H', 'contact@supplierH.com', '505 Spruce St, City H'),
('Supplier I', 'contact@supplierI.com', '606 Walnut St, City I'),
('Supplier J', 'contact@supplierJ.com', '707 Chestnut St, City J');

INSERT INTO Project.Users (username, email, password, role, createdAt)
VALUES
('admin1', 'admin1@example.com', 'hashedpassword1', 'admin', '2023-01-01'),
('user1', 'user1@example.com', 'hashedpassword2', 'standard', '2023-02-01'),
('user2', 'user2@example.com', 'hashedpassword3', 'standard', '2023-03-01'),
('admin2', 'admin2@example.com', 'hashedpassword4', 'admin', '2023-04-01'),
('user3', 'user3@example.com', 'hashedpassword5', 'standard', '2023-05-01'),
('user4', 'user4@example.com', 'hashedpassword6', 'standard', '2023-06-01'),
('user5', 'user5@example.com', 'hashedpassword7', 'standard', '2023-07-01'),
('admin3', 'admin3@example.com', 'hashedpassword8', 'admin', '2023-08-01'),
('user6', 'user6@example.com', 'hashedpassword9', 'standard', '2023-09-01'),
('user7', 'user7@example.com', 'hashedpassword10', 'standard', '2023-10-01');

INSERT INTO Project.Equipments (equipmentName, equipmentImgPath, rating, modelNumber, purchaseDate, quantity, status, location, categoryID, supplierID)
VALUES
('3D Printer', '/images/3d_printer.jpg', 5, 1001, '2022-01-15', 2, 'In Use', 'Lab A', 1, 1),
('Microscope', '/images/microscope.jpg', 4, 2002, '2021-11-20', 5, 'Available', 'Lab B', 2, 2),
('Oscilloscope', '/images/oscilloscope.jpg', 5, 3003, '2020-05-10', 3, 'Under Maintenance', 'Lab C', 3, 3),
('Laptop', '/images/laptop.jpg', 4, 4004, '2019-09-25', 10, 'Available', 'Office', 4, 4),
('Projector', '/images/projector.jpg', 5, 5005, '2018-03-18', 7, 'In Use', 'Conference Room', 5, 5),
('Drill Machine', '/images/drill_machine.jpg', 5, 6006, '2023-06-01', 1, 'Available', 'Workshop', 6, 6),
('Air Conditioner', '/images/air_conditioner.jpg', 3, 7007, '2018-07-12', 4, 'Under Maintenance', 'Lab D', 7, 7),
('Multimeter', '/images/multimeter.jpg', 5, 8008, '2021-12-01', 8, 'Available', 'Lab E', 3, 8),
('Thermal Camera', '/images/thermal_camera.jpg', 4, 9009, '2020-02-22', 2, 'In Use', 'Lab F', 8, 9),
('Router', '/images/router.jpg', 5, 1010, '2022-08-15', 6, 'Available', 'Server Room', 9, 10);

INSERT INTO Project.Orders (userID, date)
VALUES
(2, '2023-01-01'),
(3, '2023-02-15'),
(4, '2023-03-20'),
(5, '2023-04-10'),
(6, '2023-05-25'),
(7, '2023-06-30'),
(8, '2023-07-18'),
(9, '2023-08-05'),
(10, '2023-09-12'),
(2, '2023-10-01');

INSERT INTO Project.Carts (userID, equipmentID, quantity)
VALUES
(2, 1, 1),
(3, 2, 2),
(4, 3, 1),
(5, 4, 1),
(6, 5, 1),
(7, 6, 3),
(8, 7, 2),
(9, 8, 1),
(10, 9, 1),
(2, 10, 1);

INSERT INTO Project.Ratings (userID, equipmentID, comment, score)
VALUES
(2, 1, 'Excellent performance!', 5),
(3, 2, 'Very accurate.', 4),
(4, 3, 'Needs maintenance.', 3),
(5, 4, 'Great for office use.', 4),
(6, 5, 'Easy to use.', 5),
(7, 6, 'Very reliable.', 5),
(8, 7, 'Cooling is slow.', 3),
(9, 8, 'Highly recommend.', 5),
(10, 9, 'Good quality.', 4),
(2, 10, 'Fast and efficient.', 5);

INSERT INTO Project.EquipmentOrders (orderID, equipmentID, quantity)
VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 2),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 2);