import Vue from 'vue';
import VueRouter from 'vue-router';
import Subreddits from '../views/Subreddits.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Subreddits',
    component: Subreddits,
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
