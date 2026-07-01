<script setup>
import { useRouter } from 'vue-router'
import { useUiStore } from '../store/ui'
import { useCartStore } from '../store/cart'

defineProps({ routes: { type: Array, required: true } })

const router = useRouter()
const ui = useUiStore()
const cart = useCartStore()

function navLabel(route) {
  return route.meta.navLabel?.[ui.lang] || route.name
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-30 flex items-center justify-between
           px-4 sm:px-8 h-16 bg-space-bg/70 backdrop-blur-xl border-b border-space-border"
  >
    <button
      class="font-display text-xl sm:text-2xl font-extrabold text-gradient select-none"
      @click="router.push('/')"
    >
      NEXUS
    </button>

    <ul class="hidden md:flex gap-1">
      <li v-for="r in routes" :key="r.name">
        <router-link
          :to="r.path"
          class="text-sm font-medium px-3.5 py-1.5 rounded-lg text-gray-500
                 hover:text-white hover:bg-white/5 transition-colors"
          active-class="text-white bg-white/5"
        >
          {{ navLabel(r) }}
        </router-link>
      </li>
    </ul>

    <div class="flex items-center gap-2.5">
      <button
        class="text-xs font-bold tracking-widest px-2.5 py-1.5 rounded-md border
               transition-colors"
        :class="ui.lang === 'uk'
          ? 'bg-accent text-white border-accent'
          : 'bg-white/5 text-gray-500 border-space-border hover:bg-accent hover:text-white'"
        @click="ui.setLang('uk')"
      >УКР</button>
      <button
        class="text-xs font-bold tracking-widest px-2.5 py-1.5 rounded-md border
               transition-colors"
        :class="ui.lang === 'en'
          ? 'bg-accent text-white border-accent'
          : 'bg-white/5 text-gray-500 border-space-border hover:bg-accent hover:text-white'"
        @click="ui.setLang('en')"
      >ENG</button>

      <button class="relative p-2 text-lg" title="Cart" @click="cart.drawerOpen = true">
        🛒
        <span
          v-if="cart.count > 0"
          class="absolute -top-0.5 -right-0.5 bg-accent text-white text-[0.58rem]
                 font-bold w-4 h-4 rounded-full flex items-center justify-center"
        >{{ cart.count }}</span>
      </button>

      <button
        class="hidden sm:inline-block text-sm font-semibold px-4 py-2 rounded-lg
               border border-space-border hover:border-accent hover:text-accent transition-colors"
      >
        {{ ui.t('btn_login') }}
      </button>

      <button class="md:hidden flex flex-col gap-1.5 p-2" @click="ui.toggleMobileMenu()">
        <span class="w-5 h-0.5 bg-white rounded block"></span>
        <span class="w-5 h-0.5 bg-white rounded block"></span>
        <span class="w-5 h-0.5 bg-white rounded block"></span>
      </button>
    </div>
  </nav>
</template>
