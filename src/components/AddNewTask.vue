<template>
    <button class="ui bottom green attached button" @click="add(category)">
         <i class="add icon"></i>
            Add Task
    </button>
</template>

<script>
export default {
    name:"AddNewTask",
    props:['category'],
    methods:{
        add(category){
            this.$emit('addButton', category)
        }
    },
}
</script>

<style>

</style>