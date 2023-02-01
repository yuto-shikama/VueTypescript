<template>
    <main>
      <h2>{{title}}</h2>
      <button @click="myStoreCount.increment" class="bg-gray-900 hover:bg-gray-800 text-white rounded px-4 py-2">increment</button>
      <p>Count: {{ myStoreCount.count }}</p>
      <p>DoubleCount: {{ myStoreCount.double }}</p>
      <p>Count(String): {{ countString }}</p>
      <dev class="flex justify-center">
      <table class="table-auto border border-indigo-600" border="1">
        <thead>
          <tr>
            <th>No.</th>
            <th><input id="default-checkbox" type="checkbox" value="" style="position:absolute">
              <label v-on:click="sortBy('checkFlg')" style="padding:0 0 0 1.5em" v-if="sort_asc && sort_key == 'checkFlg'" >△</label>
              <label v-on:click="sortBy('checkFlg')" style="padding:0 0 0 1.5em" v-else>▽</label>
            </th>
            <th>
              ファイル名
              <button v-on:click="showModal" v-if="sort_asc && sort_key == 'fileName'" class="bg-gray-900 hover:bg-gray-800 text-white rounded px-4 py-2">△</button>
              <button v-on:click="showModal" v-else class="bg-gray-900 hover:bg-gray-800 text-white rounded px-4 py-2">▽</button>
              <filterModal
                :fileListBase="fileListBase"
                v-show="modalFlg"
                @execute-method="executeMethod"
                @sort-asc="sortAsc"
                @sort-desc="sortDesc"
              ></filterModal>
            </th>
            <th>ファイル取得
              <label v-on:click="sortBy('status')" style="padding:0 0 0 1.5em" v-if="sort_asc && sort_key == 'status'" >△</label>
              <label v-on:click="sortBy('status')" style="padding:0 0 0 1.5em" v-else>▽</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, index) in sort_fileList" v-bind:key="file.filename">
            <td>{{index + 1}}</td>
            <td>
              <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </td>
            <td>{{file.fileName}}</td>
            <td>{{file.status}}</td>
          </tr>
        </tbody>
      </table>
    </dev>
    </main>
  </template>
  
  <script>
  import { computed } from 'vue'
  import axios from 'axios'
  import { useMyStore } from '@/stores/counter'
  import { useUserInfo } from '@/stores/userinfo'
  import filterModal from '@/components/filterModal.vue'

  const fileListBase = [
    {
      checkFlg : 0,
      fileName : "ファイル1",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル2",
      status : 1. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル3",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル4",
      status : 1. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル5",
      status : 1. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル6",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル7",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル8",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル9",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル10",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル11",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル12",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル13",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル14",
      status : 0. 
    },
    {
      checkFlg : 0,
      fileName : "ファイル15",
      status : 0. 
    },
  ]

  export default {
    name: "HelloWorld",
    components: {
      filterModal,
    },
    setup() {
      const myStoreCount = useMyStore()
      const countString = computed(() => {
        return String(myStoreCount.count)
      })
      
      const myStore = useUserInfo()

      return {
        computed,
        myStoreCount,
        myStore,
        countString,
        fileListBase,
      }
    },
    data () {
      return {
        title: "TOPページです。",
        fileList: fileListBase,
        modalFlg: false,
        sort_key: "",
        sort_asc: true,
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
      showModal: function() {
        this.modalFlg = true;
      },
      executeMethod: function(result,filterFileList) {
        this.modalFlg = false
        if (result) {
          this.fileList = filterFileList
        }
      },
      sortBy: function(key) {
        this.sort_key === key
        ? (this.sort_asc = !this.sort_asc)
        : (this.sort_asc = true)
        this.sort_key = key
      },
      sortAsc: function(key) {
        this.sort_asc = true
        this.sort_key = key
        this.modalFlg = false;
      },
      sortDesc: function(key) {
        this.sort_asc = false
        this.sort_key = key
        this.modalFlg = false;
      },
      sortFileList: function() {
        let set = 1;
        this.sort_asc ? (set = 1) : (set = -1)
        this.fileList.sort((a, b) => {
          if (a[this.sort_key] < b[this.sort_key]) return -1 * set;
          if (a[this.sort_key] > b[this.sort_key]) return 1 * set;
          return 0;
        })
      }
    },
    computed: {
      sort_fileList: function() {
        if(this.sort_key != "") {
          this.sortFileList()
          return this.fileList
        } else {
          return this.fileList
        }
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
  table {
  border-collapse: collapse;
  width: 50%
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  th {
    background-color: #1E90EF;
  }
  </style>