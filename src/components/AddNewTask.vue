<template>
    <button class="ui bottom green attached button" @click="add">
         <i class="add icon"></i>
            Add Task ({{this.category}})
    </button>
</template>

<script>
export default {
    name:"AddNewTask",
    props:['category'],
    methods:{
        add(){
            this.$emit('addButton')
        }
    }
}
</script>

<style>

</style>