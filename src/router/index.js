import { createRouter, createWebHashHistory } from 'vue-router'

// We use hash history because the site is deployed to GitHub Pages
// (a static host with no server-side rewrites). Hash routing avoids
// 404s on refresh/deep-link without extra server config.

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { depth: 0, navLabel: { uk: 'Головна', en: 'Home' } },
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/Shop.vue'),
    meta: { depth: 1, navLabel: { uk: 'Магазин', en: 'Shop' } },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blog.vue'),
    meta: { depth: 2, navLabel: { uk: 'Блог', en: 'Blog' } },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: { depth: 3, navLabel: { uk: 'Контакти', en: 'Contact' } },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: { depth: 0, hidden: true }, // not shown in nav, accessed by direct URL only
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: { depth: 0, hidden: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
