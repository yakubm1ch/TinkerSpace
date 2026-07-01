<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from './store/ui'
import { useCartStore } from './store/cart'
import { createSpaceScene } from './lib/spaceScene'
import NavBar from './components/NavBar.vue'
import MobileMenu from './components/MobileMenu.vue'
import CartDrawer from './components/CartDrawer.vue'

const canvasRef = ref(null)
const route = useRoute()
const router = useRouter()
const ui = useUiStore()
const cart = useCartStore()

let scene = null

onMounted(() => {
  scene = createSpaceScene(canvasRef.value)
  scene.setDepth(route.meta.depth || 0)
})

onBeforeUnmount(() => {
  scene?.destroy()
})

// Drive the camera depth whenever the route changes — this is what
// produces the "flying deeper into space" feeling between sections.
watch(
  () => route.meta.depth,
  (depth) => {
    scene?.setDepth(depth || 0)
  }
)

// Routes visible in the nav (admin and 404 are excluded via meta.hidden)
const navRoutes = router.options.routes.filter((r) => !r.meta?.hidden)
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 z-0"></canvas>

  <NavBar :routes="navRoutes" />
  <MobileMenu :routes="navRoutes" />
  <CartDrawer />

  <div class="fixed inset-0 z-10 overflow-hidden">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <footer
    class="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between
           px-4 sm:px-8 py-2.5 border-t border-space-border
           bg-space-bg/70 backdrop-blur-xl"
  >
    <div class="font-display text-sm font-extrabold">
      <span class="text-gradient">TinkerSpace</span>
    </div>
    <div class="text-xs text-gray-500">{{ ui.t('footer') }}</div>
  </footer>
</template>
