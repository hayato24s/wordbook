import { createRouter, createWebHistory } from "vue-router";
import Home from "~/pages/index.vue";
import Login from "~/pages/login.vue";
import Learn from "~/pages/learn/index.vue";
import Problem from "~/pages/learn/problem.vue";
import Filter from "~/pages/listen/filter.vue";
import Listen from "~/pages/listen/index.vue";

const history = createWebHistory();

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/learn", component: Learn },
  { path: "/learn/problem", component: Problem },
  { path: "/listen", component: Listen },
  { path: "/listen/filter", component: Filter },
];

export const router = createRouter({
  history,
  routes,
});
