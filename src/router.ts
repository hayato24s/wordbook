import { createRouter, createWebHistory } from "vue-router";
import Learn from "~/pages/learn/index.vue";
import Problem from "~/pages/learn/problem.vue";
import Preview from "~/pages/Preview.vue";

const history = createWebHistory();

const routes = [
  { path: "/", component: Preview },
  { path: "/learn", component: Learn },
  { path: "/learn/problem", component: Problem },
  { path: "/preview", component: Preview },
];

export const router = createRouter({
  history,
  routes,
});
