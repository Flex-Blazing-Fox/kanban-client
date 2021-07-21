<template>
  <div class="row-span-1 col-span-4 flex flex-row justify-between items-center pr-14 pl-6">
    <div class="text-2xl">Tasks</div>
    <div @click="$emit('clickCreateTask')" class="flex flex-row gap-2 items-center border-2 border-teal-400 rounded-md px-3 py-1 hover:bg-teal-400 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>  
      <span>Create Task</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>