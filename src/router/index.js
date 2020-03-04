import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/subreddits',
    name: 'Subreddits',
    component: () => import('../views/Subreddits.vue'),
  },
  {
    path: '/r/:name',
    name: 'Subreddit',
    component: () => import('../views/Subreddit.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
