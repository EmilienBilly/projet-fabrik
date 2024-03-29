module.exports = function (req, res, next) {
    const { email, username, password } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![email, username, password].every(Boolean)) {
            return res.json("Email ou mot de passe manquant");
        } else if (!validEmail(email)) {
            return res.json("Addresse Email non valide");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.json("Email ou mot de passe manquant");
        } else if (!validEmail(email)) {
            return res.json("Addresse Email non valide");
        }
    }

    next();
};
