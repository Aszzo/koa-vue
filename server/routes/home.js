const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  if(ctx.session && ctx.session.isLogin && ctx.session.userName){
    ctx.body = ctx.session
  }else{
    ctx.body = 'ERROR'
  }
})

module.exports = router;
