import { defineStore } from 'pinia'

const STRINGS = {
  uk: {
    nav_home: 'Головна',
    nav_shop: 'Магазин',
    nav_blog: 'Блог',
    nav_contact: 'Контакти',
    btn_login: 'Вхід',
    scroll_hint: 'Гортати',
    add_cart: 'До кошика',
    footer: '© 2025 TinkerSpace. Усі права захищено.',
  },
  en: {
    nav_home: 'Home',
    nav_shop: 'Shop',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    btn_login: 'Login',
    scroll_hint: 'Scroll',
    add_cart: 'Add to cart',
    footer: '© 2025 TinkerSpace. All rights reserved.',
  },
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    lang: localStorage.getItem('ts_lang') || 'uk',
    mobileMenuOpen: false,
  }),
  getters: {
    t: (state) => (key) => STRINGS[state.lang]?.[key] || key,
  },
  actions: {
    setLang(lang) {
      this.lang = lang
      localStorage.setItem('ts_lang', lang)
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
  },
})
