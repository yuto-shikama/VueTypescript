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
    const myStore = useUserInfo()

    const input = reactive({
      buket: 'catmimimomoruru',
      path: '',
      dawnloadFile: 'test.txt',
    });

    const result = reactive({
      datas: null
    });

    const getLs = () => {
      axios.get('/api/s3/ls',{params: {buket: input.buket, path: input.path}}).then((res) => {
        if (res && res.data) {
          console.log(res);
          result.datas = res.data.datas
        }
      });
    };

    const getFile = () => {
      var target = input.dawnloadFile
      if (input.path != '') {
        target = input.path + '/' + input.dawnloadFile
      }
      axios.get('/api/s3/download',
      {
        'responseType': 'arraybuffer',
        params: 
        {
          buket: input.buket,
          saveFileName: input.dawnloadFile,
          targetFile: target
        },
      }
      ).then((res) => {
        if (res && res.data) {
          console.log(res)
          console.log(res.headers['content-type'])
          const blob = new Blob([res.data], {type: res.headers['content-type']});
          saveAs(blob, input.dawnloadFile)
        }
      });
    };

    return {
      input,
      getLs,
      getFile,
      result,
      myStore,
    };
  },
  });
  </script>