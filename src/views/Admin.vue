<script setup>
import { ref } from 'vue'

// Same hash-password placeholder pattern as the single-file prototype.
// Phase 4 will expand this with product/post/contact management tabs
// and Phase 3 will move auth to Supabase row-level security instead
// of a client-side password hash.

function hash(str) {
  let h = 5381
  for (const c of str) h = (h * 33) ^ c.charCodeAt(0)
  return (h >>> 0).toString(36)
}

const ADMIN_HASH_KEY = 'ts_admin_hash'
function getAdminHash() {
  return localStorage.getItem(ADMIN_HASH_KEY) || hash('admin123')
}

const loggedIn = ref(false)
const password = ref('')
const error = ref('')

function login() {
  if (hash(password.value) === getAdminHash()) {
    loggedIn.value = true
    error.value = ''
  } else {
    error.value = 'Невірний пароль'
  }
}
</script>

<template>
  <div class="h-full w-full flex items-center justify-center px-4 pt-16 pb-16">
    <div v-if="!loggedIn" class="w-full max-w-sm bg-white/[0.03] border border-space-border rounded-2xl p-8">
      <h1 class="font-display text-xl font-extrabold mb-1">Адмін-панель</h1>
      <p class="text-sm text-gray-500 mb-6">Введіть пароль адміністратора</p>
      <input
        v-model="password"
        type="password"
        placeholder="••••••••"
        class="w-full bg-black/30 border border-space-border rounded-lg px-3.5 py-2.5
               text-sm outline-none focus:border-accent mb-3"
        @keydown.enter="login"
      />
      <p v-if="error" class="text-sm text-red-400 mb-3">{{ error }}</p>
      <button
        class="w-full bg-gradient-to-r from-accent to-accent-2 text-white py-3 rounded-xl font-semibold"
        @click="login"
      >Увійти</button>
    </div>

    <div v-else class="w-full max-w-2xl bg-white/[0.03] border border-space-border rounded-2xl p-8">
      <h1 class="font-display text-xl font-extrabold mb-4">Панель керування</h1>
      <p class="text-gray-500 text-sm">
        Тут будуть вкладки керування товарами, постами блогу, контактами та користувачами
        (Фаза 4 за роадмапом).
      </p>
    </div>
  </div>
</template>
