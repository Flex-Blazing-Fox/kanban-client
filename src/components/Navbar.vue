<template>
    <!-- navbar -->
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: coral;" id="navbar">
            <a class="navbar-brand" style="color: whitesmoke;" href="#"><h3>Kanban</h3></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse navbar-nav" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li v-if="login" class="nav-item active">
                    <a class="nav-link" href="#" @click.prevent="addTask" id="nav-add">Add Task</a>
                    </li>
                </ul>
                <a v-if="login" class="nav-link active" href="#" @click.prevent="logout" id="nav-logout">Logout</a>
            </div>
        </nav>
    </div>
    <!-- navbar -->
</template>

<script>
export default {
    name: "navbar",
    props: ['login'],
    methods: {
        addTask(){
            this.$emit('addTask')
        },
        logout(){
            this.$emit('logout')
        },
    }
}
</script>

<style>

</style>