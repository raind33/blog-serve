/**
 * 用户登录权限验证，使用jwt
 */

const config = require('../config')
const jwt = require('jsonwebtoken')

// 验证Auth
const authToken = req => {
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')
    if (Object.is(parts.length, 2) && Object.is(parts[0], 'rain')) {
      return parts[1]
    }
  }
  return false
}

module.exports = async (ctx, next) => {
  // OPTIONS 跨域POST发送json时，会先发送一个OPTIONS预请求
	if (ctx.request.method == 'OPTIONS') {
		ctx.status = 200;
		return false;
	};
  // 排除auth的post请求以及登录的post请求，因为登录的时候jwt token还未生成，所以token不做验证
  const isLike = Object.is(ctx.request.url, '/api/like') && Object.is(ctx.request.method, 'POST');
  const isPostAuth = Object.is(ctx.request.url, '/api/auth') && Object.is(ctx.request.method, 'POST');
  const isLogin = Object.is(ctx.request.url, '/api/login') && Object.is(ctx.request.method, 'POST');
  const isHero = Object.is(ctx.request.url, '/api/hero') && Object.is(ctx.request.method, 'POST');
  const isPostComment = Object.is(ctx.request.url, '/api/comment') && Object.is(ctx.request.method, 'POST');
  if (isLike || isPostAuth || isPostComment || isLogin || isHero) {
    await next();
    return false;
  };

  // 拦截所有非管理员的非get请求
  if (!Object.is(ctx.request.method, 'GET')) {
    const token = authToken(ctx.request)
    if (token) {
      try {
        const decodedToken = jwt.verify(token, config.USER.jwtTokenSecret)
        if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
          await next()
        } else {
          ctx.throw(401, {
            code: -2,
            message: '身份验证失败！'
          })
          return false;
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      return false
    }
  }
  await next();
}