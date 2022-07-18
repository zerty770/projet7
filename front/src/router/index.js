import { createRouter, createWebHistory } from 'vue-router'

import * as gerant from '@/views/gerant/index'

import Login from '@/views/gerant/auth/login'

import {authGuard} from '@/_helpers/auth-guard.js'

localStorage.setItem('token', 'marcel')


const routes = [

  
  {
    path: '/log',
    name: 'gerant',
    component: gerant.gerantLayout,
    children:[
      {path: 'utilisateurs/Index', name:'uIdex', component: gerant.utilisateurIndex },
      {path: 'utilisateurs/Edit/:id(\\d+)', name:'uEdit', component: gerant.utilisateurEdit, props: true},
      {path: 'utilisateurs/add', name:'utilisateurAdd', component:gerant.utilisateurAdd },

      {path: 'articles/Index', name:'aIdex', component: gerant.aIndex },
      {path: 'articles/Edit/:id(\\d+)', name:'aEdit', component: gerant.aEdit, props: true},
      {path: 'articles/add', name:'aAdd', component:gerant.aAdd },
      { path: '/:pathMatch(.*)*', redirect: '/login' }
    ]
  },
  {
    path : '/', name: 'Login', component: Login
  },
  {
    path:'/:pathMatch(.*)*', redirect: '/home'
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Vérouillage de la partie admin (token)
router.beforeEach((to,from, next) =>{
  if(to.matched[0].name == 'admin'){
    authGuard()
  }
  next()
})

export default router