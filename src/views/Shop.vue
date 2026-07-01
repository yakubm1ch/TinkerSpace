<script setup>
import { ref, onMounted } from 'vue'
import { useUiStore } from '../store/ui'
import { useCartStore } from '../store/cart'

const ui = useUiStore()
const cart = useCartStore()
const products = ref([])

// Placeholder data source — Phase 3 swaps this for a Supabase query.
// Kept isolated in one function so the swap touches only this file.
function loadProducts() {
  const raw = localStorage.getItem('ts_products')
  products.value = raw ? JSON.parse(raw) : []
}

onMounted(loadProducts)

function name(p) {
  return ui.lang === 'uk' ? p.nameUk : p.nameEn
}
function category(p) {
  return ui.lang === 'uk' ? p.catUk : p.catEn
}
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center px-4 pt-20 pb-20">
    <div class="w-full max-w-6xl">
      <p class="text-xs font-bold tracking-[0.22em] uppercase text-accent mb-2">Каталог</p>
      <h2 class="font-display text-3xl sm:text-4xl font-extrabold mb-6">Наші товари</h2>

      <div
        class="grid gap-5 overflow-y-auto pr-2"
        style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); max-height: calc(100vh - 240px);"
      >
        <div
          v-for="p in products"
          :key="p.id"
          class="bg-white/[0.03] border border-space-border rounded-[18px] overflow-hidden
                 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:border-accent/30
                 transition-all"
        >
          <div class="w-full aspect-[4/3] bg-gradient-to-br from-[#0d1117] to-[#1a2035]
                      flex items-center justify-center relative overflow-hidden">
            <img v-if="p.img" :src="p.img" :alt="name(p)" class="w-full h-full object-cover" />
            <span v-else class="text-5xl">{{ p.emoji || '📦' }}</span>
          </div>
          <div class="p-4">
            <p class="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1">
              {{ category(p) }}
            </p>
            <h3 class="font-display font-bold mb-1">{{ name(p) }}</h3>
            <div class="flex items-center justify-between mt-3">
              <div class="font-display font-extrabold text-gold">₴{{ p.price.toLocaleString('uk') }}</div>
              <button
                class="bg-accent text-white w-8 h-8 rounded-lg flex items-center justify-center
                       hover:bg-accent-2 hover:scale-110 transition-all"
                @click="cart.add(p.id)"
              >+</button>
            </div>
          </div>
        </div>

        <div v-if="products.length === 0" class="col-span-full text-center py-16 text-gray-500">
          <div class="text-4xl mb-3">📦</div>
          <p>Товарів ще немає.</p>
        </div>
      </div>
    </div>
  </div>
</template>
