<template>
  <div class="grid grid-cols-5 grid-rows-layout gap-4 h-screen">
    <Sidebar>
      <LoginSideBarContent v-on="$listeners"></LoginSideBarContent>
    </Sidebar>

    <LoginForm v-on="$listeners"></LoginForm>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import LoginSideBarContent from './LoginSidebarContent.vue'
import LoginForm from './LoginForm.vue'

export default {
  components: { 
    Sidebar, 
    LoginSideBarContent,
    LoginForm
  }
}
</script>