<template>
    <main>
      <h2>{{title}}</h2>
      <div>
        <label for="id">ユーザ名ID</label>
        <input name="id" v-model="id">
        <br />
        <label for="password">パスワード</label>
        <input name ="password" v-model="password">
        <br />
        <label for="name">名前</label>
        <input name ="name" v-model="name">
        <br />
        <label for="email">メールアドレス </label>
        <input name ="email " v-model="email">
        <br />
        <label for="authority_flg">権限</label>
        <select v-model="selected">
          <option disabled value="">権限を選択</option>
          <option>0</option>
          <option>1</option>
        </select>
      </div>
      <br />
      <button v-on:click="doSignup">新規登録</button>
      <br />
      <p>{{ result }}</p>
    </main>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    data () {
      return {
        title: "新規ユーザ登録ページです。",
        result: ""
      }
    },
    methods: {
      doSignup: function() {
          console.log(this.id)
          const params = new URLSearchParams();
          params.append('id', this.id);
          params.append('password', this.password);
          params.append('name', this.name);
          params.append('email', this.email);
          params.append('authority_flg', this.authority_flg);
          params.append('lock_flg', 0);
          params.append('del_flg', 0);
          let config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

          axios.post('api/aouth2/users/insert', params)
          .then((response) => {
            console.log("response.data = ", response.data)
            this.result = "完了"
          })
          .catch((err) => {
            console.log("Error = ", err)
            this.result = "エラー"
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