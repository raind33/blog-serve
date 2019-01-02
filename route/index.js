const Router = require('koa-router')
const config = require('../config')
const router = new Router({
  prefix: config.APP.ROOT_PATH
})
router.post('/login', (ctx, next) => {
  ctx.response.body = {
    'test':'ewwe'
  }
})

module.exports = router