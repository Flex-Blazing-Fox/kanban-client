<template>
    <section>
        <div class="ui segment signup-form">
            <h2 class="ui header center aligned">Register</h2>
            <div class="ui form">
                <div class="ui segment inner">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" v-model="registerData.fullname" placeholder="Full Name">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="mail icon"></i>
                            <input type="text" v-model="registerData.email" placeholder="Email">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" v-model="registerData.password" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="sync icon"></i>
                            <input type="password" v-model="confirmPassword" placeholder="Confirm Password">
                        </div>
                    </div>
                    <button  @click="register" :disabled="buttonDisabled" class="ui button fluid orange big" color="teal" type="submit">Sign Up</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name:"Register",
    data(){
        return {
            registerData:{
                fullname:'',
                email:'',
                password:'',
            },
            confirmPassword:'',
            buttonDisabled:true
        }
    },
    watch:{
       confirmPassword: function(){
           
            if(this.registerData.password !== this.confirmPassword){
                this.buttonDisabled = true
            } else {
                this.buttonDisabled = false;
            }
        },
    },
    methods:{
        register(){
            this.$emit('registerData', this.registerData)
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

.signup-form{
    width:500px;
    
}

.ui.signup-form{
    background: rgba(25, 25, 25, .3);
    padding:25px;
}

.ui.inner{
    background-color: teal;
    opacity: 1;
    z-index: 999;
}

.ui.header{
    color:#fff;
}
</style>