<template>
  <!-- board -->
  <div>
    <div class="boards-container__board">
      <h1>{{kategori}}</h1>
      <Card v-for="task in tasks[kategori]"
       :key="task.id"
       :taskTitle="task"
       @deleteTask="deleteTask"
       @editValue="editValue"
       @editTask="editTask"
       :editKategori="editKategori"
       @fetchData="fetchData"
       >
       </Card> 
  </div>
  <!-- board -->
</template>

<script>
import Card from '../Card.vue'

export default {
  name:"Board",
  components:{Card},
  props:["kategori","tasks","editKategori"],
  methods:{
    editValue(value){
      this.$emit("editValue",value)
    },
    editTask(value){
      this.$emit("editTask",value)
    },
    deleteTask(){
      this.$emit("deleteTask");
    },
    fetchData(){
      console.log("dari fetch data");
      this.$emit("fetchData")
    }
  }
}
</script>

<style></style>
