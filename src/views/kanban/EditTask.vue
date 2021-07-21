<template>
  <div class="absolute top-5 right-0">
    <div class="flex flex-row max-w-min bg-gray-100 gap-4 p-3 rounded-md">
      <svg @click="handleEditTask" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>

      <svg @click="handleDeleteTask" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ['taskId'],
  methods: {
    handleEditTask: function() {
      this.$emit('handleEditTask', this.taskId)
    },
    handleDeleteTask: function() {
      this.$emit('handleDeleteTask', this.taskId)
    }
  }
}
</script>