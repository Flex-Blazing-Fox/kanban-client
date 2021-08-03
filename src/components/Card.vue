<template>
  <div>
    <div class="card-content">
        <div class="content">
            {{taskData.title}}
        </div>
    </div>
    <footer class="card-footer">
        <a href="#" @click.prevent="formEdit" class="card-footer-item">Edit</a>
        <a href="#" @click.prevent="deleteTask(taskData.id)"  class="card-footer-item">Delete</a>
        <div class="card-footer-item select is-primary">
            <select @submit.prevent="changeCategory" v-model="category">
                <option v-for="(category, index) in listCategory" :key="index" v-bind:value="category.name">{{category.name}}</option>
            </select>
        </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"

export default {
    name: "Card",
    props: ["taskData","listCategory"],
    data() {
        return{
            category:this.taskData.category,
            dataTask:this.taskData
        }
    },
    watch: {
        category: function (value,prev) {
        console.log(value,prev,"ssss");
        this.changeCategory(value)
        }
    },
    methods: {
        deleteTask(id) {
            axios({
                method: "DELETE",
                url: "/tasks/" + id,
                headers: {
                    access_token: localStorage.access_token
                },
            })
            .then(() => {
                this.$emit("formAdd")
            })
            .catch((err) => {
                console.log(err)
            })
        },
        formEdit(){
            this.$emit("formEdit", true)
            this.$emit("kirimDataEdit", this.dataTask)
        },
        changeCategory(value) {
            console.log(value,"DDDDD");
            axios({

                method: "PATCH",
                url: "/tasks/" + this.taskData.id,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    category: value
                }
            })
            .then((data) => {
                this.$emit("getTask")
            })
            .catch((err) => {
                console.log(err);
            })
        },
        
    },
}
</script>

<style>

</style>