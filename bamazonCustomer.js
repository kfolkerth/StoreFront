var mysql = require('mysql');
var inquire = require('inquirer');
require("dotenv").config();
var keys = require('./keys.js');

//initializes connection to mysql database
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,

    user: "root",
    password: keys.db.password,

    database: "bamazon"
});

var products = [];

//queries database to populate products array with all current products and their attributes
function getProducts() {
    
    connection.query(
        'SELECT * FROM products',
        function(err, results) {
            if (err) throw (err);

            results.forEach(function(item) {
                
                var newProduct = {
                    id : item.item_id,
                    name : item.product_name,
                    department : item.department_name,
                    price : item.price,
                    stock : item.stock_quantity
                };
                products.push(newProduct);
                
            });
            userPurchase();
        }
    )
}

//uses inquirer to prompt the user to which product they'd like to purchase and in how many quantities
function userPurchase() {
    var productDisplay = [];
    var productID = "";
    var quantity = "";

    products.forEach(function(product) {
        var productFormat = product.id + ". " + product.name;
        productDisplay.push(productFormat);
    });

    var purchasePrompt = {
        type : 'list',
        name : 'item',
        message : 'Which item would you like to purchase?',
        choices : productDisplay
    }
    
    inquire.prompt(purchasePrompt).then(function(answers) {
        productID = parseInt(answers.item.slice(0, 1));
        
        var quantityPrompt = {
            type : 'input',
            name : 'quantity',
            message : 'How many would you like to purchase?'
        }
        inquire.prompt(quantityPrompt).then(function(answers) {
            quantity = parseInt(answers.quantity);
            processPurchase(productID, quantity);
        });
    });
}

//receives the id of the product selected and the quantity from userPurchase() and then attempts to process the user's order
function processPurchase(id, quantity) {

    var productSelected;
    
    for (i = 0; i < products.length; i++) {

        if (products[i].id == id) {
            productSelected = products[i];
            break
        }
    };
    
    if (productSelected.stock < quantity) { //checks to see if the store's stock is sufficient to meet user demand
        console.log("Insufficient quantity. Your purchase could not be completed at this time.");
        connection.end();
    } else {
        var total = productSelected.price * quantity; 
        console.log("Thank you for your purchase. Your total is: $" + parseFloat(total).toFixed(2));
        connection.query(  //updates mysql database if quantity is sufficient
            'UPDATE products SET ? WHERE ?',
            [
            {
                stock_quantity : (productSelected.stock - quantity)
            },
            {
                item_id : productSelected.id
            }
            ],

            function(err, results) {
                if (err) console.log(err);
                console.log("Purchase complete.");
                connection.end();
            }
        )
    }
}

getProducts();