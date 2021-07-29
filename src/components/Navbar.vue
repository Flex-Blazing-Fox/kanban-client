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
                    <li class="nav-item active">
                    <a v-if="isLogin2 === true" class="nav-link" href="#" @click="addTask" id="nav-add">Add Task</a>
                    </li>
                    <li class="nav-item active">
                    <a v-if="isLogin2 === true" class="nav-link" href="#" @click="board" id="nav-add">Board</a>
                    </li>
                </ul>
                <a v-if="isLogin2 === true" class="nav-link active" href="#" @click="logout" id="nav-logout">Logout</a>
            </div>
        </nav>
    </div>
    <!-- navbar -->
</template>

<script>
export default {
    name: "navbar",
    props: ['isLogin2'],
    methods: {
        logout() {
            localStorage.clear()
            this.$emit("isLogin", false)

        },
        addTask(){
            this.$emit("formAdd", true)
        },
        board(){
            this.$emit("formAdd", false)
            this.$emit("formEdit", false)
        }
        
    }
}
</script>

<style>

</style>