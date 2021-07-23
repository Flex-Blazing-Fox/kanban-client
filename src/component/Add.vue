<template>
    <form style="width: 100%; display: flex" class="" @submit.prevent="addTask">
        <input style="max-width: 75%" type="text" v-model="task.title" placeholder="Add New Task">
        <button style="min-width: 25%" class="btn btn-sm btn-outline-success" type="button">Add</button>
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
                category: this.category.category
            }
        }
    },
    methods : {
        addTask(){
            this.$emit('addTask', this.task)
            this.task= {
                title: '',
                category: this.category.category
            }
        }
    }
}
</script>

<style>

</style>