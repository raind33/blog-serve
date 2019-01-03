/**
 * 登录控制器
 * 
 */
const User = require("../model/user.model")
const config = require("../config")
const jwt = require('jsonwebtoken')

const {
  handleError,
  handleSuccess
} = require("../utils/handle")

// const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// md5 编码
const md5Decode = pwd => {
  return crypto
    .createHash("md5")
    .update(pwd)
    .digest("hex")
}


 class AuthController {
   static async login(ctx) {
     const { username, password } = ctx.request.body
     const user = await User
                .findOne({ username })
                .catch(err => ctx.throw(500, '服务器内部错误'))
    if (user) {
      if (user.password === md5Decode(password)) {
        const token = jwt.sign({
          name: user.name,
          password: user.password,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, config.USER.jwtTokenSecret)
        handleSuccess({ ctx, result: { token, lifeTime: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) }, message: "登陆成功" })
      } else handleError({ ctx, message: "密码错误!" })
    } else handleError({ ctx, message: "账户不存在" })
   }

   // 进入登录页面，如果数据库中有用户信息，就把用户信息返回给前端
   static async getAuth(ctx) {
     const user = await User.findOne({}, 'name username slogan gravatar').catch(err => ctx.throw(500, '服务器内部错误'))
     if (user) {
      handleSuccess({ ctx, result: user, message: '获取用户资料成功'})    
    } else handleError({ ctx, message: "获取用户资料失败" })
   }
 }

 module.exports = AuthController