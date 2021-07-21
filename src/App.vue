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
        
        <!--TASK LIST-->
        <div class="tasks" v-if="form.login">
            <div v-for="(category, index) in categories" :key="index+1" class="card"> <!--col-3-->
                <div class="card-header">
                    <i class="fa fa-tasks"></i>&nbsp;{{category}}
                </div> 

                <div class="scroll-area-sm">
                    <div style="position: static" class="ps-content">
                        <ul class="list-group">
                            <li v-for="task in tasks" :v-if="task.category===category" :key="task.id" class="list-group-item">
                                <div class="widget-content">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left">
                                            <div class="widget-heading">
                                                <p v-if="form.edit.id !== task.id">{{task.title}}</p>
                                                <form v-if="form.edit.id === task.id" @submit.prevent="submitEdit(task.id)">
                                                    <input  name="task" type="text" v-model="form.edit.title">
                                                    <button>Save</button> 
                                                </form>
                                            </div>
                                        </div>
                                        <div class="widget-content-right">
                                            <button v-if="form.edit.id !== task.id" class="border-0 btn-transition btn-outline-success btn" @click="editTask(task)">
                                                <i class="fa fa-edit"></i>
                                            </button>
                    
                                            <button v-if="form.edit.id !== task.id" class="border-0 btn-transition btn-outline-danger btn" @click="deleteTask(task.id)">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'Axios'

Axios.defaults.baseURL = 'http://localhost:3000'
export default {
    name: 'App',
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
        editTask(task){
            this.form.edit.id = task.id
            this.form.edit.title = task.title
            this.form.edit.category = task.category
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
        submitEdit(id){
            Axios({
                method: 'PATCH',
                url: `/tasks/title/${id}`,
                data: {
                    title : this.form.edit.title
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
                option.text = result.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
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