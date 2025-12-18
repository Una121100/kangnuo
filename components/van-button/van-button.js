Component({
  properties: {
    type: { type: String, value: '' },
    round: { type: Boolean, value: false },
    block: { type: Boolean, value: false }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onTap() {
      this.triggerEvent('tap')
    }
  }
})
