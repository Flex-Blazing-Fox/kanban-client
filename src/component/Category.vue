<template>
    <div class="card" > <!--col-3-->
        <div class="card-header">
            <i class="fa fa-tasks"></i>&nbsp;{{category}}
        </div> 
    
        <div class="scroll-area-sm">
            <div style="position: static" class="ps-content">
                <ul v-for="task in tasks" :key="task.id" class="list-group">
                    <li v-if="task.category === category" class="list-group-item">
                        <div class="widget-content">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                    <div class="widget-heading">
                                        <p v-if="edit.id !== task.id">{{task.title}}</p>
                                        <form v-if="edit.id === task.id" @submit.prevent="submitEdit(task)">
                                            <input  name="task" type="text" v-model="edit.title">
                                            <input type="submit" value="Save">
                                        </form>
                                    </div>
                                </div>
                                
                                <div class="widget-content-right">
                                    <button v-if="edit.id !== task.id" class="border-0 btn-transition btn-outline-success btn" @click="editTask(task)">
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
            </div>
        </div>
        <form class="" @submit.prevent="">
            <input type="text" placeholder="Add New Task">
            <input type="submit" value="Add">
        </form>
    </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['category', 'tasks'],
    data(){
        return {
            edit: {
                id: '',
                title: '',
                category: ''
            }
        }
    },
    methods: {
        editTask(task){
            this.edit.id = task.id
            this.edit.title = task.title
            this.edit.category = task.category
        },
        submitEdit(){
            this.$emit('submitEdit', this.edit)
            this.edit = {
                id: '',
                title: '',
                category: ''
            }
        },
        deleteTask(id){
            this.$emit('deleteTask', id)
        }
    }
}
</script>

<style>

</style>