const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser')
const index = require('./routes/index')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const cors = require('koa2-cors');
const config = require('./config/config')
const signup = require('./routes/signup')
const signin = require('./routes/signin')
const app = new Koa();
app.use(logger());
app.use(bodyParser());

// session存储配置
const sessionMysqlConfig= {
  user: config.sql_config.USERNAME,
  password: config.sql_config.PASSWORD,
  database: config.sql_config.DATABASE,
  host: config.sql_config.HOST,
}
app.use(cors({
  origin:'http://localhost:8080',
  maxAge: 7 * 24 * 60 * 60,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }));
// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
app.use(index.routes(), index.allowedMethods())
app.use(signup.routes(), signup.allowedMethods())
app.use(signin.routes(), signin.allowedMethods())

module.exports = app;
