<script setup>
import { useUiStore } from '../store/ui'

defineProps({ routes: { type: Array, required: true } })
const ui = useUiStore()

function navLabel(route) {
  return route.meta.navLabel?.[ui.lang] || route.name
}
</script>

<template>
  <transition
    enter-active-class="transition-all duration-200"
    leave-active-class="transition-all duration-200"
    enter-from-class="opacity-0 -translate-y-2"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="ui.mobileMenuOpen"
      class="md:hidden fixed top-16 left-0 right-0 z-30 flex flex-col gap-1 p-4
             bg-space-bg/95 backdrop-blur-xl border-b border-space-border"
    >
      <router-link
        v-for="r in routes"
        :key="r.name"
        :to="r.path"
        class="text-base font-medium px-4 py-3 rounded-xl text-gray-400
               hover:text-white hover:bg-white/5 transition-colors"
        active-class="text-white bg-white/5"
        @click="ui.closeMobileMenu()"
      >
        {{ navLabel(r) }}
      </router-link>
      <button
        class="text-base font-medium px-4 py-3 rounded-xl text-gray-400 text-left
               hover:text-white hover:bg-white/5 transition-colors"
        @click="ui.closeMobileMenu()"
      >
        {{ ui.t('btn_login') }}
      </button>
    </div>
  </transition>
</template>
