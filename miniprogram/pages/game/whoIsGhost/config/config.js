// pages/config/config.js
Page({
  data: {
    player: 5,
    ghost: 1,
    empty: 1,
    goodWord: "天天见",
    ghostWord: "明天见",
    isSystemWord: false,
    systemWordType: [
      "热点资讯",
      "体育明星",
      "电影电视剧",
      "家用电器"
    ],
    systemWord: "请选择题目类型"
  },
  _updatePlayerCount: function (e) {
    var v = e.detail.value
    this.setData({
      player: v
    })
  },
  _updateGhostCount: function (e) {
    var v = e.detail.value
    this.setData({
      ghost: v
    })
  },
  _updateEmptyCount: function (e) {
    var v = e.detail.value
    this.setData({
      empty: v
    })
  },
  _updateGoodWord: function (e) {
    var v = e.detail.value
    this.setData({
      goodWord: v
    })
  },
  _updateGhostWord: function (e) {
    var v = e.detail.value
    this.setData({
      ghostWord: v
    })
  },
  _jumpToGamePage: function () {
    wx.setStorageSync("wx.qp.whoisghost.gameconfig", this.data)
    var c = this.data.people_number
    wx.navigateTo({
      url: '../game/game?count='+c,
    })
  },
  _needSystemWord: function (e) {
    var v = e.detail.value
    this.setData({
      isSystemWord: v
    })
  },
  _chooseSystemWordType: function (e) {
    var value = e.detail.value
    value = this.data.systemWordType[value]
    this.setData({
      systemWord: value
    })
  }
})