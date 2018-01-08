const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const cors = require('koa2-cors');
const cookie = require('koa-cookie');
const config = require('./config/config')
const routers = require('./routes/index')
const ONE_DAY  = 24 * 3600 * 1000;
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
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept','token']
  }));
// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  rolling: true,
  cookie: {
    maxAge:7 * ONE_DAY,
    httpOnly:true,
    overwrite: false
  },
}))

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
app.use(routers.routes()).use(routers.allowedMethods())

module.exports = app;
