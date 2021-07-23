<template>
    <div class="col" style="margin: 10px 2px">
        <div class="card"> <!--col-3-->
            <div class="card-header">
                <i class="fa fa-tasks"></i>&nbsp;{{category.category}}
            </div> 
        
            <div class="scroll-area-sm">
                <div style="position: static" class="ps-content">
                    <Task 
                    v-for="task in tasks" 
                    :key="task.id"
                    :task="task"
                    :edit="edit"
                    :category="category"
                    @editTask="editTask"
                    @cancelEdit="cancelEdit"
                    @deleteTask="deleteTask"
                    @submitEdit="submitEdit"
                    @moveTask="moveTask">
                    </Task>
                </div>
            </div>
            <div class="card-header">
                <Add
                :category="category"
                @addTask="addTask">
                </Add>
            </div>
        </div>
    </div>
</template>

<script>
import Task from './Task.vue'
import Add from './Add.vue'

export default {
    name: 'Category',
    props: ['category', 'edit', 'tasks'],
    components: {Task, Add},
    methods: {
        editTask(task){
            this.$emit('editTask', task)
        },
        cancelEdit(){
            this.$emit('cancelEdit')
        },
        moveTask(indexCategory, task){
            this.$emit('moveTask', indexCategory, task)
        },
        submitEdit(){
            this.$emit('submitEdit', this.edit)
        },
        deleteTask(id){
            this.$emit('deleteTask', id)
        },
        addTask(task){
            this.$emit('addTask', task)
        }
    }
}
</script>

<style>

</style>