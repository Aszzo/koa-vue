const dbUtils = require('./../utils/user_utils');
const validator = require('validator');
const userCode = require('../codes/users');
const user = {
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
  async create(params) {
    let result = await dbUtils.insertData('users', params)
    return result
  },
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
  }
};
module.exports = user;
