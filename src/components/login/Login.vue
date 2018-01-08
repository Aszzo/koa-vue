<template>
  <div class="login-container">
    <img src="../../assets/logo.png">
    <h1>欢迎使用博客后台管理系统</h1>
    <div class="user-container">

      <el-input v-model="user" placeholder="请输入用户名" class="username"></el-input>
    </div>
    <div class="pass-container">
      <el-input v-model="pass" placeholder="请输入密码" class="password" type="password"></el-input>
    </div>
    <div class="btn-container">
      <el-button type="primary" class="login-btn" v-on:click="submit">登录</el-button>
    </div>
  </div>
</template>
<script>
  import './login.less'
  import axios from 'axios'
  export default {
    name: "login",
    data(){
      return{
        user: '',
        pass: ''
      }
    },
    methods:{
      submit:function () {
        console.log(this.user,this.pass)
        axios({
          method: 'post',
          url: 'http://192.168.49.1:3000/signin',
          data: {
            username: this.user,
            password: this.pass
          },
          withCredentials:true
        })
          .then(response => {
            console.log(response)
          })
      },
//      test:function () {
//        axios({
//          method: 'post',
//          url: 'http://192.168.49.1:3000/signin/test',
//          headers:{
//            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTMyNDI1MTgsImRhdGEiOnsibmFtZSI6ImFkbWluMTIifSwiaWF0IjoxNTEzMjQyNDU4fQ.fW3CfnUKQXJ850Xc5Xa8R6wjmby_QWqWTxmifzV9GzM"
//          },
//          withCredentials:true
//        })
//          .then(response => {
//            console.log(response)
//          })
//      }
    }
  }
</script>
