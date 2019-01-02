const mongoose = require('mongoose')
const config = require('../config')

module.exports = {
  // 连接数据库
  connect() {
    mongoose.connect(config.MONGODB.uri, {useNewUrlParser: true})
    const db = mongoose.connection
    db.on('error', err => {
      console.log('数据库连接出错', err)
    })
    db.once('open', () => {
      console.log('数据库连接成功·')
    })
  }
}
