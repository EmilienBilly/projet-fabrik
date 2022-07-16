const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (id) => {
    const payload = {
        user: id,
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expireIn: "1hr" });
};

module.exports = jwtGenerator;

