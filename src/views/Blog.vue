<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

function loadPosts() {
  const raw = localStorage.getItem('ts_posts')
  posts.value = raw ? JSON.parse(raw) : []
}
onMounted(loadPosts)
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center px-4 pt-20 pb-20">
    <div class="w-full max-w-3xl">
      <p class="text-xs font-bold tracking-[0.22em] uppercase text-accent mb-2">Блог</p>
      <h2 class="font-display text-3xl sm:text-4xl font-extrabold mb-6">Останні статті</h2>

      <div class="flex flex-col gap-4 overflow-y-auto pr-2" style="max-height: calc(100vh - 240px);">
        <article
          v-for="post in posts"
          :key="post.id"
          class="bg-white/[0.03] border border-space-border rounded-2xl p-5
                 hover:border-accent/30 transition-colors cursor-pointer"
        >
          <h3 class="font-display font-bold text-lg mb-2">{{ post.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ post.excerpt }}</p>
        </article>

        <div v-if="posts.length === 0" class="text-center py-16 text-gray-500">
          <div class="text-4xl mb-3">📝</div>
          <p>Статей ще немає.</p>
        </div>
      </div>
    </div>
  </div>
</template>
