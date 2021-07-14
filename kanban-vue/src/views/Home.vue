<template>
  <div class="grid grid-cols-5 grid-rows-layout gap-4 h-screen font-poppins">
    <Sidebar>
      <h1 class="text-lg font-bold tracking-wide text-gray-700"><span class="text-2xl">.</span>blazing</h1>

      <div class="flex flex-row items-center text-gray-800 gap-4 cursor-pointer py-1">
        <div class="w-7">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <span>Tasks</span>
      </div>
      
      <div class="flex flex-row items-center text-gray-400 gap-4 hover:text-gray-800 cursor-pointer">
        <div class="w-7">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        <router-link to="/users/login">
          <span>Log out</span>
        </router-link>
      </div>
    </Sidebar>

     <div class="row-span-1 col-span-4 flex flex-row justify-end items-end pr-14 pb-2 gap-7 cursor-pointer">
      <div class="pb-2 flex flex-row items-center gap-2">
        <span>Ari Juanda</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Ari" alt="avatar" class="rounded-full w-10" />
    </div>

    <div class="row-span-1 col-span-4 flex flex-row justify-between items-center pr-14 pl-6">
      <div class="text-2xl">Tasks</div>
      <div class="flex flex-row gap-2 items-center border-2 border-teal-400 rounded-md px-3 py-1 hover:bg-teal-400 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>  
        <span>Create Task</span>
      </div>
    </div>

    <!-- TASKS CONTAINER -->

    <div class="row-span-1 col-span-4 flex flex-row justify-between pr-14 pl-3">
      <div class="bg-teal-700 bg-opacity-5 w-280 rounded-2xl overflow-auto">
        <div class="flex flex-row justify-between p-4">
          <div class="text-gray-600">Backlog</div>
          <div class="bg-teal-700 bg-opacity-5 rounded-lg px-2 text-teal-600 text-opacity-60">2</div>
        </div>

        <!-- Task Card -->
        <div class="bg-white mx-4 text-sm rounded-xl p-3 mb-3 cursor-pointer">
          <div class="flex flex-row flex-wrap justify-between items-center mb-5">
            <span class="inline-block">Add login feature</span>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
          <div class="">
            <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Ari" alt="avatar" class="rounded-full w-7 inline-block" />
            <img src="https://ui-avatars.com/api/?background=B5EAEA&color=fff&name=Deane" alt="avatar" class="rounded-full w-7 inline-block" />
          </div>
        </div>

        <div class="bg-white mx-4 text-sm rounded-xl p-3 mb-3 cursor-pointer">
          <div class="flex flex-row flex-wrap justify-between items-center mb-5">
            <span class="inline-block">Add register feature</span>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
          <div class="">
            <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Ari" alt="avatar" class="rounded-full w-7 inline-block" />
            <img src="https://ui-avatars.com/api/?background=B5EAEA&color=fff&name=Deane" alt="avatar" class="rounded-full w-7 inline-block" />
          </div>
        </div>
      </div>

      <div class="bg-teal-700 bg-opacity-5 w-280 rounded-2xl">
        <div class="flex flex-row justify-between p-4">
          <div>To do</div>
          <div class="bg-teal-700 bg-opacity-5 rounded-lg px-2 text-teal-600 text-opacity-60">1</div>
        </div>

        <div class="bg-white mx-4 text-sm rounded-xl p-3 mb-3 cursor-pointer">
          <div class="flex flex-row flex-wrap justify-between items-center mb-5">
            <span class="inline-block">Add authentication</span>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
          <div class="">
            <img src="https://ui-avatars.com/api/?background=B5EAEA&color=fff&name=Deane" alt="avatar" class="rounded-full w-7 inline-block" />
          </div>
        </div>
      </div>

      <div class="bg-teal-700 bg-opacity-5 w-280 rounded-2xl">
        <div class="flex flex-row justify-between p-4">
          <div>In progress</div>
          <div class="bg-teal-700 bg-opacity-5 rounded-lg px-2 text-teal-600 text-opacity-60">0</div>
        </div>
      </div>

      <div class="bg-teal-700 bg-opacity-5 w-280 rounded-2xl">
        <div class="flex flex-row justify-between p-4">
          <div>Done</div>
          <div class="bg-teal-700 bg-opacity-5 rounded-lg px-2 text-teal-600 text-opacity-60">0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar
  }
}
</script>
