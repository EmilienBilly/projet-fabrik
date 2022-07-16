require("dotenv").config();

const express = require("express");
const metiersRoutes = require("./routes/metiers");
const jwtAuth = require("./routes/jwtAuth");
const cors = require("cors");

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/metiers", metiersRoutes);
app.use("/auth", jwtAuth);

// listen for requests
app.listen(process.env.PORT, () => {});

process.env;
