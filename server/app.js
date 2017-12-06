const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser')
const index = require('./routes/index')
const users = require('./routes/user')

app.use(logger());
app.use(bodyParser());
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app;
