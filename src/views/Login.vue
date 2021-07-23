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
                        <form class="ui form">
                            <div class="ui segment inner">
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="mail icon"></i>
                                        <input type="text" v-model="loginData.email" placeholder="Email">
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="lock icon"></i>
                                        <input type="password" v-model="loginData.password" placeholder="Password">
                                    </div>
                                </div>
                                <button @click="login" type="submit" class="ui button fluid orange big" color="teal">Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div class="column">
                        <!-- <div class="ui icon header">
                           <h2 class="ui header center aligned">Social Login</h2>
                        </div> -->
                        <div id="my-signin2"></div>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name:"Login",
    data(){
        return {
            loginData:{
                email:'',
                password:'',
            }
        }
    },
    methods:{
        login(){
            this.$emit('loginData', this.loginData)
        },
        onSuccess(googleUser) {
            console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
            let id_token = googleUser.getAuthResponse().id_token;

            axios({
                method: 'POST',
                url:'http://localhost:3000/users/googleLogin',
                data:{
                    idToken : id_token
                }
            })
            .then(({data}) => {     
                localStorage.setItem('access_token', data.access_token)
                this.$emit('googleLogin', 'dashboard')
            })
            .catch(err=> {
               console.log(err.response.data[0].message);
            })
            
        }
    },
    mounted(){
        gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 'full',
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
      });
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
}

.ui.header{
    color:#fff;
}
</style>