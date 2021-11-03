import { createRouter, createWebHistory } from 'vue-router';
import Home from './containers/Home.vue';
import Coins from './containers/coins/Coins.vue';
import CoinView from './containers/coins/CoinView.vue';

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
  },
  {
    path: '/coins/:id',
    name: 'CoinView',
    component: CoinView,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
