<script setup>
import { ref } from 'vue'

const contactItems = ref([
  { icon: '📧', label: 'Email', value: 'info@tinkerspace.dev' },
  { icon: '📍', label: 'Адреса', value: 'м. Київ' },
])

const name = ref('')
const email = ref('')
const message = ref('')
const msg = ref({ text: '', type: '' })

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function send() {
  if (name.value.trim().length < 2) return setMsg("Введіть ім'я", 'e')
  if (!isEmail(email.value)) return setMsg('Невірний email', 'e')
  if (message.value.trim().length < 5) return setMsg('Введіть повідомлення', 'e')
  setMsg("Повідомлення надіслано!", 's')
  name.value = ''
  email.value = ''
  message.value = ''
}
function setMsg(text, type) {
  msg.value = { text, type }
  setTimeout(() => (msg.value = { text: '', type: '' }), 4000)
}
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center px-4 pt-20 pb-20">
    <div class="w-full max-w-3xl">
      <p class="text-xs font-bold tracking-[0.22em] uppercase text-accent mb-2">Контакти</p>
      <h2 class="font-display text-3xl sm:text-4xl font-extrabold mb-6">Зв'яжіться з нами</h2>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="flex flex-col gap-3">
          <div
            v-for="(item, i) in contactItems"
            :key="i"
            class="flex items-start gap-4 p-4 bg-white/[0.03] border border-space-border rounded-2xl"
          >
            <span class="text-lg mt-0.5">{{ item.icon }}</span>
            <div>
              <div class="text-[0.66rem] font-bold tracking-wider uppercase text-gray-500">{{ item.label }}</div>
              <div class="text-sm font-medium">{{ item.value }}</div>
            </div>
          </div>
        </div>

        <div class="bg-white/[0.03] border border-space-border rounded-2xl p-6">
          <h3 class="font-display text-lg font-bold mb-4">Написати нам</h3>
          <div class="mb-3">
            <label class="block text-xs font-semibold text-gray-500 mb-1.5">Ім'я</label>
            <input v-model="name" maxlength="60"
              class="w-full bg-black/30 border border-space-border rounded-lg px-3.5 py-2.5
                     text-sm outline-none focus:border-accent" />
          </div>
          <div class="mb-3">
            <label class="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
            <input v-model="email" type="email" maxlength="100"
              class="w-full bg-black/30 border border-space-border rounded-lg px-3.5 py-2.5
                     text-sm outline-none focus:border-accent" />
          </div>
          <div class="mb-4">
            <label class="block text-xs font-semibold text-gray-500 mb-1.5">Повідомлення</label>
            <textarea v-model="message" maxlength="1000" rows="3"
              class="w-full bg-black/30 border border-space-border rounded-lg px-3.5 py-2.5
                     text-sm outline-none focus:border-accent resize-y"></textarea>
          </div>
          <button
            class="w-full bg-gradient-to-r from-accent to-accent-2 text-white py-3
                   rounded-xl font-semibold"
            @click="send"
          >Надіслати</button>
          <div
            v-if="msg.text"
            class="mt-3 text-sm font-medium px-3.5 py-2 rounded-lg"
            :class="msg.type === 's'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/10 text-red-400 border border-red-500/30'"
          >{{ msg.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
