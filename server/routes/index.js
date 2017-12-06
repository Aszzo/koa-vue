const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  ctx.body = "{ user: 'admin', password: 'admin', email: '544@163.com' }";
})

module.exports = router;
