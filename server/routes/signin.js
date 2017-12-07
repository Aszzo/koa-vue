const router = require('koa-router')()
const users = require('../controllers/user_info');

router.prefix('/signin')

router.post('/',users.signin)
router.post('/test',(ctx => {
  console.log(ctx.session)
  ctx.body = ctx.session
}))

module.exports = router;
