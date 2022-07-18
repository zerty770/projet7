<template>
    <div>        
        <h1>Création d'un utilisateur</h1>
        <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes</b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <form @submit.prevent="ajout">    
            <div class="formGroup">
                <label for="article_titre">titre</label>
                <input type="text" id="article_titre" v-model="article.titre"/>
            </div>
            <div class="formGroup">
                <label for="article_description">description</label>
                <input type="text" id="article_description" v-model="article.description"/>
            </div>
            <div class="formGroup">
                <label for="article_imageUrl">imageUrl</label>
                <input type="text" id="article_imageUrl" v-model="article.imageUrl"/>
            </div>
            <div class="formGroup">
                <label for="article_likes">likes</label>
                <input type="text" id="article_likes" v-model="article.likes"/>
            </div>
            <div class="formGroup">
                <label for="confirme">Vérification</label>
                <input type="text" id="confirme" v-model="confirme"/>
            </div>
            <div class="formGroup">
                <button type="submit" class="button">Créer l'utilisateur</button>
            </div>
        </form>
    </div>
</template>

<script>
import { articleService } from '@/_service'
export default {
    name: 'articleAdd',
    data(){
        return {
            user: {
                nom:'',
                prenom:'',
                pseudo:'',
                email:'',
                password:''
            },
            confirme:'',
            errors:[]
        }
    },
    methods: {
        ajout(){
            console.log(this.article, this.confirme)
            this.errors = []

            if(this.errors.length == 0){
                articleService.createUser(this.article)
                    .then(res => this.$router.push({name: 'uList'}))
                    .catch(err => console.log(err))
            }
        }
    }
}
</script>

<style>

</style>