const mysql = require ('mysql')
const inquirer = require ('inquirer')


const connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

connection.query('SELECT * FROM products', (err,res) => {
    if(err) {
        throw err
    }
    console.log(res)
  })