const mysql = require('mysql2')

//create a connnection to database 
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'onestore',
        password: 'Praju123#'
    })

    connection.connect((err)=>{
        if (err) console.log(err);

        console.log("Connected to DB test");
    })

module.exports = connection