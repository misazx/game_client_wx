// pages/list/list.js
Page({
  data: {
    gameList: [
      '谁是卧底',
      '狼人杀',
    ],
    showAlert: false
  },
  pushToNextPage: function (e) {
    var index = e.target.dataset.index
    if (index == 0) {
      wx.navigateTo({
        url: '../game/whoIsGhost/lobby/lobby',
      })
    } else {
      this.setData({
        showAlert: true
      }, () => {
        setTimeout( () => {
          this.setData({
            showAlert: false
          })
        }, 1000)
      })
    }
  }
})