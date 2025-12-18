Component({
  properties: {
    type: { type: String, value: '' },
    round: { type: Boolean, value: false },
    block: { type: Boolean, value: false },
    size: { type: String, value: '' },
    disabled: { type: Boolean, value: false },
    customStyle: { type: String, value: '' }
  },
  methods: {
    onTap(e) {
      if (this.data.disabled) return
      this.triggerEvent('tap', e.detail || {})
      this.triggerEvent('click', e.detail || {})
    }
  }
})

