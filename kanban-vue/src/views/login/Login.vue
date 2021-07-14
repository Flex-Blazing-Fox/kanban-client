<template>
  <div class="grid grid-cols-5 grid-rows-layout gap-4 h-screen font-poppins">
    <Sidebar>
      <h1 class="text-lg font-bold tracking-wide text-gray-700"><span class="text-2xl">.</span>blazing</h1>

      <router-link :to="{ name: 'Register' }" class="flex flex-row items-center text-gray-400 hover:text-gray-800 gap-4 cursor-pointer py-1">
        <div class="w-7">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <span>Register</span>
      </router-link>

    </Sidebar>
    <LoginForm />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import LoginForm from '@/views/login/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    Sidebar,
    LoginForm
  }
}
</script>
