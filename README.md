# koa-vue

> koa+vue+vuex

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080(前端项目)
npm run dev

# build for production with minification（前端项目）
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#启动服务端项目
node server/bin/www

#初始化数据库
node init/index
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

基于koa2+vue+mysql搭建的管理系统（正在开发中...）:honeybee:

>遇到的问题：

# 1.会话状态管理(通过session实现)

### 描述：
用户登录成功之后，生成存放用户信息的`session`存到`mysql`中，同时将`sessionId`存`cookie`发送给客户端，由于该`cookie`是`httpOnly`状态的，因此无法在客户端通过js获取。

### 解决办法：
在进行ajax请求时设置`credentials:include`，并且在服务端设置`Access-Control-Allow-Credentials：true`。这样无需获取response中的cookie，在下次进行客户端向服务端请求时会自动携带上存放sessionId的cookie。

关于Request.credentials:(https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)

>更新
# 1.登录状态管理更新
开始采用session实现登录状态的管理，但是需要将session存入到数据库或者redis缓存中，影响服务端性能。后来采用token的方式实现登录状态管理。使用`jsonwebtoken`实现。密码加密预采用`bcryptjs `

参考文章：https://segmentfault.com/q/1010000007435062



