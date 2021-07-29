<template>
  <div>
    <Navbar @isLogin="logout" @addForm="addForm" @home="addForm" @home2="editTask" ></Navbar>
    <div v-if="changePages && changePagesEdit" class="boards-container">
      <Board
        v-for="(kategori, index) in Category"
        :kategori="kategori"
        :key="index"
        :tasks="filterTask"
        @editTask="editTask"
        @deleteTask="deleteTask"
        @editValue="editValue"
        :editKategori="Category"
        @fetchData="fetchData"
      >
      </Board>
    </div>
    <AddTask v-else-if="!changePages" 
    @addForm="addForm"
    >
    </AddTask>
    <EditTask v-if="!changePagesEdit"
     :editValue="editData"
     @editForm="editTask"
     >
     </EditTask>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Board from "./components/board/Board";
import AddTask from "./components/AddTask.vue";
import EditTask from "./components/EditTask.vue";

import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "Home",
  components: { Navbar, Footer, Board, AddTask, EditTask },
  data() {
    return {
      Category: ["Back Log", "Todo", "Doing", "Done"],
      taskList: [],
      changePages: true,
      changePagesEdit: true,
      editData:""
    };
  },
  computed: {
    filterTask() {
      let object = [];
      this.taskList.forEach((el) => {
        if (object[el.Category] === undefined) {
          object[el.Category] = [];
        }
        object[el.Category].push(el);
      });
      return object;
    },
  },
  methods: {
    logout(value) {
      this.$emit("isLogout", value);
    },
    editTask(value) {
      this.changePagesEdit = value;
      this.fetchData();
    },
    addForm(value) {
      this.changePages = value;
      this.fetchData();
    },
    editValue(value){
      this.editData=value
    },
    deleteTask() {
      this.fetchData();
    },
    fetchData() {
      Axios({
        method: "GET",
        url: "/tasks",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.taskList = data.Task;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
