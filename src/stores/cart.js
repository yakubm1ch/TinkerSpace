import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('ts_cart') || '[]'),
    drawerOpen: false,
  }),
  getters: {
    count: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    total: (state) => (products) => {
      return state.items.reduce((sum, item) => {
        const p = products.find((x) => x.id === item.id)
        return sum + (p ? p.price * item.qty : 0)
      }, 0)
    },
  },
  actions: {
    persist() {
      localStorage.setItem('ts_cart', JSON.stringify(this.items))
    },
    add(productId) {
      const existing = this.items.find((i) => i.id === productId)
      if (existing) existing.qty++
      else this.items.push({ id: productId, qty: 1 })
      this.persist()
    },
    changeQty(productId, delta) {
      const item = this.items.find((i) => i.id === productId)
      if (!item) return
      item.qty += delta
      if (item.qty <= 0) {
        this.items = this.items.filter((i) => i.id !== productId)
      }
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    },
  },
})
