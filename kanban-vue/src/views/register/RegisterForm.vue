<template>
  <div
      id="register-page"
      class="row-start-2 col-start-3 col-span-2 px-20"
    >
      <form id="register-form" class="rounded-lg px-7 py-10 bg-teal-400">
        <p class="font-bold mb-8 text-2xl text-gray-600">Register to .blazing</p>

        <label for="register-fname" class="font-bold text-gray-600">First Name</label>
        <div class="relative w-full mb-3 mt-2">
          <input
            id="register-fname"
            type="text"
            class="rounded-md p-2 pr-8 border-2 w-full border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
        </div>

        <label for="register-lname" class="font-bold text-gray-600">Last Name</label>
        <div class="relative w-full mb-3 mt-2">
          <input
            id="register-lname"
            type="text"
            class="rounded-md p-2 pr-8 border-2 w-full border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
        </div>

        <label for="register-oname" class="font-bold text-gray-600">Organization Name</label>
        <div class="relative w-full mb-3 mt-2">
          <input
            id="register-oname"
            type="text"
            class="rounded-md p-2 pr-8 border-2 w-full border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
        </div>

        <label for="register-email" class="font-bold text-gray-600">E-Mail</label>
        <div class="relative w-full mb-3 mt-2">
          <input
            id="register-email"
            type="email"
            class="rounded-md p-2 pr-8 border-2 w-full border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 absolute bottom-3 right-3 text-teal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>

        <label for="register-password" class="font-bold text-gray-600"
          >Password</label
        >
        <div class="relative w-full mt-2">
          <input
            id="register-password"
            type="password"
            class="rounded-md p-2 pr-8 border-2 w-full border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 absolute bottom-3 right-3 text-teal-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <button
          id="register-btn"
          class="uppercase bg-white text-teal-900 w-full rounded-md py-3 mt-8 hover:bg-gray-200 active:bg-gray-400"
        >
          Register
        </button>
      </form>
    </div>
</template>

<script>
export default {
  name: 'RegisterForm'
}
</script>

<style>

</style>