<template>
    <ul class="list-group">
        <li v-if="task.category===category" class="list-group-item">
            <div class="widget-content">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <div class="widget-heading">
                            <p v-if="form.edit.id !== task.id">{{task.title}}</p>
                            <form v-if="form.edit.id === task.id" @submit.prevent="submitEdit(task.id)">
                                <input  name="task" type="text" v-model="form.edit.title">
                                <button>Save</button> 
                            </form>
                        </div>
                    </div>
                    <div class="widget-content-right">
                        <button v-if="form.edit.id !== task.id" class="border-0 btn-transition btn-outline-success btn" @click="editTask(task)">
                            <i class="fa fa-edit"></i>
                        </button>

                        <button v-if="form.edit.id !== task.id" class="border-0 btn-transition btn-outline-danger btn" @click="deleteTask(task.id)">
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
    props : ['task']
}
</script>

<style>

</style>