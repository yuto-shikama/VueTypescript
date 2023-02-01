<template>
    <main>
      <h2>{{title}}</h2>
      <button v-on:click="getProfile">Profile</button>
      <button v-on:click="getItems">Items</button>
      <div>{{profile}}</div>
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
        title: "Profileページです。",
        profile: ''
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
      getProfile: function() {
        this.profile = ''
        this.items = ''
        const token = this.myStore.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios.get('/api/aouth2/users/me/', config)
        .then((response) => {
          console.log("response.data = ", response.data)
          this.profile = JSON.stringify(response.data)
        })
        .catch((err) => {
          console.log("Error = ", err)
          this.profile = JSON.stringify(err)
        })
      },
      getItems: function() {
        this.profile = ''
        this.items = ''
        const token = this.myStore.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios.get('/api/aouth2/users/me/items/', config)
        .then((response) => {
          console.log("response.data = ", response.data)
          this.profile = JSON.stringify(response.data)
        })
        .catch((err) => {
          console.log("Error = ", err)
          this.profile = JSON.stringify(err)
        })
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