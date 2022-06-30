require("dotenv").config();

const express = require("express");
const metiersRoutes = require("./routes/metiers");

// Express app
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log("passing middleware");
    next();
});

// Routes
app.use("/api/metiers", metiersRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("listening on port 4000");
});

process.env;
