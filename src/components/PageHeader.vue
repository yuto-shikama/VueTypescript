<template>
    <header>
      <div class="row" v-if="isLogin">
        {{title}}
        <router-link to="/Top">Top</router-link>
        <router-link to="/Profile">Profile</router-link>
        <router-link to="/AwsS3">AwsS3</router-link>
        <router-link to="/Logout">Logout</router-link>
      </div>
      <div class="row" v-else>
        {{title}}
        <router-link to="/">Login</router-link>
        <router-link to="/Signup">Signup</router-link>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    props : ['isLogin'],
    data () {
      return {
        title: "練習サイト"
      }
    }
  }
  </script>
  
  <style scoped>
  header {
    padding: 1.8em 5%;
    background: #778899;
  }
  header .row {
    text-align: right;
  }
  header a {
    color: #fff;
    text-decoration: none;
    margin-left: 2em;
  }
  header a:hover {
    text-decoration: underline;
  }
  h1 {
    margin: 0;
    color: #fff;
  }
  </style>