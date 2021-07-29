<template>
 <div  id="register" class="container">
      <div v-if="!message" class="alert my-4"></div>
        <div v-if="message" class="alert alert-warning text-center my-4">{{message}}</div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-8 col-xl-6">
          <div class="row">
            <div class="col text-center">
              <h2>Add Task</h2>
            </div>
          </div>
          <div class="row align-items-center mt-4">
            <div class="col">
              <input v-model="formAdd.title" class="form-control" placeholder="Input title task" />
            </div>
          </div>
          <div class="row justify-content-start">
            <div class="col">
              <button 
              @click="addTask"
             class="btn btn-primary mt-4">Submit</button>
              <button @click="addForm" class="btn btn-primary mt-4">Back</button>
            </div>
          </div>
        </div>
      </div>
  
</template>

<script>
import Axios from 'axios';
Axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "AddTask",
  data() {
    return {
      formAdd: {
        title: "",
      },
      message:""
    };
  },
  methods: {
    addForm(){
        this.$emit("addForm",true)
    },
    addTask() {
     Axios({
        method: "POST",
        url: "/tasks",
        headers: {
          "Content-Type": "application/json" ,
          access_token: localStorage.access_token,
        },
        data: {
          title: this.formAdd.title,
        },
      })
        .then(({data}) => {
          this.message = data.message
        })
        .catch(() => {
            this.message = "Title must not empty"
        })
        .finally(() => {
          this.formAdd.title = "";
        });
    },
  },
};
</script>

<style>
</style>