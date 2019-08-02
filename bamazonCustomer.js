const mysql = require ('mysql')
const inquirer = require ('inquirer')


const connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

function minusInventory () {
    inquirer.prompt ([
        {
            name: 'id',
            type: 'input',
            message: 'Enter product ID'
        },
        {
            name: 'quanity',
            type: 'input',
            message: 'How many items would you like to order?'
        },
    ])
    .then(function (input) {
        connection.query('SELECT * FROM products', (err , res) => {
            if (err) {
                throw err
            }
        let item
        for (var i = 0; i < res.length; i++) {
            if (res[i].itemID === parseInt(input.id)) {
                item = res[i]
            }
        }
        if (item.stockQuanity > parseInt(input.quanity)) {
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stockQuanity: (item.stockQuanity - parseInt(input.quanity))
                },
                {
                  itemID: item.itemID
                }
              ],
              function(error) {
                if (error) {
                    throw error
                }
                  console.log("Thank you for your business! Your total is " + "$" + parseInt(input.quanity) * item.price)
                  displayInventory()
              }
            )
          }
          else {
            console.log("We're sorry. We don't have enough in stock.")
            // make to bring you back somewhere
          }
    })
    })
}

function displayInventory () {
    connection.query('SELECT * FROM products', (err , res) => {
        if (err) {
            throw err
        }
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].itemID + " -- " + 
                        "Product: " + res[i].productName + " -- " + 
                        "Department: " + res[i].departmentName + " -- " + 
                        "Price: " + "$" + res[i].price + " -- " +
                        // What is Quanity anyways?
                        "Stock: " + res[i].stockQuanity)
            console.log('----------------------------------')
        }
        minusInventory()
    })
}

displayInventory()
