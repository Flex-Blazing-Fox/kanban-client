<template>
            <!-- board -->
            <div class="columns kolom">
               <Category 
                    v-for="(list2, index) in categoryList" 
                    :categoryName="list2"
                    :category="categoryList"
                    :key="index" 
                    :tasks="filterTask"
                    @formAdd="getTask"
                    @formEdit ="formEdit"
                    @kirimDataEdit="kirimDataEdit"
                    @getTask="getTask"
                ></Category>
              {{cancel}}
            </div>
              <!-- board -->
</template>

<script>
import Category from "../components/Category.vue"
import axios from "axios"

export default {
    name: "Board",
    props:["cancel"],
    components: {Category},
    data() {
        return {
            taskList: [], 
            categoryList : [
                {name:"Materi"},
                {name:"Watch Video Recording"},
                {name:"Practice"},
                {name:"Done"}
            ]
        }
    },
    computed:{
         filterTask(){
            let object = []
            this.taskList.forEach(element => {
                if(object[element.category] === undefined){
                    object[element.category] = []
                }
                object[element.category].push(element)
            });
            return object
        }
    },
    methods: {
        getTask(){
            // console.log(this.categoryList,"data masuk")
            axios({
                method: 'GET',
                url: '/tasks',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({data}) => {
                this.taskList = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        formEdit(val){
            this.$emit("formEdit",val)
        },
        kirimDataEdit(val){
            this.$emit("kirimDataEdit", val)
        },
    },
    created(){ 
       this.getTask()
    }

}
</script>


<style>
.kolom{
    margin-top: 10px;
    margin: 10px 10px;
}
</style>