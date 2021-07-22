<template>
    <div class="head">
        <!-- Navbar -->
        <Navbar 
            @changePages="changeView">
        </Navbar>
        <!-- End Of Navbar -->
        
        <!-- Login Page -->
        <Login 
            v-if="currentPages === 'login'">
        </Login>
        <!-- End Of Login Page -->

        <!-- Register Page -->
        <Register 
            v-else-if="currentPages === 'register'">
        </Register>
        <!-- End Of Register Page -->

        <!-- Dashboad -->
        <Dashboard 
            v-else-if="currentPages === 'dashboard'"
            :tasks="tasks">
        </Dashboard>
        <!-- End Of Dashboard -->

        <!-- Landing Page -->
        <LandingPage 
            v-else
            @changePages="changeView">
        </LandingPage>
        <!-- End Of Landing Page -->

    </div>
</template>

<script>
import Navbar from "./components/Nabar.vue"
import LandingPage from "./views/LandingPage.vue"
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import Dashboard from "./views/Dashboard.vue"
import axios from "axios";

axios.defaults.baseURL;

export default {
    name:'App',
    components:{ Navbar, Login, Register, Dashboard, LandingPage },
    data(){
        return{
            tasks: [],
            isLogin:false,
            currentPages:"",
        }
    },
    methods:{
      authCheking(){
        if(localStorage.access_token){
          console.log('login berhasil');
          this.fetchAllTask()
        }else{
          console.log(`belum login`);
        }
      },
      changeView(pages){
          this.currentPages = pages
      },
      fetchAllTask(){
        axios.get('/tasks', {
          headers:{
            access_token:localStorage.access_token
          }
        })
        .then(({data}) => {
          this.tasks = data
        })
        .catch(err => {
          console.log(err.response.data[0].message);
        })
      },
    },
    created: function (){
      this.authCheking()
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');

    .head{
        background: linear-gradient(to bottom, rgba(92, 77, 66, 0.8) 0%, rgba(92, 77, 66, 0.8) 100%), url("./img/bg-1.jpg");
        padding-bottom: calc(10rem - 4.5rem);
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
        height: 100%;
    }  
</style>