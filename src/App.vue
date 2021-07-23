<template>
    <div>
        <Navbar
        :login="form.login"
        @logout="logout"
        @loginForm="loginForm"
        @registerForm="registerForm">
        </Navbar>
           
        <div class="container">
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
                    <a class="register" id="register" href="" @click.prevent="registerForm">Register new account</a>
                    <div class="seperator">
                        <b>or</b>
                    </div>
                </form>
                <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
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
                    <a class="register" id="register" href=""  @click.prevent="loginForm">Already an account?</a>
                </form>
            </div>
            
            <!--TASK LIST  -->
            <div class="tasks row" v-if="form.login">
                <Category 
                v-for="(category, index) in categories" 
                :key="index"  
                :category="{category, index, lenght: categories.length}"
                :tasks="tasks"
                :edit="form.edit"
                @editTask="editTask"
                @cancelEdit="cancelEdit"
                @submitEdit="submitEdit"
                @deleteTask="deleteTask"
                @addTask="addTask"
                @moveTask="moveTask">>
                </Category>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'Axios'
import Toastify from 'toastify-js'
import Category from './component/Category.vue'
import Navbar from './component/Navbar.vue'

Axios.defaults.baseURL = 'https://kanban-server-9.herokuapp.com'
// Axios.defaults.baseURL = 'http://localhost:3000'
const option= {
            text: '',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: 'red'//'linear-gradient(to right, #00b09b, #96c93d)',
}

export default {
    name: 'App',
    components: {Category, Navbar},
    data(){
     return{
        form: {
            login: localStorage.access_token ? true : false,
            register: false,
            edit: {
                id: '',
                title: '',
                category: ''
            }
        },
        user: {
            email: '',
            password: '',
            rePassword:''
        },
        categories: ['Backlog', 'Todo', 'OnProgres', 'Done'],
        tasks: [],
        clientId: '579601506754-ni2ge2l5lr2sav8fr8u4ed3coadtmoe0.apps.googleusercontent.com'
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
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            this.form.login = false
        },
        editTask(task){
            this.form.edit.id = task.id
            this.form.edit.title = task.title
            this.form.edit.category = task.category
        },
        cancelEdit(){
            this.form.edit.id = ''
            this.form.edit.title = ''
            this.form.edit.category = ''
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
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
            .finally(()=>{
                this.user.email = ''
                this.user.password = ''
            })
        },
        OnGoogleAuthSuccess (idToken) {
            console.log(idToken);
            Axios({
                method: 'POST',
                url: `/user/googleSignIn`,
                data: {
                    idToken
                }
            })
            .then(result=>{
                localStorage.setItem('access_token', result.data.access_token)
                this.getTasks()
                this.form.login = true
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
            // Receive the idToken and make your magic with the backend
        },
        OnGoogleAuthFail (error) {
            console.log(error)
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
            .then(result=>{
                option.text = result.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
                this.form.register = false
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
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
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
        },
        addTask(task){
            Axios({
                method: 'POST',
                url: '/tasks',
                data: task,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                option.text = `Success add ${result.data.title}`
                option.backgroundColor = 'green'
                Toastify(option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
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
                option.text = `Success update ${result.data.title}`
                option.backgroundColor = 'green'
                Toastify(option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
            .finally(()=>{
                this.form.edit = {
                    id: '',
                    title: '',
                    category: ''
                }
            })
        },
        moveTask(indexCategory, task){
            Axios({
                method: 'PATCH',
                url: `/tasks/category/${task.id}`,
                data: {
                    category: this.categories[indexCategory]
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                option.text = `Success update ${result.data.title}`
                option.backgroundColor = 'green'
                Toastify(option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
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
                option.text = result.data.message
                option.backgroundColor = 'green'
                Toastify(option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
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
.google-signin-button {
  color: white;
  background-color: #f36a34;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>