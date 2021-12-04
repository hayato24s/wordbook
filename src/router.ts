import { createRouter, createWebHistory } from "vue-router";
import Book from "./components/Book.vue";
import HelloWorld from "./components/HelloWorld.vue";

const history = createWebHistory();

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/book", component: Book },
];

export const router = createRouter({
  history,
  routes,
});
