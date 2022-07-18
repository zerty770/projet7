/** Import des modules nécessaires */
import Axios from './caller.service'


let getAllArticle = () => {
    return Axios.get('/articles')
}

let getArticle = (cid) => {
    return Axios.get('/articles/'+cid)
}

let updateArticle = (article) => {
    return Axios.patch('/articles/'+article.id, article)
}

let createArticle = (article) => {
    return Axios.put('/articles', article)
}

let deleteArticle = (aid) => {
    return Axios.delete('/articles/'+aid)
}

export const articleService = {
    getAllArticle,
    getArticle,
    updateArticle,
    createArticle,
    deleteArticle,
}