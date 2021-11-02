import { createRouter, createWebHistory } from 'vue-router';
import Home from './containers/Home.vue';
import Coins from './containers/Coins.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/coins',
    name: 'Coins',
    component: Coins,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
