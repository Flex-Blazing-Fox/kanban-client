<template>
  <div class="grid grid-cols-5 grid-rows-layout gap-4 h-screen">
    <Sidebar>
      <LoginSidebarContent v-on="$listeners"></LoginSidebarContent>
    </Sidebar>

    <ForgotPasswordForm v-on="$listeners"></ForgotPasswordForm>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import LoginSidebarContent from './LoginSidebarContent.vue'
import ForgotPasswordForm from './ForgotPasswordForm.vue'

export default {
  components: {
    Sidebar,
    LoginSidebarContent,
    ForgotPasswordForm,
  }
}
</script>