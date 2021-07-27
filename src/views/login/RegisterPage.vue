<template>
  <div class="grid grid-cols-5 grid-rows-layout gap-4 h-screen">
    <Sidebar>
      <RegisterSidebarContent v-on="$listeners"></RegisterSidebarContent>
    </Sidebar>

    <RegisterForm v-on="$listeners" :organizations="organizations"></RegisterForm>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import RegisterForm from './RegisterForm.vue'
import RegisterSidebarContent from './RegisterSidebarContent.vue'

export default {
  props: ['organizations'],
  components: {
    Sidebar,
    RegisterSidebarContent,
    RegisterForm
  }
}
</script>