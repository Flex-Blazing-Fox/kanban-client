<template>
  <div id="login-page" class="row-start-2 col-start-3 col-span-2 px-20">
    <form @submit.prevent="changePassword" id="login-form" class="rounded-lg bg-white px-7 py-10 text-teal-900">
      <div class="flex flex-row gap-2 mb-8 items-center">
        <div @click="$emit('login')" class="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
          </svg>
        </div>

        <p class="font-bold text-2xl text-teal-900">
          Change Password
        </p>
      </div>

      <label for="login-email" class="font-bold text-teal-900">E-Mail</label>
      <div class="relative w-full mb-3 mt-2">
        <input v-model="email" id="login-email" type="email" class="rounded-md w-full p-2 pr-8 border-2 border-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:border-transparent" />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-900 absolute bottom-3 right-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
        </svg>
      </div>

      <label for="login-password" class="font-bold text-teal-900">Password</label>
      <div class="relative w-full mt-2">
        <input v-model="password" id="login-password" type="password" class="rounded-md w-full p-2 pr-8 border-2 border-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:border-transparent" />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-teal-900/80 absolute bottom-3 right-3" viewBox="0 0 20 20" fill="currentColor" >
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
      </div>

      <div>
        <button id="login-btn" class="uppercase tracking-wider bg-teal-900 text-white w-full rounded-md py-3 mt-8 hover:bg-teal-700 active:bg-teal-800" >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    forgotPasswordData: function() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    changePassword: function () {
      if (this.password.trim() === '') {
        let msg = 'Password must not be empty'
        this.$emit('error', msg)
        return new Error(msg)
      }
      this.$emit('changePassword', this.forgotPasswordData)
    },
  }
}
</script>