import { createRouter, createWebHistory } from 'vue-router';
import Home from './containers/Home.vue';
import Coins from './containers/coins/Coins.vue';
import CoinView from './containers/coins/CoinView.vue';
import CoinsCategories from './containers/coins/CoinsCategories.vue';

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
  },
  {
    path: '/coins/categories',
    name: 'CoinsCategories',
    component: CoinsCategories,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
