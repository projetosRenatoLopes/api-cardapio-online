const mysql = require('mysql')
const dataBase = mysql.createConnection({
    host: "postgres://gdtiwcjl:vpD7PrBmK8HyzlZbdt8qKU4W9kjDAtba@motty.db.elephantsql.com/gdtiwcjl",
    user: "gdtiwcjl",
    password: "vpD7PrBmK8HyzlZbdt8qKU4W9kjDAtba",
    database: "gdtiwcjl"
})

module.exports = dataBase;