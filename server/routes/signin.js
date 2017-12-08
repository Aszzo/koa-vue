const router = require('koa-router')()
const users = require('../controllers/user_info');
const MysqlStore = require('koa-mysql-session')
const config = require('../config/config')
const sessionMysqlConfig= {
  user: config.sql_config.USERNAME,
  password: config.sql_config.PASSWORD,
  database: config.sql_config.DATABASE,
  host: config.sql_config.HOST,
}
router.prefix('/signin')

router.post('/',users.signin)
router.post('/test',ctx => {
  console.log(ctx.session)
  ctx.body = ctx.session
})

module.exports = router;
