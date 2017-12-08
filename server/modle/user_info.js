const dbUtils = require('./../utils/user_utils');
const validator = require('validator');
const userCode = require('../codes/users');
const user = {
  /**
   *查找一个已存在的用户信息
   * @param {object} 查找条件
   * @returns {object|null} 查找结果
   */
  async getExitsOne(params) {
    let _sql = `SELECT * FROM users where name="${params.username}" or email="${params.email}" `;
    let result = await dbUtils.query(_sql);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   *注册字段格式验证
   * @param {object} 所要验证字段
   * @returns {object} 验证结果
   */
  async rulesSignUp(params) {
    let result = {
      success: false,
      msg: '',
      data: null,
    };
    if (/[a-z0-9\_]{6,16}/.test(params.username.toLowerCase()) === false) {
      result.msg = userCode.ERROR_USER_NAME
      return result;
    }
    if (!validator.isEmail(params.email)) {
      result.msg = userCode.ERROR_EMAIL
      return result
    }
    if (/[a-zA-z0-9]{6,16}/.test(params.password) === false) {
      result.msg = userCode.ERROR_PASSWORD
      return result
    }
    if (params.password !== params.confirmPassword) {
      result.msg = userCode.ERROR_PASSWORD_CONFORM
      return result
    }
    result.success = true;
    return result;
  },
  /**
   *数据库创建用户
   * @param {object} 往数据库插入的字段
   * @returns {object} 执行结果
   */
  async create(params) {
    let result = await dbUtils.insertData('users', params)
    return result
  },
  /**
   * 根据用户名密码查找数据
   * @param params 查找条件
   * @returns {object} 查找结果
   */
  async findByUsernameAndPassword(params) {
    let _sql = `SELECT * FROM users where name="${params.username}" and password="${params.password}"`
    let result = await dbUtils.query(_sql);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   *验证登录时用户输入信息的格式是否符合规则
   * @param {object} 验证字段
   * @returns {object} 返回验证结果
   */
  async rulesSignIn(params) {
    let result = {
      success: false,
      msg: '',
      data: null,
    };
    if (/[a-z0-9\_]{6,16}/.test(params.username.toLowerCase()) === false) {
      result.msg = userCode.ERROR_USER_NAME
      return result;
    }
    if (/[a-zA-z0-9]{6,16}/.test(params.password) === false) {
      result.msg = userCode.ERROR_PASSWORD
      return result
    }
    result.success = true;
    return result;
  },
  /**
   * 删除数据库中过期的session
   * @param date 当前时间
   * @returns {object} 执行结果
   */
  async deleteExpires(date){
    let _sql = 'DELETE FROM `_mysql_session_store` WHERE expires  < ?';
    let result = await dbUtils.query(_sql,date);
    return result;
  }
};
module.exports = user;
