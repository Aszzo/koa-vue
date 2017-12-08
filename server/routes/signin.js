const router = require('koa-router')()
const users = require('../controllers/user_info');
const jwt = require('jsonwebtoken');
router.prefix('/signin')

router.post('/',users.signin)
router.post('/test',async ctx => {
  console.log(ctx.req.headers.token)
  let token = ctx.req.headers.token;
  jwt.verify(token, 'koa-vue', function(err, decoded) {
    console.log(decoded,1111) // bar
  });
  ctx.body = {}
})

module.exports = router;
