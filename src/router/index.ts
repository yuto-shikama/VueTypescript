import { createRouter, createWebHistory } from 'vue-router'
import Top from '../views/TopView.vue'
import Login from '../views/LoginView.vue'
import Logout from '../views/LogoutView.vue'
import Profile from '../views/ProfileView.vue'
import Signup from '../views/SignupView.vue'
import AwsS3 from '../views/AwsS3.vue'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/Top",
    name: "Top",
    component: Top
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/Logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile
  },
  {
    path: '/AwsS3',
    name: 'AwsS3',
    component: AwsS3,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router