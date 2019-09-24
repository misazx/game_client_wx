

wx.httpReq = function (arg) {
  var app = getApp();
  // console.log(arg.data)
  // console.log(JSON.stringify(arg.data))
  wx.vrequest({
    url: app.globalData.url + arg.url,
    data: JSON.stringify(arg.data) ,
    success: rst=>{
      rst.data = JSON.parse(rst.data)
      arg.success(rst)
    } ,
    fail: arg.fail,
    complete: arg.complete,

    // header: {
    //   'content-type': 'application/json' // 默认值
    // },
    // method:'POST',
  })
}