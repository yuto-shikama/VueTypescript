<template>
    <div class="awsS3">
      <h1>AWS S3 APP</h1>
      <div class="create">
        <div class="search">
          <label>buket:</label>
          <input v-model="input.buket" />
          <label>path:</label>
          <input v-model="input.path" />
          <button @click="getLs">実行</button>
        </div>
        <h3>結果</h3>
        <table id="table" border="1" align="center">
          <thead bgcolor="#CCFFFF">
            <tr>
              <th>No</th>
              <th>名前</th>
              <th>日付</th>
              <th>サイズ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in result.datas" v-bind:key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.date }}</td>
              <td>{{ data.size }}</td>
            </tr>
          </tbody>
        </table>
        <h3>ダウンロード</h3>
        <div class="download">
          <label>ファイル名:</label>
          <input v-model="input.dawnloadFile" />
          <button @click="getFile">ダウンロード</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import axios from 'axios';
  import saveAs from 'file-saver'
  import { useUserInfo } from '@/stores/userinfo'

  export default defineComponent({
  name: 'awsS3',
  setup() {

    const input = reactive({
      buket: 'catmimimomoruru',
      path: '',
      dawnloadFile: 'test.txt',
    });

    const result = reactive({
      datas: null
    });

    return {
      input,
      result,
    };
  },
  beforeRouteEnter(to, from, next) {
    const myStore = useUserInfo()
    next(async (vm) => {
      const config = {
          headers: {
            Authorization: `Bearer ${myStore.token}`
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
    getLs: function() {
      axios.get('/api/s3/ls',{params: {buket: this.input.buket, path: this.input.path}}).then((res) => {
        if (res && res.data) {
          console.log(res);
          this.result.datas = res.data.datas
        }
      });
    },
    getFile: function() {
      var target = this.input.dawnloadFile
      if (this.input.path != '') {
        target = this.input.path + '/' + this.input.dawnloadFile
      }
      axios.get('/api/s3/download',
      {
        'responseType': 'arraybuffer',
        params: 
        {
          buket: this.input.buket,
          saveFileName: this.input.dawnloadFile,
          targetFile: target
        },
      }
      ).then((res) => {
        if (res && res.data) {
          console.log(res)
          console.log(res.headers['content-type'])
          const blob = new Blob([res.data], {type: res.headers['content-type']});
          saveAs(blob, this.input.dawnloadFile)
        }
      });
    }
  },
  });
  </script>