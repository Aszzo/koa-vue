const userInfoService = require('../modle/user_info');
const userCode = require('../codes/users');
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
  }
};
