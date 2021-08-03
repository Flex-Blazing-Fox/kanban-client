<template>
  <div>

      <div  v-if="changeForm === true" id="login" class="container d-flex justify-content-center align-items-center" style="padding-top: 7%;">
                <div class="col-lg-6">
                    <div class="container d-flex justify-content-center align-items-center mt-4 mb-5 border-line"> <img src="../assets/img/kanban.png" class="image"> </div>
                </div>
                <div class="col-lg-6">
                    <div id="login-form">
                        <div class="container d-flex flex-column justify-content-center align-items-center">
                            <form @submit.prevent="login" id="login-form" style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px #bababa;">
                                <h3 style="text-align: center; padding-bottom: 20px;">Login</h3>
                                <div class="form-group">
                                    <input v-model="user.email" type="email" class="form-control" id="email-login" aria-describedby="emailHelp" placeholder="Enter Email" autocomplete="off">
                                </div>
                                <div class="form-group">
                                    <input v-model="user.password" type="password" class="form-control" id="password-login" placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-primary btn-block" style="background-color: coral; color:whitesmoke;">Login</button>
                                <p style="margin-top: 1rem;">Register new account? <a @click.prevent="changeForm = false" id="go-to-register" style="text-decoration: none; cursor: pointer; color:coral">register here</a></p>
                                <p class="text-center">------- OR -------</p>
                                <div class="container d-flex flex-column justify-content-center align-items-center g-signin2" data-onsuccess="onSignIn"></div>
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
            <!-- login -->

            <!-- register form -->
            <div v-else-if="changeForm === false" class="container d-flex justify-content-center align-items-center" style="padding-top: 7%;">
                <div class="col-lg-6">
                    <div class="container d-flex justify-content-center align-items-center mt-4 mb-5 border-line"> <img src="../assets/img/kanban.png" class="image"> </div>
                </div>
                <div class="col-lg-6">
                    <div id="register-form">
                        <div class="container d-flex flex-column justify-content-center align-items-center">
                            <form @submit.prevent="register" id="register-form" style="background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px 0px #bababa;">
                                <h3 style="text-align: center; padding-bottom: 20px;">Register</h3>
                                <div class="form-group">
                                    <input v-model="user.email" type="email" class="form-control" id="email-register" aria-describedby="emailHelp" placeholder="Your Email" autocomplete="off">
                                </div>
                                <div class="form-group">
                                    <input v-model="user.password" type="password" class="form-control" id="password-register" placeholder="Your Password">
                                </div>
                                <button type="submit" class="btn btn-primary btn-block" style="background-color: coral; color:whitesmoke;">Submit</button>
                                <p style="margin-top: 1rem;">Already have an account? <a @click.prevent="changeForm = true" id="go-to-login" style="text-decoration: none; cursor: pointer; color:coral">login here</a></p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <!-- register form -->

  </div>
</template>

<script>
import Board from './Board.vue'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"

export default {
    name:"Homepage",
    components: {Board},
    data() {
     return {
         user: {
             email: "",
             password: ''
         },
         changeForm: true
         
     }
 },
 methods: {
     login(){
        axios({
            url: '/login',
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            data : this.user
        })
        .then(({data}) => {
             localStorage.setItem('access_token', data.access_token)
            //  this.isLogin = true
            this.$emit("changePage",true)
        })
        .catch((err)=> {
             console.log(err);
        })
     },

     register(){
            axios({
                method: 'POST',
                url: `/register`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                },
            })
            .then(data=>{
                // this.register = false
                this.changeForm = true
            })
            .catch((err)=> {
             console.log(err);
            })
            .finally(()=>{
                this.user.email = ''
                this.user.password = ''
            })
        }
 }
}
</script>

<style>

</style>