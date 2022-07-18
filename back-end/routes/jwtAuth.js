const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../jwtGenerator");
const validInformation = require("../middleware/validInformation");

// register route
router.post("/register", validInformation, async (req, res) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [req.body.email]);

        if (user.rows.length !== 0) {
            return res.status(401).json("Utilisateur déjà existant");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [
            req.body.username,
            req.body.email,
            bcryptPassword,
        ]);

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// login route
router.post("/login", validInformation, async (req, res) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Mot de passe ou email incorrect");
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.rows[0].password);

        if (!correctPassword) {
            return res.status(401).json("Mot de passe ou email incorrect");
        }

        const token = jwtGenerator(user.rows[0].id);
        console.log(user);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;


