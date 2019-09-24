// pages/game/whoIsGhost/lobby/lobby.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name:'getRooms',
    //   data:{

    //   },
    //   success:rst=>{
    //     console.log('callFunction test result: ', rst.result.data)
    //     this.setData({
    //       roomList: rst.result.data,
    //     })
    //   }
    // })
    wx.httpReq({
        url:'/whoisghost/lobby/list',
        success:rst => {
          console.log('/whoisghost/lobby/list: ', rst.data)
          this.setData({
            roomList: rst.data,
          })
        },
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onClickRoom: function (e) {
    var index = e.target.dataset.index

  },

  onClickCreateRoom:function(e){
    // wx.cloud.callFunction({
    //   name: app.globalData.userInfo.nickName}).then(rst=>{
    //   console.log(rst)
    // })
    wx.httpReq({
      url:'/whoisghost/lobby/create', 
      data:{
        name: 'misakkz',//app.globalData.userInfo.nickName,
      },
      success: rst => {
        console.log('/whoisghost/lobby/create: ', rst.data)
        
      },
    }
    )
  },

})