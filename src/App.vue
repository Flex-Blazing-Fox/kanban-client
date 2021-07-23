<template>
    <div class="head">
        <!-- Navbar -->
        <Navbar 
            @changePages="changeView" 
            @logout="logout" 
            :isLogin="isLogin">
        </Navbar>
        <!-- End Of Navbar -->
        
        <!-- Login Page -->
        <Login 
            v-if="currentPages === 'login'"
            @loginData="login"
            @googleLogin="googleLogin">
        </Login>
        <!-- End Of Login Page -->
         
        <!-- Register Page -->
        <Register 
            v-else-if="currentPages === 'register'"
            @registerData="register"
            >
        </Register>
        <!-- End Of Register Page -->

        <!-- Dashboad -->
        <Dashboard 
            v-else-if="currentPages === 'dashboard'" 
            :isLogin="{isLogin}"
            @addButton="add"
            @deleteTask="deleteTask"
            @changeCategory="changeCategory"
            @updateTask="updateTask"
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
        add(category){
            axios({
                method: 'POST',
                url: '/tasks',
                headers:{
                    access_token: localStorage.access_token
                },
                data:{
                    title:'',
                    category:category
                }
            })
            .then(()=>{
                this.fetchAllTask()
            })
            .catch(err=>{
                console.log(err.response.data[0].message);
            })
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
        register(registerData){

            axios({
                method: 'POST',
                url: '/users/register',
                data: {
                    "fullname":registerData.fullname,
                    "email" : registerData.email,
                    "password" : registerData.password
                }
            })
            .then(()=> {
                this.currentPages = 'login'
            })
            .catch((err) => {
                console.log(err.response.data);
            })
        },
        googleLogin(pages){
             this.currentPages = pages
             this.authCheking()
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

            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        },
        fetchAllTask(){
            axios.get('/tasks', {
                headers:{
                    access_token:localStorage.access_token
                }
            })
            .then(({data}) => {
                console.log(data);
                this.tasks = data
            })
            .catch(err => {
                console.log(err.response.data[0].message);
            })
        },
        updateTask(id,title){
            console.log(`lagi ${title}`);
            axios({
                method:'PATCH',
                url:`/tasks/title/${id}`,
                headers:{
                    access_token:localStorage.access_token
                },
                data:{
                    title:title
                },
            })
            .then(()=>{
                this.fetchAllTask()
            })
            .catch(err=>{
                console.log(err.response.data[0].message);
            })
        },
        changeCategory(id, category){
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
            .then(()=>{
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
    },
    
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