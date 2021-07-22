<template>
    <div class="head">
        <!-- Navbar -->
        <Navbar 
            @changePages="changeView" @logout="logout" :isLogin="isLogin">
        </Navbar>
        <!-- End Of Navbar -->
        
        <!-- Login Page -->
        <Login 
            v-if="currentPages === 'login'"
            @loginData="login">
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
            :isLogin="{isLogin}"
            @addButton="cek"
            @deleteTask="deleteTask"
            @changeCategory="changeCategory"
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

axios.defaults.baseURL = "http://localhost:3000";

export default {
    name:'App',
    components:{ Navbar, Login, Register, Dashboard, LandingPage },
    data(){
        return{
            isLogin:false,
            currentPages:"",
            tasks:[]
        }
    },
    methods:{
        cek(){
            console.log('cek');
        },
        authCheking(){
            if(localStorage.access_token){
                console.log('login berhasil');
                this.currentPages = 'dashboard'
                this.isLogin = true;
                this.fetchAllTask()
            }else{
                console.log(`belum login`);
            }
        },
        changeView(pages){
            this.currentPages = pages
        },
        login(loginData){
            axios({
                method: 'POST',
                url: '/users/login',
                data: {
                    "email" : loginData.email,
                    "password" :loginData.password
                }
            })
            .then((result)=> {
                
                localStorage.setItem("access_token", result.data.access_token)
                this.authCheking()
            })
            .catch((err) => {
                console.log(err.response.data);
            })
        },
        logout(){
            localStorage.clear()
            this.currentPages = ''
            this.isLogin = false
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
        changeCategory(id, category){
            console.log(id);
            axios({
                method:'PATCH',
                url:`/tasks/category/${id}`,
                headers:{
                    access_token:localStorage.access_token
                },
                data:{
                    category:category
                },
            })
            .then((data)=>{
                this.fetchAllTask()
            })
            .catch(err=>{
                console.log(err.response.data[0].message);
            })
        },
        deleteTask(id){
            axios({
                method:'DELETE',
                url:`/tasks/${id}`,
                headers:{
                    access_token:localStorage.access_token
                }
            })
            .then(()=>{
                this.fetchAllTask();
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