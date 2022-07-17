/* Import des modules necessaires */
const Utilisateur = require("../models/Utilisateur")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/**
 * Création utilisateur
 */
exports.signup = (req, res, next) => {
    const { email, password } = req.body

    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'Bad email or password'})
    }

    // Hashage du mot de passe utilisateur
    bcrypt.hash(req.body.password, parseInt(process.env.BRYPT_SALT_ROUND))
      .then((hash) => {
        const utilisateur = new Utilisateur({
          email: req.body.email,
          password: hash,
        })

        // Creation de l'utilisateur
        utilisateur.save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };

/**
 * Connexion utilisateur
 */
exports.login = (req, res, next) => {
    const { email, password } = req.body

    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'Bad email or password'})
    }

    // Verification utilisateur existant
    Utilisateur.findOne({ email: req.body.email })
        .then((utilisateur) => {
            if (!utilisateur) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }

            // Verification mot de passe utilisateur
            bcrypt.compare(req.body.password, utilisateur.password)
                .then((valid) => {
                    if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }

                    // Connection valide
                    res.status(200).json({
                        utilisateurId: utilisateur._id,
                        token: jwt.sign({ utilisateurId: utilisateur._id ,role}, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_DURING,
                        }),
                    })
                })
            .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}