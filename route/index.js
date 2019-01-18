const Router = require('koa-router')
const config = require('../config')
const controller = require('../controller')

const router = new Router({
  prefix: config.APP.ROOT_PATH
})
router.post('/login', controller.auth.login)
router.get('/auth', controller.auth.getAuth)
router.get('/test', controller.auth.test)
module.exports = router