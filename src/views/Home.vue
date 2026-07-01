<script setup>
import { useRouter } from 'vue-router'
import { useUiStore } from '../store/ui'

const router = useRouter()
const ui = useUiStore()
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center px-4 pt-20 pb-20 text-center">
    <h1 class="font-display font-extrabold leading-none tracking-tight mb-6
               text-[clamp(2.5rem,7vw,6rem)]">
      Tinker<span class="text-gradient">Space</span>
    </h1>
    <p class="text-gray-500 max-w-lg mb-10 text-lg leading-relaxed">
      Простір для майстрів: магазин, блог і ще багато чого попереду.
    </p>
    <div class="flex gap-4 flex-wrap justify-center">
      <button
        class="bg-gradient-to-r from-accent to-accent-2 text-white px-8 py-3.5
               rounded-xl font-semibold shadow-[0_0_25px_rgba(79,142,247,0.2)]
               hover:shadow-[0_0_45px_rgba(79,142,247,0.4)] hover:-translate-y-0.5
               transition-all"
        @click="router.push('/shop')"
      >
        Перейти в магазин
      </button>
      <button
        class="border border-space-border px-8 py-3.5 rounded-xl font-semibold
               hover:border-accent hover:text-accent transition-colors"
        @click="router.push('/blog')"
      >
        Читати блог
      </button>
    </div>
  </div>
</template>
