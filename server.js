// Requires
const express = require("express");
//const fs      = require("fs");
//const path    = require("path");

// Start Express Server on Port...
const app  = express();
const PORT = process.env.PORT || 3001;

// Middleware...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Require routes file
require("./routes/routes")(app);

// App Listens on Port...
app.listen(PORT, function() {
    console.log("Express Server on PORT: " + PORT);
});