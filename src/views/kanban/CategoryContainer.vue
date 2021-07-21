<template>
  <div class="row-span-1 col-span-4 flex flex-row justify-start pr-14 pl-3 gap-3 overflow-x-auto h-[510px]">

    <div v-for="category in categories" :key="category.id" class="bg-teal-700/5 w-[280px] rounded-2xl overflow-auto flex-shrink-0 flex-grow-0">
      <div class="flex flex-row justify-between p-4">
        <div>{{ category.name }}</div>
        <div class="bg-teal-700/5 rounded-lg px-2 text-teal-600/60">{{ category.Tasks.length }}</div>
      </div>

      <!-- Task Card -->
      <draggable :list="category.Tasks" :animation="200" @add="onAdd($event, category.id)" group="tasks" ghost-class="ghost-card">
        <TaskCard 
          v-for="task in category.Tasks"
          :key="task.id"
          :task="task"
          :data-id="task.id"
          v-on="$listeners"
        ></TaskCard>
      </draggable>
    </div>
    
    <slot></slot>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'

import TaskCard from './TaskCard.vue'

const BASE_URL = 'http://localhost:3009'

export default {
  props: ['categories', 'avatarLink'],
  components: { TaskCard, draggable },
  methods: {
    onAdd: function (event, category_id) {
      axios({
        url: BASE_URL + '/tasks/' + event.item.getAttribute('data-id'),
        method: 'PATCH',
        headers: { access_token: localStorage.access_token },
        data: {
          category_id
        }
      })
      .then(res => {
        console.log('task moved')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>