// pages/list/list.js
const io = require('../../utils/weapp.socket.io.js')
var socketUrl = ''
var socketMessage = ''
var app = getApp();

Page({
  data: {
    gameList: [
      '谁是卧底',
      // '狼人杀',
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
  },

  onLoad: function (options) {
    // this.socketStart();

  },

  socketStart: function () {

    // 设置socket连接地址 socketUrl
    const socket = (this.socket = io(
      socketUrl,
    ))

    socket.on('connect', () => {
      this.setData({ socketMessage: socketMessage += 'SOCKET连接成功 → \n\n' })

      // 此处修改为与server约定的数据、格式
      var sendMessage = '{"token":"v3jsoc8476shNFhxgqPAkkjt678","client":"发送内容"}'
      this.socketSendMessage(sendMessage);
    })

    socket.on('connect_error', d => {
      this.setData({ socketMessage: socketMessage += 'SOCKET连接失败 → \n\n' })
    })

    socket.on('connect_timeout', d => {
      this.setData({ socketMessage: socketMessage += 'SOCKET连接超时 → \n\n' })
    })

    socket.on('disconnect', reason => {
      this.setData({ socketMessage: socketMessage += 'SOCKET连接断开 → \n\n' })
    })

    socket.on('reconnect', attemptNumber => {
      this.setData({ socketMessage: socketMessage += 'SOCKET正在重连 → \n\n' })
    })

    socket.on('reconnect_failed', () => {
      this.setData({ socketMessage: socketMessage += 'SOCKET重连失败 → \n\n' })
    })

    socket.on('reconnect_attempt', () => {
      this.setData({ socketMessage: socketMessage += 'SOCKET正在重连 → \n\n' })
    })

    socket.on('error', err => {
      this.setData({ socketMessage: socketMessage += 'SOCKET连接错误 → \n\n' })
    })

    socket.on('message', function (d) {
      this.setData({ socketMessage: socketMessage += '服务器返回数据 → \n\n' })
      that.socketReceiveMessage(d)
    })

  },

  /**
   * 断开socket
   */
  socketStop: function () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  },

  /**
   * 发送消息
   */
  socketSendMessage: function (sendStr) {
    if (this.socket) {
      this.setData({ socketMessage: socketMessage += '向服务器发送数据 → ' + sendStr + '\n\n' })
      this.socket.emit('message', sendStr);
    }
  },

  /**
   * 接收消息
   */
  socketReceiveMessage: function (receivedStr) {
    this.setData({ socketMessage: socketMessage += '服务器返回数据 → ' + receivedStr + '\n\n' })
    this.socketStop();
  },
})