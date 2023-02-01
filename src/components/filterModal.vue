<template>
    <div id="filterModal">
      <div id="filterModal-content" class="filterModal">
        <button v-on:click="sortAsc()" class="filterModal__btn">昇順</button>
        <button v-on:click="sortDesc()" class="filterModal__btn">降順</button>
        <br>
        <input type="text" name="searchWord" v-model="searchWord" class="filterModal__serch">
        <button v-on:click="serch()" class="filterModal__btn">検索</button>
        <p>----------------------------------------</p>
        <div style="height:100px; width:200px; overflow-y:scroll;">
            <table border="1">
                <tbody>
                    <tr>
                        <th><input id="default-checkbox" type="checkbox" value="" v-model="isSelectAll" v-on:click="select"></th>
                        <td>全部選択</td>
                    </tr>
                    <tr v-for="file in fileList" v-bind:key="file.filename">
                        <th>
                            <input type="checkbox" :value="file" v-model="selected">
                        </th>
                        
                        <td>{{file.fileName}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>----------------------------------------</p>
        <button class="filterModal__btn" v-on:click="returnTrue()">OK</button>
        <button class="filterModal__btn" v-on:click="returnFalse()">キャンセル </button>
      </div>
    </div>
  </template>
      
<script>
    export default {
        name: "filterModal",
        props: ["fileListBase"],
        data() {
            return {
                fileList : this.fileListBase,
                selected: this.fileListBase,
                isSelectAll: true
            }
        },
        methods: {
            serch: function() {
                if (this.searchWord === '') {
                    this.fileList = this.fileListBase
                } else {
                    this.fileList = this.fileListBase.filter(fileListTmp => {
                        return fileListTmp.fileName.includes(this.searchWord)
                    })
                }
                this.isSelectAll = true
                this.selected = this.fileList
            },
            select: function() {
                this.selected = [];
                if (!this.isSelectAll) {
                    this.selected = this.fileList
                }
            },
            sortAsc: function() {
                this.$emit("sort-asc", "fileName");
            },
            sortDesc: function() { 
                this.$emit("sort-desc", "fileName");
            },
            returnFalse: function() {
                this.$emit("execute-method", false);
            },
            returnTrue: function() {
                this.$emit("execute-method", true,this.selected);
            },
        },
      };
</script>
      
<style scoped>
.filterModal {
  padding: 10px 20px;
  border: 1px solid #000000;
  background: #fcfdff;
  z-index: 2;
  display: block;
  text-align: center;
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.filterModal__serch {
    border: 1px solid #000000;
    width: 150px;
    background: #fcfdff;
}

.filterModal__cancel:hover {
  cursor: pointer;
  color: rgb(14, 48, 240);
  font-weight: bold;
}

.filterModal__btn {
  display: inline-block;
  margin: 10px 5px;
  text-decoration: none;
  width: 80px;
  height: 30px;
  text-decoration: none;
  color: #000000;
  border: solid 1px #000000;
  border-radius: 3px;
  transition: 0.4s;
  text-align: center;
  vertical-align: middle;
  font-size: 15px;
  background-color: #fcfdff;
}

.filterModal__btn:hover {
  background: #dce4f5;
  color: #000000;
  cursor: pointer;
}

#filterModal-overlay {
  z-index: 1;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>