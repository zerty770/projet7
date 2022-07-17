/* Import des modules necessaires */
const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

const articleCtrl = require("../controllers/article")

/* Routage Article */
router.get("/", auth, articleCtrl.getAllArticle)
router.get("/:id", auth, articleCtrl.getOneArticle)
router.post("/", auth, multer, articleCtrl.createArticle)
router.put("/:id", auth, multer, articleCtrl.modifyArticle)
router.delete("/:id", auth, articleCtrl.deleteArticle)
router.post("/:id/like", auth, articleCtrl.likeDislikeArticle)

module.exports = router