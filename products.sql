DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(13, 2),
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Laptop computer", "Electronics", 1499.99, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Desktop Computer", "Electronics", 2499.99, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Vinyl Record", "Music", 24.99, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Set of Tires", "Automobile", 249.99, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("A Textbook", "Entertainment", 499.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("A Popular Paperback", "Entertainment", 7.99, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("A Classic of the Western Canon", "Entertainment", 19.99, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("An AAA Videogame Relese", "Entertainment", 59.99, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("A Videogame from a Developer Trying Their Best", "Entertainment", 29.99, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("A Plant", "Home and Garden", 9.99, 25);

SELECT * FROM products;