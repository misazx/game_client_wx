// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('room').add({
    data:{
      name:'谁是卧底'
  }
  }).then(rst => { 
    }).catch(console.error)
}