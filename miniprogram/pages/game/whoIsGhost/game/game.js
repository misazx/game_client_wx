const ID = {
  good: 1,
  ghost: 2,
  empty: 3
}
Page({
  data: {
    count: 0,
    isBeginGame: false,
    gameIsOver: false,
    nowPlayerIndex: 0,
    gameResultText: '游戏进行中...',
  },
  customData: {
    goodCount: 0,
    ghostCount: 0,
    emptyCount: 0,
    goodWord: '',
    badWord: ''
  },
  checkGameResult: function (e) {
    let idx = e.target.dataset.idx
    var player = this.data.players[idx]
    player.isOut = true
    this.setData({
      players: this.data.players
    })
    if (player.roleType == ID.good) {
      this.customData.goodCount -= 1
    }
    if (player.roleType == ID.ghost) {
      this.customData.ghostCount -= 1
    }
    if (player.roleType == ID.empty) {
      this.customData.emptyCount -= 1
    }
    var text = '游戏继续...'
    var gameIsOver = false 
    // 坏人全部出局 空白胜利
    if (this.customData.ghostCount == 0 && this.customData.emptyCount != 0) {
      text = '游戏结束 空白胜利'
      gameIsOver = true
    } else if (this.customData.goodCount == 0 && this.customData.ghostCount != 0) {
      // 好人全部出局 坏人胜利
      text = '游戏结束 卧底:' + this.customData.badWord + ' 胜利'
      gameIsOver = true
    } else if (this.customData.goodCount != 0 && this.customData.ghostCount == 0 && this.customData.emptyCount == 0) {
      // 坏人 空白全部出局 好人胜利
      text = '游戏结束 好人:' + this.customData.goodWord + ' 胜利' 
      gameIsOver = true
    }
    this.setData({
      gameResultText: text,
      gameIsOver: gameIsOver
    })
  },
  showNextCard: function (e) {
    var idx = e.detail.index
    var toBack = e.detail.toBack
    if (toBack) {
      wx.pageScrollTo({
        scrollTop: idx * 500
      })
      if (idx == this.data.players.length) {
        this.setData({
          isBeginGame: true
        })
      }
    }
  },
  _getRandomSortArr: function (arr) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    var length = arr.length
    var newArr = []
    for (var i = 0; i < length; i++) {
      var random = getRandomInt(0, length - 1 - i)
      var player = arr[random]
      newArr.push(player)
      arr.splice(random, 1)
    }
    return newArr
  },
  _getConfigArr: function (all, ghost, empty, goodWord, ghostWord) {
    this.customData = {
      goodCount: all - ghost - empty,
      ghostCount: ghost,
      emptyCount: empty,
      goodWord: goodWord,
      badWord: ghostWord
    }
    var players = []
    var good = all - ghost - empty
    // 好人
    for (var i = 0; i < good; i++) {
      players.push({
        roleType: ID.good,
        word: goodWord
      })
    }
    // 卧底
    for (var i = 0; i < ghost; i++) {
      players.push({
        roleType: ID.ghost,
        word: ghostWord
      })
    }
    // 空白
    for (var i = 0; i < empty; i++) {
      players.push({
        roleType: ID.empty,
        word: '空白'
      })
    }
    return players
  },
  onLoad: function (op) {
    var data = wx.getStorageSync("wx.qp.whoisghost.gameconfig")
    var players = this._getConfigArr(data.player,
                                     data.ghost, 
                                     data.empty, 
                                     data.goodWord, 
                                     data.ghostWord)
    var newPlayers = this._getRandomSortArr(players)
    this.setData({
      players: newPlayers
    })
  }
})