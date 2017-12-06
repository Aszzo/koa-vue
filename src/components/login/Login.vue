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
      <el-button type="primary" class="login-btn">登录</el-button>
    </div>
  </div>
</template>
<script>
  import './login.less'
  export default {
    name: "login",
    data(){
      return{
        user: '',
        pass: ''
      }
    }
  }
</script>
