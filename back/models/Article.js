/* Import des modules necessaires */
const mongoose = require("mongoose")

/* Schema article */
const ModelArticle = mongoose.Schema({
  Id: { type: String, required: true },
  utilisateurId: { type: String, required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  utilisateursLiked: { type: ["String <utilisateurId>"], required: true },
})

module.exports = mongoose.model("article", ModelArticle)