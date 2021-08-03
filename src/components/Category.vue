<template>
    <div class="column is-3" >
        <div class="card">
            <header class="card-header has-background-success">
                <h4 class="card-header-title has-text-white">
                    {{categoryName.name}}
                </h4>
            </header>
            <Card 
                v-for="task in tasks[categoryName.name]" 
                :key="task.id" 
                :taskData="task"
                :listCategory="category"
                @formAdd="formAdd"
                @formEdit ="formEdit"
                @kirimDataEdit="kirimDataEdit"
                @getTask="getTask"
            ></Card>
            <div class="is-devider"></div>
        </div>
    </div>

</template>

<script>
import Card from "../components/Card.vue"
export default {
    name : "Category",
    props : ["categoryName", "tasks", "category"],
    components: {Card},
    data(){
        return {
            cekData:[]
        }
    },
    methods: {
        formAdd() {
            this.$emit("formAdd")
        },
        formEdit(val){
            this.$emit("formEdit",val)
        },
        kirimDataEdit(val){
            this.$emit("kirimDataEdit", val)
        },
        getTask(){
            this.$emit("getTask")
        }
    }
}
</script>

<style>

</style>