import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from "pinia-plugin-persistedstate";
import '@/assets/css/style.css';

localStorage.setItem('token', '');
const pinia = createPinia()
pinia.use(createPersistedState());
createApp(App).use(router).use(pinia).mount('#app')
