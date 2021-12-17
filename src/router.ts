import { createRouter, createWebHistory } from "vue-router";
import Learn from "~/pages/learn/index.vue";
import Problem from "~/pages/learn/problem.vue";
import Detail from "~/pages/listen/detail.vue";
import Filter from "~/pages/listen/filter.vue";
import Listen from "~/pages/listen/index.vue";
import Preview from "~/pages/Preview.vue";

const history = createWebHistory();

const routes = [
  { path: "/", component: Preview },
  { path: "/learn", component: Learn },
  { path: "/learn/problem", component: Problem },
  { path: "/listen", component: Listen },
  { path: "/listen/detail", component: Detail },
  { path: "/listen/filter", component: Filter },
  { path: "/preview", component: Preview },
];

export const router = createRouter({
  history,
  routes,
});
