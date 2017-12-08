<template>
  <div class="login-container">
    <h1>欢迎使用博客后台管理系统</h1>
    <div class="user-container">

      <el-input v-model="user" placeholder="请输入用户名" class="username"></el-input>
    </div>
    <div class="pass-container">
      <el-input v-model="pass" placeholder="请输入密码" class="password" type="password"></el-input>
    </div>
    <div class="btn-container">
      <el-button type="primary" class="login-btn" v-on:click="submit">登录</el-button>
      <el-button type="primary" class="login-btn" v-on:click="test">测试</el-button>
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
          url: 'http://192.168.3.109:3000/signin',
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
      test:function () {
        axios({
          method: 'post',
          url: 'http://192.168.3.109:3000/signin/test',
          headers:{
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTI3MjA4OTUsImRhdGEiOnsibmFtZSI6ImFkbWluMTIifSwiaWF0IjoxNTEyNzIwODM1fQ.4xbw9cxyLGnsF796J4BQ2AaaUpCH8bNdl7KBkATH4Fc"
          },
          withCredentials:true
        })
          .then(response => {
            console.log(response)
          })
      }
    }
  }
</script>
