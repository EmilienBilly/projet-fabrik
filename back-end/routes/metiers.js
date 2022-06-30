const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "GET tous les métiers" });
    console.log("j'ai bien reçu");
});

router.get("/:id", (req, res) => {
    res.json({ message: "GET un seul métiers" });
});

module.exports = router;
