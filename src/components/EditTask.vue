<template>
 <div  id="register" class="container">
      <div v-if="!message" class="alert my-4"></div>
        <div v-if="message" class="alert alert-warning text-center my-4">{{message}}</div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-8 col-xl-6">
          <div class="row">
            <div class="col text-center">
              <h2>Edit Task</h2>
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input v-model="formEdit.title" class="form-control" placeholder="Input title task" />
            </div>
          </div>
          <div class="row justify-content-start">
            <div class="col">
              <button 
              @click="editTask(editValue.id)"
             class="btn btn-primary mt-4">Submit</button>
              <button @click="editForm" class="btn btn-primary mt-4">Back</button>
            </div>
          </div>
        </div>
      </div>
  
</template>

<script>
import Axios from 'axios';
Axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "EditTask",
  props:["editValue"],
  data() {
    return {
      formEdit: {
        title: this.editValue.title,
      },
      message:"",
    };
  },
  methods: {
    editForm(){
        this.$emit("editForm",true)
    },
    editTask(id) {
     Axios({
        method:"PUT",
        url: "/tasks/"+id,
        headers: {
          "Content-Type": "application/json" ,
          access_token: localStorage.access_token,
        },
        data: {
          title: this.formEdit.title,
          Category:this.editValue.Category
        },
      })
        .then(({data}) => {
          this.message = data.message
        })
        .catch((error) => {
            if (error.response.data.err === "Task not found") {
              this.message = "Unauthorized"
            }
            else{
              this.message = "Title must not empty"
            }
        })
    },
  },
};
</script>

<style>
</style>