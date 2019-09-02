Component({
  properties: {
    word: {
      type: String,
      value: "未设置"
    },
    myNumber: {
      type: Number,
      value: -1
    }
  },

  data: {
    showFront: false
  },
  methods: {
    onTap: function() {
      var v = !this.data.showFront
      this.setData({
        showFront: v
      })
      var detail = {
        index: this.data.myNumber,
        toBack: !v
      }
      this.triggerEvent('turnCard', detail)
    }
  }
})
