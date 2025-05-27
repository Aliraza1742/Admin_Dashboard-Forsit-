import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    products: []
  }),
  actions: {
    addProduct(product) {
      this.products.push(product)
    }
  }
})