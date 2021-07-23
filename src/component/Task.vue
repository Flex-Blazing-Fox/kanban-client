<template>
    <ul class="list-group">
        <li v-if="task.category === category.category" class="list-group-item">
            <div class="widget-content">
                <div class="widget-content-wrapper" style="display: flex; flex-direction: column">
                    <div class="widget-content-left">
                        <div style="width: 100%; display: flex;"  class="widget-heading">
                            <p v-if="edit.id !== task.id">{{task.title}}</p>
                            <form   v-if="edit.id === task.id" @submit.prevent="submitEdit">
                                <input style="max-width: 100%" name="task" type="text" v-model="edit.title">
                                <button class="btn btn-sm btn-outline-success" type="button" @click.prevent="submitEdit">Save</button>
                                <button class="btn btn-sm btn-outline-danger" type="button" @click.prevent="cancelEdit">Cancel</button>
                            </form>      
                        </div>
                    </div>
                    
                    <div class="widget-content-right">
                        <button v-if="edit.id !== task.id" class="border-0 btn-outline-success btn" @click="editTask">
                            <i class="fa fa-edit"></i>
                        </button>

                        <button v-if="edit.id !== task.id" class="border-0 btn-outline-danger btn" @click="deleteTask">
                            <i class="fa fa-trash"></i>
                        </button>
                        <button v-if="edit.id !== task.id && category.index !== 0" class="border-0 btn-outline-secondary btn" @click="moveTask(category.index-1)">
                            <i class="fa fa-angle-left"></i>
                        </button>
                        <button v-if="edit.id !== task.id && category.index !== category.lenght-1" class="border-0 btn-outline-secondary btn" @click="moveTask(category.index+1)">
                            <i class="fa fa-angle-right"></i>
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
        cancelEdit(){
            this.$emit('cancelEdit')
        },
        editTask(){
            this.$emit('editTask', this.task)
        },
        moveTask(indexCategory){
            this.$emit('moveTask', indexCategory, this.task)
        },
        deleteTask(){
            this.$emit('deleteTask', this.task.id)
        },
        submitEdit(){
            this.$emit('submitEdit', this.edit)
        }
    }
}
</script>

<style>

</style>