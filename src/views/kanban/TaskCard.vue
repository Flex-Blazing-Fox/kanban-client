<template>
  <div class="bg-white mx-4 text-sm rounded-xl p-3 mb-3 cursor-pointer">
    <div class="flex flex-row flex-wrap justify-between items-center mb-5">
      <span class="inline-block">{{ task.title }}</span>
      <div class="relative">
        <svg @click="edit" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        <EditTask v-if="isEditable" :taskId="task.id" v-on="$listeners"></EditTask>
      </div>
    </div>
    <div class="flex flex-row items-center gap-2">
      <img :src="'https://ui-avatars.com/api/?background=40E0D0&color=fff&name=' + name" alt="avatar" class="rounded-full w-7 inline-block" />
      <div class="py-1 px-2 rounded-md hover:inline-block hover:bg-gray-600 text-white">{{ name }}</div>
    </div>
  </div>
</template>

<script>
import EditTask from './EditTask.vue'

export default {
  props: ['task'],
  data: function() {
    return {
      isEditable: false,
      name: `${this.task.User.first_name} ${this.task.User.last_name}`
    }
  },
  components: {
    EditTask
  },
  methods: {
    edit: function () {
      this.isEditable = !this.isEditable
    }
  }
}
</script>

<style>

</style>