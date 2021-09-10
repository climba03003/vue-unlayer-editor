import { setupLayouts } from 'layouts-generated';
import generatedRoutes from 'pages-generated';
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import App from './app.vue';
import './assets/index.css';

export const routes = setupLayouts(generatedRoutes);

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

const app = Vue.createApp(App);
app.use(router);
app.mount('#app');
