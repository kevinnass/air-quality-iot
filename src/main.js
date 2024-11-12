import { createApp, watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@/assets/styles/fonts.css';
import '@/assets/styles/main.css';
import '@/assets/styles/tailwind.css';
import App from '@/app.vue';
import { routes } from '@/routes.js';
import { createPinia } from 'pinia'
import { useUserStore } from './stores/userStore';

const pinia = createPinia();
const app = createApp(App);
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

app.use(pinia);
app.use(router);

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  await userStore.initAuth();
  
  if (!userStore.user && to.path !== '/auth') {
    next('/auth'); 
  } else {
    next();
  }

});

app.mount('#app');
