<script setup>
import { ref } from 'vue'

function hash(str) {
  let h = 5381
  for (const c of str) {
    h = (h * 33) ^ c.charCodeAt(0)
  }
  return (h >>> 0).toString(36)
}

const ADMIN_HASH_KEY = 'ts_admin_hash'

function getAdminHash() {
  return localStorage.getItem(ADMIN_HASH_KEY) || hash('admin123')
}

const loggedIn = ref(false)
const password = ref('')
const error = ref('')
const activeTab = ref('dashboard')

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

    <!-- LOGIN -->
    <div
      v-if="!loggedIn"
      class="w-full max-w-sm bg-white/[0.03] border border-space-border rounded-2xl p-8"
    >
      <h1 class="font-display text-xl font-extrabold mb-2">
        Адмін-панель
      </h1>

      <p class="text-sm text-gray-500 mb-6">
        Введіть пароль адміністратора
      </p>

      <input
        v-model="password"
        type="password"
        placeholder="••••••••"
        class="w-full bg-black/30 border border-space-border rounded-lg px-4 py-3 mb-4 outline-none"
        @keydown.enter="login"
      >

      <p
        v-if="error"
        class="text-red-400 text-sm mb-4"
      >
        {{ error }}
      </p>

      <button
        class="w-full bg-gradient-to-r from-accent to-accent-2 rounded-xl py-3 font-semibold"
        @click="login"
      >
        Увійти
      </button>
    </div>

    <!-- ADMIN PANEL -->
    <div
      v-else
      class="w-full max-w-3xl bg-white/[0.03] border border-space-border rounded-2xl p-8"
    >

      <h1 class="font-display text-2xl font-extrabold mb-6">
        Панель керування
      </h1>

      <div class="grid md:grid-cols-2 gap-4">

        <button
          class="border border-space-border rounded-xl p-4 text-left hover:border-accent transition"
          @click="activeTab='dashboard'"
        >
          🏠 Dashboard
        </button>

        <button
          class="border border-space-border rounded-xl p-4 text-left hover:border-accent transition"
          @click="activeTab='products'"
        >
          📦 Товари
        </button>

        <button
          class="border border-space-border rounded-xl p-4 text-left hover:border-accent transition"
          @click="activeTab='blog'"
        >
          📝 Блог
        </button>

        <button
          class="border border-space-border rounded-xl p-4 text-left hover:border-accent transition"
          @click="activeTab='portfolio'"
        >
          🚀 Портфоліо
        </button>

        <button
          class="border border-space-border rounded-xl p-4 text-left hover:border-accent transition"
          @click="activeTab='contacts'"
        >
          📞 Контакти
        </button>

        <button
          class="border border-space-border rounded-xl p-4 text-left hover:border-accent transition"
          @click="activeTab='settings'"
        >
          ⚙️ Налаштування
        </button>

      </div>

      <hr class="my-8 border-space-border">

      <div class="text-gray-300">

        <div v-if="activeTab==='dashboard'">
          <h2 class="text-xl font-bold mb-2">Dashboard</h2>
          <p>Тут буде статистика сайту.</p>
        </div>

        <div v-else-if="activeTab==='products'">
          <h2 class="text-xl font-bold mb-2">Товари</h2>
          <p>Додавання, редагування та видалення товарів.</p>
        </div>

        <div v-else-if="activeTab==='blog'">
          <h2 class="text-xl font-bold mb-2">Блог</h2>
          <p>Створення та редагування статей.</p>
        </div>

        <div v-else-if="activeTab==='portfolio'">
          <h2 class="text-xl font-bold mb-2">Портфоліо</h2>
          <p>Керування власними проєктами.</p>
        </div>

        <div v-else-if="activeTab==='contacts'">
          <h2 class="text-xl font-bold mb-2">Контакти</h2>
          <p>Редагування контактної інформації.</p>
        </div>

        <div v-else-if="activeTab==='settings'">
          <h2 class="text-xl font-bold mb-2">Налаштування</h2>
          <p>Загальні налаштування платформи.</p>
        </div>

      </div>

    </div>

  </div>
</template>