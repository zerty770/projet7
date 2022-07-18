/* Import des modules necessaires */
const Article = require("../models/Article")
const fs = require("fs")
const { captureRejections } = require("events")

/**
 * Récupération des articles
 */
exports.getAllArticle = (req, res, next) => {
    Article.find()
      .then((articles) => res.status(200).json(articles))
      .catch((error) => res.status(400).json({error: error}))
}

/**
 * Création de article
 */
exports.createArticle = (req, res, next) => {
  const articleObject = JSON.parse(req.body.article)

  // Mise en place des datas
  const article = new Article({
    ...articleObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    // Initialisation valeur like-dislike 0
    likes: 0,
    utilisateursLiked: [],
  })

  // Enregistrement en base
  article.save()
    .then(() => res.status(201).json({ message: "Article enregistré !" }))
    .catch((error) => res.status(400).json({ error }))
}

/**
 * Récupération d'un article
 */
exports.getOneSaArticleuce = (req, res, next) => {
    // Recup article avec id
    Article.findOne({_id: req.params.id})
        .then((article) => {
            res.status(200).json(article)
        })
        .catch((error) => {res.status(404).json({error: error})})
}

/**
 * Modification d'une article
 */
exports.modifyArticle = (req, res, next) => {
  
    // Recup article avec id
  Article.findOne({ _id: req.params.id })
    .then((article) => {
        // Enregistrement ancienne imgUrl (si nouvelle image dans modif)
        const oldUrl = article.imageUrl
        // Recuperation du nom de l'image
        const filename = article.imageUrl.split("/images/")[1]

        // Suppression si image, dans le dossier local
        if (req.file) {
            fs.unlink(`images/${filename}`, () => {
            const articleObject = {
                ...JSON.parse(req.body.article),
                imageUrl: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                }`
            }
            
            Article.updateOne({ _id: req.params.id },{ ...articleObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: "Article mise à jour!" }))
                .catch((error) => res.status(400).json({ error }))
            })
        } else {
            const newItem = req.body
            newItem.imageUrl = oldUrl
            // MAJ de la article avec données modifiées
            Article.updateOne({ _id: req.params.id },{ ...newItem, imageUrl: oldUrl, _id: req.params.id })
                .then(() => res.status(200).json({ message: "Article mise à jour!" }))
                .catch((error) => res.status(400).json({ error }))
        }
    })
    .catch((error) => res.status(500).json({ error }))
};

/**
 * Suppression d'une article
 */
exports.deleteArticle = (req, res, next) => {
  
    Article.findOne({ _id: req.params.id })
        .then((article) => {
            // Suppression img article
            const filename = article.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                // Suppression article
                Article.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Article supprimé !" }))
                .catch((error) => res.status(400).json({ error }))
            })
        })
        .catch((error) => res.status(500).json({ error }))
};



/**
 * Gestion des like des article
 * Regle likeDislikeArticle : Like = 1 _ Dislike = -1 _ Pas de vote = 0
 */
// 
exports.likeDislikeArticle = (req, res, next) => {
  
    let likeDislike = parseInt(req.body.like);
 
    Article.findOne({_id: req.params.id})
        .then((article) => {
        
        if (likeDislike === 1) { // Si article like = 1
            article.likes++
            // sauvegarde utilisateurId 
            article.utilisateurLiked.push(req.body.utilisateurId);
            // MAJ de la article 
            Article.updateOne({ _id: req.params.id },
                {
                    likes: article.likes,
                    utilisateurLiked: article.utilisateurLiked,
                    _id: req.params.id,
                })
                .then(() => res.status(200).json({ message: "Tu likes ce produit !" }))
                .catch((error) => res.status(400).json({ error }));
           
        } else if (likeDislike === 0) { // verification et remise a zero article like et dislike
        
            // si utilisateurId est dans utilisateursLiked = utilisateur like
            if (article.utilisateursLiked.includes(req.body.utilisateurId)){
                article.likes--

                // utilisateurId est retirer du tableau
                const index = article.utilisateursLiked.indexOf(req.body.utilisateurId)
                article.utilisateursLiked.splice(index, 1)
          
                // MAJ de la article 
                Article.updateOne({ _id: req.params.id },
                    {
                        likes: article.likes,
                        utilisateursLiked: article.utilisateursLiked,
                        _id: req.params.id,
                    })
                    .then(() =>res.status(200).json({ message: "Tu ne like plus ce produit !" }))
                    .catch((error) => res.status(400).json({ error }))
            
            // si utilisateurId est dans utilisateursDisliked =utilisateur dislike
            } 
        }
    })
    .catch((error) => {res.status(404).json({error: error})})
}