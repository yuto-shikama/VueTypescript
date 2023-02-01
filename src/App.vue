<template>
  <div id="app">
    <div class="row" v-if="isLogin">
      <Header v-bind:isLogin="isLogin" />
      <sidebar class="sidebar-area"></sidebar>
      <router-view  v-on:change-login="changeLogin"  />
    </div>
    <div class="row" v-else>
      <Header v-bind:isLogin="isLogin" />
      <router-view  v-on:change-login="changeLogin"  />
    </div>
  </div>
  
</template>

<script>
import Header from './components/PageHeader.vue'
import Sidebar from './components/PageSidebar.vue'
export default {
  components: {
    Header,
    Sidebar
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods : {
    changeLogin: function(val) {
      this.isLogin = val
    }
  }
}
</script>

<style>
.sidebar-area {
  /* 左側に固定 */
  float: left;
}
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>