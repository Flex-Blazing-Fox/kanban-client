<template>
  <div>
    <div v-if="changeForm === true" id="login" class="container">
      <div  v-show="message.length ===0" class="alert my-4">
      </div>
        <div v-show="message.length !=0" class="alert alert-warning text-center my-4">{{message}}</div>

      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-8 col-xl-6">
          <div class="row">
            <div class="col text-center">
              <h2>Login</h2>
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input v-model="formLogin.Email" type="email" class="form-control" placeholder="Email" />
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input
               v-model="formLogin.Password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="row justify-content-start">
            <div class="col">
              <button v-on:click.prevent="login" class="btn btn-primary mt-4" type="submit">Login</button>
              <button v-on:click.prevent="changeForm = false" class="btn btn-primary mt-4">Register</button>
              <center><h3>OR</h3></center>
              <center>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="changeForm === false" id="register" class="container">
      <div  v-show="message.length ===0" class="alert my-4">
      </div>
        <div v-show="message.length !=0" class="alert alert-warning text-center my-4">{{message}}</div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-8 col-xl-6">
          <div class="row">
            <div class="col text-center">
              <h2>Register</h2>
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input v-model="formLogin.Email" type="email" class="form-control" placeholder="Email" />
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input
              v-model="formLogin.Password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="row justify-content-start">
            <div class="col">
              <button 
             @click="formAdd" class="btn btn-primary mt-4">Submit</button>
              <button v-on:click.prevent="changeForm = true" class="btn btn-primary mt-4">Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
Axios.defaults.baseURL = "http://localhost:3000";

export default {
  data() {
      return{
        formLogin:{
            Email:'',
            Password:''
        },
        message:[],
        changeForm: true
     }
  },
  methods:{
      formAdd(){
        Axios({
          method: "POST",
          url: "/register",
          headers: { "Content-Type": "application/json" },
          data:this.formLogin
        })
        .then(({data})=>{
          this.message = data.message
        })
        .catch((error)=>[
          this.message = error.response.data.err

        ])
      },
      login(){
        Axios({
          method: "POST",
          url: "/login",
          headers: { "Content-Type": "application/json" },
          data:this.formLogin
        })
        .then(({data})=>{
          localStorage.setItem("access_token",data.access_token)
          this.$emit("changePage",true)
          this.message = data.message
        })
        .catch((error)=>[
          this.message = error.response.data.err
        ])
      }
  }
}
</script>

<style>
</style>