<template>
    <main>
      <h2>{{title}}</h2>
      <button v-on:click="doLogout">Logout</button>
    </main>
  </template>
  
  <script>
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
        title: "Logoutページです。"
      }
    },
    beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const config = {
          headers: {
            Authorization: `Bearer ${vm.myStore.token}`
          }
        };
        axios.get('/api/aouth2/users/me/', config)
        .then((response) => {
          console.log("response.data = ", response.data)
          
        })
        .catch((err) => {
          alert('ログインしてください')
          console.log("Error = ", err)
          vm.$router.push('/')
        })
      next();
    });
    },
    methods: {
      doLogout: function() {
        this.myStore.token = ''
        this.$emit('change-login', false)
        this.$router.push('/')
      }
    }
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