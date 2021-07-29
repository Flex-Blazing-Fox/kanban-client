<template>
  <div class="boards-container__board__card">
    <p>{{ taskTitle.title }} </p><span style="color:grey">{{ taskTitle.userID }}</span>
    <button @click="deleteTask(taskTitle.id)">
      Delete <i class="fas fa-archive"></i>
    </button>
    <button @click="editTask(taskTitle)">Edit <i class="fas fa-edit"></i></button>
    <button @click.prevent="kategoriEditBack(taskTitle.id,taskTitle.Category)"><i class="fas fa-angle-double-left"></i></button>
    <button @click.prevent="kategoriEditNext(taskTitle.id,taskTitle.Category)"><i class="fas fa-angle-double-right"></i></button>
  </div>
</template>

<script>
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "Card",
  props: ["taskTitle","editKategori","fetch"],
  methods: {
    editTask(value){
      this.$emit("editValue",value)
      this.$emit("editTask",false)
    },
    deleteTask(id) {
      Axios({
        method: "DELETE",
        url: "/tasks/" + id,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          this.$emit("deleteTask");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    kategoriEditNext(id,kategori){
      let tmp = ""
      for (let index = 0; index < this.editKategori.length; index++) {
          if (kategori === this.editKategori[index]) {
            tmp=index
          }
      }
      if (tmp>=0 && tmp<3) {
        tmp++
      }
       Axios({
        method: "PATCH",
        url: "/tasks/" + id,
        headers: {
          access_token: localStorage.access_token,
        },
        data:{
          Category:this.editKategori[tmp]
        }
      })
        .then(() => {
          tmp=""
          this.$emit("fetchData")
        })
        .catch((err) => {
          console.log(err);
        });
    },
     kategoriEditBack(id,kategori){
      let tmp = ""
      for (let index = 0; index < this.editKategori.length; index++) {
          if (kategori === this.editKategori[index]) {
            tmp=index
          }
      }
      if (tmp != 3 && tmp!=0) {
        tmp--
      }
       Axios({
        method: "PATCH",
        url: "/tasks/" + id,
        headers: {
          access_token: localStorage.access_token,
        },
        data:{
          Category:this.editKategori[tmp]
        }
      })
        .then(() => {
          tmp=""
          this.$emit("fetchData")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style></style>
