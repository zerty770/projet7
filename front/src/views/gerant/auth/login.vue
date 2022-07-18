<template>
    <div>
        <h1>
            <span v-if="log">Connexion</span>
            <span v-if="!log">Se créer un compte</span>
        </h1>
        <form @submit.prevent="cnx">
            <div v-if="!log" class="formGroup">
                <label for="utilisateur_nom">Nom</label>
                <input type="text" id="utilisateur_nom" v-model="utilisateur.nom"/>
            </div>
            <div v-if="!log" class="formGroup">
                <label for="utilisateur_prenom">Prénom</label>
                <input type="text" id="utilisateur_prenom" v-model="utilisateur.prenom"/>
            </div>
            <div class="formGroup">
                <label for="utilisateur_email">Email</label>
                <input type="text" id="utilisateur_email" v-model="utilisateur.email"/>
            </div>
            <div class="formGroup">
                <label for="utilisateur_password">Mot de passe</label>
                <input type="text" id="utilisateur_password" v-model="utilisateur.password"/>
            </div>
            <div class="formGroup">
                <button type="submit" class="button">
                    <span v-if="log">Connexion</span>
                    <span v-if="!log">Enregistrer</span>
                </button>
            </div>
            <div class="toggle">
                <span v-if="log" @click="toggle">Créer un compte</span>
                <span v-if="!log" @click="toggle">Se connecter</span>
            </div>
        </form>
    </div>
</template>

<script>
import { accountService } from '@/_services'
export default {
    name: 'Login',
    data() {
        return {
            utilisateur: {
                nom: '',
                prenom: '',
                email: '',
                password: ''
            },
            log: true
        }
    },
    methods: {
        toggle(){
            this.log = !this.log
        },
        cnx(){
            if(this.log){
                accountService.login(this.utilisateur)
                    .then(res => {
                        accountService.saveToken(res.data.access_token)
                        this.$router.push('/home')
                    })
                    .catch(err => console.log(err))
            }else{
                accountService.signup(this.utilisateur)
                    .then(res => {
                        this.log = true
                    })
                    .catch(err => console.log(err))
            }
        }
    },
}
</script>

<style>
    form{
        max-width: 300px;
        margin: 0 auto;
    }
    .formGroup{
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }
    .toggle{
        font-size:12px;
        font-style: italic;
        cursor: pointer;
        text-align: right;
    }
</style>