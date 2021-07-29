<template>
    <!-- navbar -->
    <div id="navbar">
        <nav class="navbar navbar-expand-xl">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <button @click="home" type="button" class="btn btn-primary">Home</button>
                </li>
                <li class="nav-item">
                    <button @click="addForm" type="button" class="btn btn-primary">Add</button>
                </li>
                <li class="nav-item">
                    <button @click="logout" type="button" class="btn btn-primary">Logout</button>
                </li>
            </ul>
        </nav>
    </div>
    <!-- navbar -->
</template>

<script>
export default {
    name:"Navbar",
    methods:{
        logout(){
            localStorage.clear(),
            this.$emit("isLogin",false)
        },
        addForm(){
            this.$emit("addForm",false)
        },
        home(){
            this.$emit("home",true)
            this.$emit("home2",true)
        }
    }
}
</script>

<style>

</style>