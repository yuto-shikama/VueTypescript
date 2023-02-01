<template>
    <main>
      <h2>{{title}}</h2>
      <div class="mt-8">
        <form class="w-10/12 mx-auto md:max-w-md">
          <div class="mb-8">
            <label for="username" class="text-sm block">ユーザ名</label>
            <input type="text" name="username" v-model="username" class="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50">
          </div>
          <div class="mb-8">
            <label for="password" class="text-sm block">パスワード</label>
            <input type="password" name="password" v-model="password" class="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50">
          </div>
        </form>
      </div>
      <br />
      <button v-on:click="doLogin" class="bg-gray-900 hover:bg-gray-800 text-white rounded px-4 py-2">
        Login
      </button>
    </main>
  </template>
  
  <script>
  import { reactive } from 'vue'
  import axios from 'axios'
  import { useUserInfo } from '@/stores/userinfo'
  
  export default {
    setup() {
      const myStore = useUserInfo()
      return {
        myStore,
      }
    },
    data () {
      return {
        title: "Loginページです。"
      }
    },
    methods: {
      doLogin: function() {
          console.log("doLogin:: username=", this.username, " passowrd=", this.password)
          const params = new URLSearchParams();
          params.append('username', this.username);    // 渡したいデータ分だけappendする
          params.append('password', this.password);
          let config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };
  
          axios.post('api/aouth2/token', params, config)
          .then((response) => {
            console.log("response.data = ", response.data)
            this.myStore.token = response.data.access_token
            console.log("token = ", this.myStore.token)
            localStorage.setItem('token', response.data.access_token);
            this.$emit('change-login', true)
            this.$router.push('/Top')
          })
          .catch((err) => {
            console.log("Error = ", err)
          })
      }
    },
  }
  </script>
  
  <style scoped>
  main {
    height: calc(100vh - 152px);
    padding: 3% 0;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
  }
  h2 {
    margin: 0;
  }
  </style>