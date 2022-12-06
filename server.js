
// Importing Modules
const mysql = require("mysql");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config();

// importing files
const routes = require('./routes');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
// mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/my_database', {
//     useNewUrlParser: true
// });

const db = mysql.createConnection({

    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  
  });

  db.connect(function (error) {
    if (!!error) {
      console.log(error);
    } else {
      console.log("Connected!:) " + host);
      console.log("database) " + meteor_db);
    }
  });

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});