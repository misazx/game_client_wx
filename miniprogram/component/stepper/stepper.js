// component/stepper.js
Component({
  properties: {
    value: {
      type: Number,
      value: 0
    }
  },
  methods: {
    addValue: function() { 
      var v = this.data.value
      v += 1
      this.setData({
        value: v
      })
      var detail = {
        value: v
      }
      this.triggerEvent('valueDidChange', detail)
    },
    subtractValue: function() {
      var v = this.data.value
      v -= 1
      if ( v < 0) {
        v = 0
      }
      this.setData({
        value: v
      })
      var detail = {
        value: v
      }
      this.triggerEvent('valueDidChange', detail)
    },
  }
})
