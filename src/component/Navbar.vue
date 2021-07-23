<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="/assets/logo/Kanban-Logo.png" width="15" height="30" class="d-inline-block align-top" alt="">
            Kanban
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li v-if="!login" class="nav-item">
                    <a class="nav-link" href="" @click.prevent="loginForm">Login </a>
                </li>
                <li v-if="!login" class="nav-item">
                    <a class="nav-link" href="" @click.prevent="registerForm">Register</a>
                </li>
                <li v-if="login" class="nav-item">
                    <a class="nav-link" href="">Setting</a>
                </li>
            </ul>

            <button v-if="login" class="btn btn-outline-success my-2 my-sm-0" @click="logout">Logout</button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['login'],
    methods: {
        logout(){
            this.$emit('logout')
        },
        registerForm(){
            this.$emit('registerForm')
        },
        loginForm(){
            this.$emit('loginForm')
        },
    }
}
</script>

<style>

</style>