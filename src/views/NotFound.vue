<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center px-4 text-center">
    <h1 class="font-display text-6xl font-extrabold text-gradient mb-4">404</h1>
    <p class="text-gray-500 mb-8">Сторінку не знайдено</p>
    <button
      class="bg-gradient-to-r from-accent to-accent-2 text-white px-7 py-3 rounded-xl font-semibold"
      @click="router.push('/')"
    >На головну</button>
  </div>
</template>
