<template>
    <section>
        <div class="ui segment signin-form">
            <div class="ui two column stabkable center aligned grid">
                <div class="ui vertical divider">Or</div>
                <div class="middle aligned row">
                    <div class="column">
                        <div class="ui icon header">
                           <h2 class="ui header center aligned">LOGIN</h2>
                        </div>
                        <div class="ui form">
                            <div class="ui segment inner">
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="mail icon"></i>
                                        <input type="text" placeholder="Email">
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="lock icon"></i>
                                        <input type="text" placeholder="Password">
                                    </div>
                                </div>
                                <button class="ui button fluid orange big" color="teal" type="submit">Sign In</button>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui icon header">
                           <h2 class="ui header center aligned">Social Login</h2>
                        </div>
                        <div :id="my-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name:"Login",
    data(){
        return {
            email:'',
            password:'',
            baseUrl: 'http://localhost:3000'
        }
    },
    methods:{
        login(){
            axios({
                method: 'POST',
                url: `${this.baseUrl}/users/login`,
                data: {
                    "email" : this.email,
                    "password" : this.password
                }
            })
            .then((result)=> {
                console.log(result);
                localStorage.setItem("access_token", result.data.access_token)
            })
            .catch((err) => {
                console.log(err.response.data);
            })
        }
    }
}
</script>

<style scoped>
section{
    height: 100vh;
    display:flex;
    align-items: center;
    justify-content: center;
}

.signin-form{
    width:720px;
    
}

.ui.signin-form{
    background: rgba(25, 25, 25, .3);
    padding:25px;
}

.ui.inner{
    background-color: teal;
    z-index: 999;
}

.ui.header{
    color:#fff;
}
</style>