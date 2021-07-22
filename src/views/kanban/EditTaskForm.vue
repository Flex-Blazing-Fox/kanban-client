<template>
  <div class="p-4 absolute inset-0 transform bg-gray-500 text-black bg-opacity-60 z-40">
    <form @submit.prevent="handleEdit" class="relative w-80 mx-auto mt-44 bg-gray-300 p-4 py-6 rounded-md">
      <div @click="$emit('closeEditTask')" class="text-gray-700 absolute top-3 right-3 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <label for="editTaskTitle" class="text-lg font-bold text-gray-700">Title</label>
      <input v-model="editTaskTitle" id="editTaskTitle" type="text" class="w-full rounded-md my-2 border-2 border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent" />

      <label for="editTaskCategory" class="text-lg font-bold text-gray-700">Category</label>
      <select v-model="editTaskCategory" id="editTaskCategory" class="w-full rounded-md mt-2 border-2 border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent">
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>

      <button class="w-full text-center mt-4 py-2 bg-teal-400 text-gray-700 font-bold rounded-md">Edit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['categories', 'task'],
  data: function() {
    return {
      editTaskTitle: this.task[0].title,
      editTaskCategory: this.task[0].category_id,
    }
  },
  computed: {
    editTaskData: function() {
      return {
        editTaskTitle: this.editTaskTitle,
        editTaskCategory: this.editTaskCategory
      }
    }
  },
  methods: {
    handleEdit: function () {
      this.$emit('handleEdit', this.editTaskData)
    }
  }
}
</script>