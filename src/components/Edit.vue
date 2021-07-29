<template>
  <div class="column is-full mt-1">
        <div class="is-flex is-align-items-center is-justify-content-center">
            <div class="column is-half">
                <form class="box">            
                    <div class="has-text-centered is-size-3 is-family-sans-serif has-text-weight-bold">
                        <h1>Edit Task</h1>
                    </div>                    
                    <div class="field">
                        <label class="label">Task Name</label>
                        <div class="control">
                            <input v-model="formEdit.title" type="text" class="input" placeholder="Add Task"/>{{dataTask.tittle}}                        
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button @submit.prevent="editTask(dataTask.id)" class="button is-success">
                                Edit Task
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
    name: "EditTask",
    props: ["dataTask"],

    data() {
        return {
            formEdit: {
                title : this.dataTask.title,
                category : this.dataTask.category
            }
        }
    },
     methods: {
        editTask(id) {
            axios({
                method: "PUT",
                url: "/tasks/" + id,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.formEdit.title,
                    category : this.formEdit.category
                }
            })
            .then((data) => {
                this.$emit("formEdit", false)
                
            })
            .catch((err) => {
                console.log(err)
            })
        },
        cancel(){
            this.$emit("formEdit", false)
        }
    }
}
</script>

<style>

</style>