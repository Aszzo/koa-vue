const userInfoService = require('../modle/user_info');
const userUntils = require('../utils/user_utils');
const userCode = require('../codes/users');
const jwt = require('jsonwebtoken');
module.exports = {
  async signup(ctx) {
    /**
     * 注册字段：
     * username 6-16位字母，数字，- ,_不区分大小写
     * password 6-16位字母数字，区分大小写
     * email,confirmPassword
     */
    let formData = ctx.request.body;
    let result = {
      success:false,
      msg:'',
      data:null
    };
    let validateResult = await userInfoService.rulesSignUp(formData);
    if(!validateResult.success){
        result = validateResult;
        ctx.body = result
      return
    }
    let existOne = await userInfoService.getExitsOne(formData);
    if(existOne) {
      if (existOne.name === formData.username) {
        result.msg = userCode.FAIL_USER_NAME_IS_EXIST;
        ctx.body = result;
        return
      }
      if (existOne.email === formData.email) {
        result.msg = userCode.FAIL_EMAIL_IS_EXIST;
        ctx.body = result;
        return
      }
    }
    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      name: formData.username,
      create_time: new Date(),
      level: 1,
    })
    console.log(userResult)
    if(userResult && userResult.insertId*1>0){
      result.success = true
    }else{
      result.msg = userCode.ERROR_SYS
    }
    ctx.body = result;
  },
  /*登录*/
  async signin(ctx){
    let formData = ctx.request.body;
    let result = {
      success:false,
      msg:'',
      data:null
    };
    let validateResult = await userInfoService.rulesSignIn(formData);
    if(!validateResult.success){
      result = validateResult;
      ctx.body = result
      return
    }
    let testUsernameAndPassword = await userInfoService.findByUsernameAndPassword(formData);
    if(testUsernameAndPassword){
      let secret = 'koa-vue';
      let userToken = {'name':testUsernameAndPassword.name};
      let token = jwt.sign({exp:Math.floor(Date.now() / 1000) + (1 * 60),data:userToken},secret); // 签发token
      // let delExpiresSession = await userInfoService.deleteExpires(new Date().getTime()); //通过session保持会话状态
      // if(delExpiresSession){
      //   let session = ctx.session;
      //   session.isLogin = true;
      //   session.userName = testUsernameAndPassword.name;
      //   session.userId = testUsernameAndPassword.id;
      // }
      let findLoginName = await userUntils.findDataByUser('users_state',testUsernameAndPassword.name);
      if(Array.isArray(findLoginName)&&findLoginName.length>0){
          userUntils.updateData('users_state',Date.now(),testUsernameAndPassword.name);
      }else{
        let values = {name:testUsernameAndPassword.name,login_time:Date.now()};
        userUntils.insertData('users_state',values)
      }
      ctx.cookies.set('token',token,{
        maxAge:24 * 60 * 1000, // cookie有效时长
        httpOnly: true,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      });
      result.success = true;
      ctx.body = Object.assign({},result,{token:token});
      return
    }else{
      result.msg = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
      ctx.body = result;
      return
    }
  }
};
