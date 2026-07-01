<script setup>
import { useCartStore } from '../store/cart'
import { useUiStore } from '../store/ui'

const cart = useCartStore()
const ui = useUiStore()

// Placeholder products list — will be replaced by Supabase data fetch.
// Kept here so the cart UI is fully functional before Phase 3.
const products = []
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="cart.drawerOpen"
      class="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
      @click.self="cart.drawerOpen = false"
    >
      <transition
        enter-active-class="transition-transform duration-300"
        leave-active-class="transition-transform duration-300"
        enter-from-class="translate-x-full"
        leave-to-class="translate-x-full"
      >
        <aside
          v-if="cart.drawerOpen"
          class="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0c0f17]
                 border-l border-space-border p-6 overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-lg font-extrabold">🛒 Кошик</h2>
            <button class="text-gray-500 text-2xl hover:text-white" @click="cart.drawerOpen = false">×</button>
          </div>

          <div v-if="cart.items.length === 0" class="text-center py-12 text-gray-500">
            <div class="text-5xl mb-4">🛒</div>
            <p>Кошик порожній</p>
          </div>

          <div v-else>
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="flex items-center gap-4 py-4 border-b border-space-border"
            >
              <div class="flex-1">
                <div class="font-semibold text-sm">{{ item.id }}</div>
              </div>
              <div class="flex items-center gap-2">
                <button
                  class="w-7 h-7 rounded-md bg-white/5 border border-space-border"
                  @click="cart.changeQty(item.id, -1)"
                >−</button>
                <span class="min-w-[1.5rem] text-center">{{ item.qty }}</span>
                <button
                  class="w-7 h-7 rounded-md bg-white/5 border border-space-border"
                  @click="cart.changeQty(item.id, 1)"
                >+</button>
              </div>
            </div>

            <button
              class="w-full mt-6 bg-gradient-to-r from-accent to-accent-2 text-white
                     py-3 rounded-xl font-semibold"
            >
              Оформити замовлення
            </button>
          </div>
        </aside>
      </transition>
    </div>
  </transition>
</template>
