<template>
<div>
  <home-page v-if="isLogin===false" @changePage = "changePage"></home-page>
  <home v-else @isLogout="changePage"></home>
</div>
</template>

<script>
import HomePage from './HomePage.vue'
import Home from './Home.vue'
export default {
    name:"App",
    components:{HomePage,Home},
    data(){
      return {
        isLogin : false
      }
    },
  methods:{
    changePage(value){
      this.isLogin = value
    },
    cekLogin(){
      let acces_token = localStorage.getItem("access_token")
      if (acces_token) {
        this.isLogin = true
      }
      else{
        this.isLogin = false
      }
    }
  },
  created(){
    this.cekLogin()
  }
}
</script>

<style>

</style>