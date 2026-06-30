import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../pages/Home.vue");
const Catalog = () => import("../pages/Catalog.vue");
const Contacts = () => import("../pages/Contacts.vue");
const Admin = () => import("../pages/Admin.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/catalog",
      component: Catalog,
    },
    {
      path: "/contacts",
      component: Contacts,
    },
    {
      path: "/admin",
      component: Admin,
    },
  ],
});

export default router;