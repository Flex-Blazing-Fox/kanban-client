<template>
    <ul class="list-group">
        <li v-if="task.category === category" class="list-group-item">
            <div class="widget-content">
                <div class="widget-content-wrapper" style="display: flex; flex-direction: column">
                    <div class="widget-content-left">
                        <div class="widget-heading">
                            <p v-if="edit.id !== task.id">{{task.title}}</p>
                            <form v-if="edit.id === task.id" @submit.prevent="submitEdit">
                                <input  name="task" type="text" v-model="edit.title">
                                <input type="submit" value="Save">
                            </form>
                        </div>
                    </div>
                    
                    <div class="widget-content-right">
                        <button v-if="edit.id !== task.id" class="border-0 btn-transition btn-outline-success btn" @click="editTask">
                            <i class="fa fa-edit"></i>
                        </button>

                        <button v-if="edit.id !== task.id" class="border-0 btn-transition btn-outline-danger btn" @click="deleteTask(task.id)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Task',
    props: ['task', 'edit', 'category'],
    methods: {
        editTask(){
            this.$emit('editTask', this.task)
        },
        deleteTask(id){
            this.$emit('deleteTask', id)
        },
        submitEdit(){
            this.$emit('submitEdit', this.edit)
        }
    }
}
</script>

<style>

</style>