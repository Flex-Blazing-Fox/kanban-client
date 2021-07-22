<template>
  <div id="backlog-task" class="flex-col bg-gray-100">
    <div class="flex justify-between items-center">
      <div class="pt-4 pl-4">Backlog</div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mt-3 mr-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
    <div class="flex-col m-4 overflow-y-hidden">
      <div v-for="task in tasks" :key="task.id" class="flex-col bg-white mt-3">
        <Card
          :task="task"
          @showEditForm="showEditForm"
          @deleteTask="deleteTask"
        ></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "Category",
  props: ["tasks"],
  components: { Card },
  methods: {
    showEditForm(id) {
      this.$emit("showEditForm", id);
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
  },
};
</script>

<style>
</style>