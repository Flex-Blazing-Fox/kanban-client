<template>
  <div @click="$emit('register')" class="flex flex-row items-center text-gray-400 gap-4 hover:text-gray-800 cursor-pointer">
    <div class="w-7">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
    <span>Register</span>
  </div>
</template>

<script>
export default {
  
}
</script>