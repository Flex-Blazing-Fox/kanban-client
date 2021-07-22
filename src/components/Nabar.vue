<template>
    <div class="ui fixed borderless huge menu">
        <div class="ui container grid">
            <div class="masthead only row">
                <div class="left item">
                    <h3 @click="changeView()">KANBAN</h3>
                </div>
                <div class="right item">
                    <a href="#" @click="changeView('login')" class="ui inverted button">Log in</a>
                    <a href="#" @click="changeView('register')" class="ui inverted button">Sign Up</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Navbar",
    data(){
        return {
            
        }
    },
    methods:{
        changeView(pages){
            this.$emit('changePages', pages)
        }
    }
}
</script>

<style scoped>
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
</style>