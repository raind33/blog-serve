const config = require('./config')
const Koa = require('koa')
const app = new Koa()
const router = require('./route')
const mongoose = require('./mongodb')
const interceptor = require('./middlewares/intercpters')
mongoose.connect()

app.use(interceptor)
app
  .use(router.routes())
  .use(router.allowedMethods()) 
app.listen(config.APP.PORT)
console.log(`app started at port ${config.APP.PORT}...`);