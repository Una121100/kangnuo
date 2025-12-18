Component({
  properties: {
    product: { type: Object, value: {} },
    compact: { type: Boolean, value: false }
  },
  methods: {
    onAdd(e) {
      e.stopPropagation()
      this.triggerEvent('add', { id: this.data.product.id })
    },
    onNavigate() {
      this.triggerEvent('navigate', { id: this.data.product.id })
    }
  }
})
