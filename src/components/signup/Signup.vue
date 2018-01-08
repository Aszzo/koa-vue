<template>
  <div class="signup-container">
    <img src="../../assets/logo.png">
    <h1>新用户注册</h1>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="signup-ruleForm">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="ruleForm2.user" auto-complete="off" placeholder="6-16位字母、数字、下划线"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="6-16位字母、数字"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm2.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import './signup.less'
  import '../../icon/iconfont.css'
  import ajax from '../../HttpRequest/HttpRequest';
  import hostName from '../../HttpRequest/hostName';
  import axios from 'axios';
  export default {
    name: "signup",
    data() {
      var checkUser = (rule, value, callback) => {
          if(!value) {
            return callback(new Error('用户名不能为空'));
          }else{
            if(!/[a-zA-Z0-9\_]{6,16}/.test(value)){
              return callback(new Error('用户名格式不正确'));
            }else{
              callback();
            }
          }
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'));
        }else{
          if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)){
            return callback(new Error('邮箱格式不正确'));
          }else{
           callback()
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if(/[a-zA-z0-9]{6,16}/.test(value)){
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }else{
            callback(new Error('密码格式不正确'));
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          user:'',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules2: {
          user: [
            {validator:checkUser,trigger:'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              username:this.ruleForm2.user,
              password:this.ruleForm2.pass,
              confirmPassword:this.ruleForm2.checkPass,
              email:this.ruleForm2.email
            };
            ajax.webRequest(undefined,`${hostName}/signup`,data)
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                throw new Error(err);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
