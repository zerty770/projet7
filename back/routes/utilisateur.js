/* Import des modules necessaires */
const express = require("express")
const router = express.Router()

const utilisateurCtrl = require("../controllers/utilisateur")

/* Routage utilisateur */
router.post("/signup", utilisateurCtrl.signup)
router.post("/login", utilisateurCtrl.login)

module.exports = router