import { createRouter, createWebHistory } from "vue-router";
import Preview from "~/pages/Preview.vue";

const history = createWebHistory();

const routes = [
  { path: "/", component: Preview },
  { path: "/preview", component: Preview },
];

export const router = createRouter({
  history,
  routes,
});
