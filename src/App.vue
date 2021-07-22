<template>
    <div class="container">
        <button v-if="form.login" class="" @click='logout'>Logout</button>
        <!--LOGIN FORM-->   
        <div id="login" v-if="form.login === false && form.register === false" class="all-form">
            <form @submit.prevent="login"> 
                <h1>Login</h1>
                <div class="form-group">
                    <input type="email" placeholder="E-mail Address" v-model="user.email" required>
                    <span class="input-icon"><i class="fa fa-envelope"></i></span>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" v-model="user.password" required>
                    <span class="input-icon"><i class="fa fa-lock"></i></span>
                </div>      
                
                <button class="login-btn">Login</button>      
                <a class="register" id="register" href="#" @click="registerForm">Register new account</a>
            </form>
        </div>

        <!--REGISTER FORM-->
        <div id="register" v-if="form.login === false && form.register === true" class="all-form">
            <form @submit.prevent="register"> 
                <h1>Register</h1>
                <div class="form-group">
                    <input type="email" placeholder="E-mail Address" v-model="user.email" required>
                    <span class="input-icon"><i class="fa fa-envelope"></i></span>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" v-model="user.password" required>
                    <span class="input-icon"><i class="fa fa-lock"></i></span>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Re Password" v-model="user.rePassword" required>
                    <span class="input-icon"><i class="fa fa-lock"></i></span>
                </div>            
                    
                <button class="register-btn">Register</button>      
                <a class="register" id="register" href="#"  @click="loginForm">Already an account?</a>
            </form>
        </div>
        
        <!--TASK LIST  -->
        <div class="tasks" v-if="form.login">
            <Category 
            v-for="(category, index) in categories" 
            :key="index+1"  
            :category="category" 
            :tasks="tasks"
            @submitEdit="submitEdit"
            @deleteTask="deleteTask"></Category>
        </div>
    </div>
</template>

<script>
import Axios from 'Axios'
import Toastify from 'toastify'
import Category from './component/Category.vue'

Axios.defaults.baseURL = 'http://localhost:3000'
export default {
    name: 'App',
    components: {Category},
    data(){
     return{
        option: {
            text: '',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: '', //'linear-gradient(to right, #00b09b, #96c93d)',
        },
        form: {
            login: localStorage.access_token ? true : false,
            register: false,
        },
        user: {
            email: '',
            password: '',
            rePassword:''
        },
        categories: ['Backlog', 'Todo', 'OnProgres', 'Done'],
        tasks: []
        }
    },
    methods: {
        //hide&show form
        registerForm(){
            this.form.register = true
        },
        loginForm(){
            this.form.register = false
        },
        logout(){
            localStorage.removeItem('access_token')
            this.form.login = false
        },
        //Axios
        login(){
            Axios({
                method: 'POST',
                url: `/user/login`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(result=>{
                localStorage.setItem('access_token', result.data.access_token)
                this.getTasks()
                this.form.login = true
            })
            .catch(err=>{
                this.option.text = err.response.data.message
                this.option.backgroundColor = 'red'
                Toastify(this.option).showToast()
            })
            .finally(()=>{
                this.user.email = ''
                this.user.password = ''
            })
        },
        register(){
            Axios({
                method: 'POST',
                url: `/user/register`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                },
            })
            .then(()=>{
                this.form.register = false
            })
            .catch(err=>{
                this.option.text = err.response.data.message
                this.option.backgroundColor = 'red'
                Toastify(this.option).showToast()
            })
            .finally(()=>{
                this.user.email = ''
                this.user.password = ''
                this.user.rePassword = ''
            })
        },
        getTasks(){     
            Axios({
                method: 'GET',
                url: `/tasks`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                this.tasks = result.data
            })
            .catch(err=>{
                this.option.text = err.response.data.message
                this.option.backgroundColor = 'red'
                Toastify(this.option).showToast()
            })
        },
        submitEdit(task){
            Axios({
                method: 'PATCH',
                url: `/tasks/title/${task.id}`,
                data: {
                    title : task.title
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                // this.option.text = `Success update ${result.data.title}`
                // this.option.backgroundColor = 'green'
                // Toastify(this.option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                this.option.text = err.response.data.message
                this.option.backgroundColor = 'red'
                Toastify(this.option).showToast()
            })
            .finally(()=>{
                this.form.edit = ''
            })
        },
        deleteTask(id){
            Axios({
                method: 'DELETE',
                url: `/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                // this.option.text = result.data.message
                // this.option.backgroundColor = 'red'
                // Toastify(this.option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                console.log(err.response);
            })
        },
    },
    created(){
        if(this.form.login){
            this.getTasks()
        }
    }
}
</script>

<style>

</style>