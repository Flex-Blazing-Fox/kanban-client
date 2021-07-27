<template>
  <div class="row-span-1 col-span-4 flex flex-row justify-between items-center pr-14 pb-2 gap-7 cursor-pointer pt-8">
    <div class="ml-4 mt-4">
      <img :src="organization.logo" class="h-10" />
    </div>

    <div class="relative">
      <div @click="showProfile = !showProfile" class="flex flex-row items-center gap-4">
        <div class="flex flex-row items-center gap-2">
          <span>{{ name }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <img :src="avatarLink" alt="avatar" class="rounded-full w-10" />
      </div>

      <!-- Showed if Click Profile Name -->
      <div v-if="showProfile" class="rounded-lg absolute top-12 -left-2 p-2 w-full bg-gray-100 border text-black">
        <div @click="$emit('logout')" class="flex flex-row items-center gap-4 text-gray-700 hover:text-gray-800 cursor-pointer">
          <div class="w-7">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span>Log out</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'organization', 'avatarLink'],
  data: function() {
    return {
      showProfile: false
    }
  },
}
</script>