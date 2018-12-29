const config = require('./config')
const Koa = require('koa')
const app = new Koa()



app.listen(config.PORT)
