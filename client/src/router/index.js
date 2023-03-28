import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignInView.vue'
import Dashboard from '../views/DashboardView.vue'
import Users from '../views/UsersView.vue'
import api from '@/services/api'

const authRequired = (to, from, next) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  api.get('/verifiyToken', config).then((res) => {
    to.params.isAdmin = res.data.isAdmin;
    if(to.meta.adminRequired){
      if(res.data.isAdmin){
        next()
      } 
      else{
        next('/dashboard')
      }
    }
    else{
      next();
    }
  }).catch(() => {
    next("/");
  })
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: SignIn,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    params:true,
    beforeEnter: authRequired
  },
  {
    path:'/dashboard/users',
    name:'Users',
    component:Users,
    meta: {
      adminRequired:true
    },
    beforeEnter: authRequired
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
