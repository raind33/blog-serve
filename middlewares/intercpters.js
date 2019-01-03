// const authIsVerified = require('../utils/auth');

module.exports = async (ctx, next) => {

  // 拦截器
	const allowedOrigins = ['https://rain.cn', 'https://admin.rain.cn', 'file://'];
	const origin = ctx.request.headers.origin || '';
	if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
		ctx.set('Access-Control-Allow-Origin', origin);
	};

	ctx.set({
		'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
		'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
		'Content-Type': 'application/json;charset=utf-8',
	});

	// OPTIONS
	// if (ctx.request.method == 'OPTIONS') {
	// 	ctx.status = 200;
	// 	return false;
	// };

	// 如果是生产环境，需要验证用户来源渠道，防止非正常请求
	// if (Object.is(process.env.NODE_ENV, 'production')) {
	// 	const { origin, referer } = ctx.request.headers;
	// 	if (origin !== 'file://') {
	// 		const originVerified = (!origin	|| origin.includes('rain.cn')) && 
	// 														(!referer || referer.includes('rain.cn'))
	// 		if (!originVerified) {
	// 			ctx.throw(403, { code: 0, message: '身份验证失败！' })
	// 			return false;
	// 		};
	// 	}
	// };

	

	await next();
}