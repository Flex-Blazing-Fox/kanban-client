<template>
  <transition appear name="slide-fade">
    <div class="absolute top-10 right-2 text-center text-white bg-red-600 px-5 py-2 rounded-md">{{ errorMessage }}</div>
  </transition>
</template>

<script>
export default {
  name: 'ErrorBox',
  props: ['errorMessage']
}
</script>