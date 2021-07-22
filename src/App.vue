<template>
    <div class="head">
        <div class="ui fixed borderless huge menu">
            <div class="ui container grid">
                <div class="masthead only row">
                    <div class="left item">
                        <h3>KANBAN</h3>
                    </div>
                    <div class="right item">
                        <a class="ui inverted button">Log in</a>
                        <a class="ui inverted button">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="ui container content">
            <p>
               “Time is an equal opportunity employer. Each human being has exactly the same number of hours and minutes every day. 
               Rich people can't buy more hours. Scientists can't invent new minutes. And you can't save time to spend it on another day. 
               Even so, time is amazingly fair and forgiving. No matter how much time you've wasted in the past, you still have an entire tomorrow.”
            </p>
            <h3 class="name">-- Denis Waitley --</h3>
            <center class="getting-started-button">
                <div class="ui huge primary button">Get Started <i class="right arrow icon"></i></div>
            </center>
        </div> -->
        <!-- <Login></Login> -->
        <!-- <Register></Register> -->
        <Dashboard :tasks="tasks"></Dashboard>
    </div>
</template>

<script>
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import Dashboard from "./views/Dashboard.vue"
import axios from "axios";

export default {
    name:'App',
    components:{ Login, Register, Dashboard },
    data(){
        return{
            tasks: []
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
      fetchAllTask(){
        axios.get('http://127.0.0.1:3000/tasks', {
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
   
    .ui.fixed.borderless.menu {
        background-color: transparent;
    }

    .ui .masthead.only .item {
        color: rgb(255, 255, 255);
    }
    .item h3{
        font-size:18pt;
    }
    .ui .masthead.only .item .button {
        color: rgb(255, 255, 255);
        margin-left: 0.5em;
    }
    .ui .masthead.only .item .button:hover {
        color: rgb(2, 2, 2);
        margin-left: 0.5em;
    }

    .content{
        padding-top:250px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    p{
        font-family: 'Montserrat', sans-serif;
        font-size:16px;
        color:#fff;
        letter-spacing: 2p;
        text-align: center;
    }
    .name{
        font-family: 'Dancing Script', cursive;
        font-weight: bold;
        color:#fff;
        font-size:28px;
        text-align:center
    }
    .getting-started-button{
        margin-top:50px;
    }
</style>