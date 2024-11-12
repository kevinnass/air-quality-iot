import Index from '@/pages/index.vue';
import Test from '@/pages/test.vue';
import Auth from '@/pages/auth.vue';
import NotFound from '@/pages/not-found.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/auth', component: Auth },
  { path: '/test', component: Test },
  { path: '/:path(.*)', component: NotFound },
];

export default routes;
