<template>
    <div class="column is-full mt-1">
        <div class="is-flex is-align-items-center is-justify-content-center">
            <div class="column is-half">
                <form @submit.prevent="addTask" class="box">            
                    <div class="has-text-centered is-size-3 is-family-sans-serif has-text-weight-bold">
                        <h1>Add New Task</h1>
                    </div>                    
                    <div class="field">
                        <label class="label">Task Name</label>
                        <div class="control">
                            <input v-model="formAdd.tittle" type="text" class="input" placeholder="Add Task"/>                        
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button is-success">
                                Add Task
                            </button>
                            <button @click.prevent="cancel" class="button is-danger">
                                Cancel
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"


export default {
    name: "AddTask",
    data() {
        return {
            formAdd: {
                tittle : ""
            }
        }
    },
    methods: {
        addTask() {
            axios({
                method: "POST",
                url: "/tasks",
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.formAdd.tittle
                }
            })
            .then(data => {
                this.$emit("formAdd", false)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(()=>{
                this.formAdd.tittle = ""
            })
        },
        cancel(){
            this.$emit("formAdd", false)
        }
    }
}
</script>

<style>

</style>