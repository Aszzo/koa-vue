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
    <div>{{count+"1"}}</div>
  </div>
</template>
<script>
  import './login.less'
  import axios from 'axios'
  import { Message } from 'element-ui';
  import { mapState } from 'vuex';
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
             if(response.data.success){
               location.href = '/'
             }else{
               this.$store.commit('LOGIN')
               this.$message.error(response.data.msg);
             }
          })
      },
    },
    computed:mapState({
      count: state => state.user_info.isLogin
    })
  }
</script>
