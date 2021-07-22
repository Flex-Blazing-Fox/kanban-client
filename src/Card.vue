<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <div class="font-semibold p-2">{{ task.title }}</div>
        <div class="flex mr-4">
          <a @click="showEditForm(task.id)">
            <svg
              class="w-5 h-5 mr-2 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M-3-3h24v24H-3z" />
                <path d="M2 15.08V16h.92l9.06-9.06-.92-.92z" />
                <path
                  d="M17.71 4.04a.996.996 0 000-1.41L15.37.29c-.2-.2-.45-.29-.71-.29-.26 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM0 14.25V18h3.75L14.81 6.94l-3.75-3.75L0 14.25zM2.92 16H2v-.92l9.06-9.06.92.92L2.92 16z"
                  fill="#2596be"
                />
              </g>
            </svg>
          </a>
          <a @click="deleteTask(task.id)">
            <svg
              class="w-4 h-5 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="M-5-3h24v24H-5z" />
                <path
                  d="M1 16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4H1v12zM3 6h8v10H3V6zm7.5-5l-1-1h-5l-1 1H0v2h14V1h-3.5z"
                  fill="#c92e20"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
      <div class="p-2 pb-1 text-sm">{{ task.description }}</div>
      <div class="p-2 pb-1 text-sm capitalize">
        Priority: {{ task.priority }}
      </div>
      <div class="p-2 pb-1 text-sm">
        Due Date: {{ adjustDateForMainPage(task.due_date) }}
      </div>
    </div>
    <div :class="getPriorityColor(task.priority)">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["task"],
  methods: {
    showEditForm(id) {
      this.$emit("showEditForm", id);
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    adjustDateForMainPage(date) {
      let dateEdited = String(date).split("T")[0];
      let timeEdited = String(date).split("T")[1].slice(0, 5);
      return dateEdited + " " + timeEdited;
    },
    getPriorityColor(priority) {
      switch (priority) {
        case "high":
          return "bg-red-400 h-2";
          break;
        case "medium":
          return "bg-yellow-400 h-2";
          break;
        case "low":
          return "bg-green-400 h-2";
          break;
      }
    },
  },
};
</script>

<style>
</style>