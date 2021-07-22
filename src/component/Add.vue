<template>
    <form style="width: 100%; display: flex" class="" @submit.prevent="addTask">
        <input style="min-width: 75%" type="text" v-model="task.title" placeholder="Add New Task">
        <input style="max-width: 25%" type="submit" value="Add">
    </form>
</template>

<script>
export default {
    name: 'Add',
    props: ['category'],
    data(){
        return {
            task: {
                title: '',
                category: this.category
            }
        }
    },
    methods : {
        addTask(){
            this.$emit('addTask', this.task)
            this.task= {
                title: '',
                category: this.category
            }
        }
    }
}
</script>

<style>

</style>