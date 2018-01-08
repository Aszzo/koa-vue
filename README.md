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

参考文章：https://segmentfault.com/q/1010000007435062


>更新

# 1.登录状态管理更新
开始采用session实现登录状态的管理，但是需要将session存入到数据库或者redis缓存中，影响服务端性能。后来采用token的方式实现登录状态管理。使用`jsonwebtoken`实现。密码加密预采用`bcryptjs `
# 2.实现超时重新登录的思路
实际的开发中可能会遇到这样的需求，当用户长时间不进行服务端请求时系统自动退出登录。

解决思路：（假设规定的超时时间为半小时）客户端在登录之后进行首次服务端请求时携带当前时间的时间戳，与登录时的时间戳（即`token`创建时间）进行比较，若两个时间差超出半小时，则token此时应该是失效的（`token`在创建时也设置过期时间为半小时），让用户冲重新登录；若两个时间差小于半小时，则将此次请求的时间戳存放到缓存中或者数据库中，起个名字叫`last_time_stamp`，在下次服务端请求时将携带的时间戳与`last_time_stamp`进行比较，如果超出半小时，则让用户重新登录；如果小于半小时并且token的过期时间还没到，则默认用户为登录状态；如果小于半小时并且`token`的过期时间已到，则默认用户为登录状态，并且重新生成token返回给客户端，`last_time_stamp`更新为此次的时间戳，用作下次请求服务端时的对比。






