<template>
  <div class="relative font-poppins">

    <ErrorBox v-if="error" :errorMessage="errorMessage"></ErrorBox>
    <CreateTaskForm 
      @handleCreateTask="handleCreateTask" 
      @closeCreateTask="closeCreateTask"
      :categories="categories"
      v-if="isCreateTask"
    ></CreateTaskForm>

    <LoginPage 
      @forgotPassword="forgotPassword" 
      @register="register"
      @signIn="signIn"
      v-if="!isForgotPassword && isRegistered && !isLoggedIn"
    ></LoginPage>

    <ForgotPasswordPage 
      @error="showError"
      @register="register"
      @changePassword="changePassword"
      v-if="isForgotPassword && !isLoggedIn && isRegistered"
    ></ForgotPasswordPage>

    <RegisterPage
      @error="showError"
      :organizations="organizations"
      @login="login"
      @handleRegister="handleRegister"
      v-if="!isRegistered && !isForgotPassword && !isLoggedIn"
    ></RegisterPage>

    <!-- MAIN PAGE -->
    <div @click="isAddCategory = false" class="grid grid-cols-5 grid-rows-layout gap-4 h-screen">
      <Sidebar v-if="isLoggedIn">
        <KanbanSidebarContent @logout="logout" v-on="$listeners" v-if="isLoggedIn"></KanbanSidebarContent>
      </Sidebar>
      <Profile 
        @logout="logout"
        :organization="organization"
        :name="capitalize"
        :avatarLink="avatarLink"
        v-if="isLoggedIn && organization"
      ></Profile>
      <Taskbar @clickCreateTask="isCreateTask = true" v-if="isLoggedIn"></Taskbar>
      <CategoryContainer 
        :categories="categories"
        :avatarLink="avatarLink"
        :addCategory="addCategory"
        @handleDeleteTask="handleDeleteTask"
        v-if="isLoggedIn"
      >
        <div @click.stop="addCategory" tabindex="0" class="bg-teal-700/5 w-[280px] rounded-2xl overflow-auto flex-shrink-0 flex-grow-0 h-[58px] cursor-pointer">
          <div v-if="!isAddCategory" class="flex flex-row justify-center p-4 text-teal-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <form @submit.prevent="handleAddCategory" v-if="isAddCategory" class="overflow-hidden pt-2 px-2">
            <input ref="category" v-model="addCategoryInput" type="text" class="bg-teal-700/5 border border-transparent focus:ring-0 focus:border-transparent focus:outline-none w-full h-full rounded-lg" />
          </form>
        </div>
      </CategoryContainer>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

import LoginPage from './views/login/LoginPage.vue'
import RegisterPage from './views/login/RegisterPage.vue'
import ForgotPasswordPage from './views/login/ForgotPasswordPage.vue'

import CategoryContainer from './views/kanban/CategoryContainer.vue'
import CreateTaskForm from './views/kanban/CreateTaskForm.vue'
import EditTask from './views/kanban/EditTask.vue'
import KanbanContainer from './views/kanban/KanbanContainer.vue'
import KanbanSidebarContent from './views/kanban/KanbanSidebarContent.vue'
import Profile from './views/kanban/Profile.vue'
import TaskCard from './views/kanban/TaskCard.vue'

import ErrorBox from './components/ErrorBox.vue'
import Sidebar from './components/Sidebar.vue'
import Taskbar from './components/Taskbar.vue'

const BASE_URL = 'http://localhost:3009'

export default {
  name: 'App',
  components: {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    CategoryContainer,
    CreateTaskForm,
    EditTask,
    KanbanContainer,
    KanbanSidebarContent,
    Profile,
    TaskCard,
    ErrorBox,
    Sidebar,
    Taskbar,
  },
  data: function() {
    return {
      // LOGIN STATE
      isLoggedIn: false,
      isRegistered: true,
      isForgotPassword: false,
      emailLogin: '',
      passwordLogin: '',
      emailLoginF: '',
      passwordLoginF: '',
      access_token: null,
      organizations: [],
      isTokenAvailable: localStorage.access_token ? true : false,

      // REGISTER FORM STATE
      registerFirstName: '',
      registerLastName: '',
      registerOrganization: '',
      registerEmail: '',
      registerPassword: '',

      // ERROR STATE
      error: false,
      errorMessage: '',

      // INFO STATE
      name: null,
      avatarLink: '',
      organization_id: null,
      organization: null,
      user_id: null,
      showProfile: false,

      // TASKS STATE
      tasks: [],

      // CATEGORY STATE
      categories: [],
      isAddCategory: false,
      addCategoryInput: '',

      // CREATE STATE STATE
      isCreateTask: false,
      createTaskTitle: '',
      createTaskCategory: '',
    }
  },

  created() {
    this.getOrganizations()
  },

  computed: {
    capitalize: function() {
      let fname = this.name.split(' ')[0]
      let lname = this.name.split(' ')[1]
      return (
        fname[0].toUpperCase() +
        fname.substring(1) +
        ' ' +
        lname[0].toUpperCase() +
        lname.substring(1)
      )
    },
  },

  methods: {
    getOrganizations: function() {
      axios
        .get(BASE_URL + '/organizations')
        .then((res) => (this.organizations = res.data))
        .catch((err) => {
          console.log(err)
        })
    },
    getOrganization: function(id) {
      axios
        .get(BASE_URL + '/organizations/' + this.organization_id)
        .then((res) => (this.organization = res.data))
        .catch((err) => {
          console.log(err)
        })
    },
    showError: function(msg) {
      this.error = true
      this.errorMessage = msg
      setTimeout(() => {
        this.error = false
      }, 3000)
    },
    signIn: function(payload) {
      axios({
        url: BASE_URL + '/users/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
      .then(res => {
        let { user, access_token } = res.data
        this.access_token = access_token
        localStorage.setItem('access_token', access_token)
        this.name = user.name
        this.user_id = user.id
        this.organization_id = user.organization_id
        this.error = false
        this.isLoggedIn = true
        this.emailLogin = ''
        this.passwordLogin = ''
        this.avatarLink = `https://ui-avatars.com/api/?background=40E0D0&color=fff&name=${this.name}`
        this.organization = this.getOrganization(user.organization_id)
        this.showProfile = false
      })
      .then(userRes => {
        return axios.get(BASE_URL + '/categories')
      })
      .then(categoryRes => {
        this.categories = categoryRes.data
        // Filter tasks with certain organization id
        this.categories.forEach((category) => {
          category.Tasks = category.Tasks.filter(
            (task) => task.organization_id === this.organization_id
          )
        })
      })
      .catch(err => {
        this.showError(err.response.data.err)
      })
    },
    logout: function() {
      this.access_token = null
      this.isLoggedIn = false
      this.name = ''
      this.organization_id = null
      this.avatarLink = ''
      localStorage.removeItem('access_token')
    },
    forgotPassword: function() {
      this.emailLogin = ''
      this.passwordLogin = ''
      this.isForgotPassword = true
    },
    login: function() {
      this.isForgotPassword = false
      this.isRegistered = true
    },
    register: function() {
      this.isRegistered = false
      this.isForgotPassword = false
    },
    clearRegisterForm: function() {
      this.registerEmail = ''
      this.registerPassword = ''
      this.registerOrganization = ''
      this.registerFirstName = ''
      this.registerLastName = ''
    },
    handleRegister: function(payload) {
      axios({
        url: BASE_URL + '/users/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password,
          first_name: payload.firstName,
          last_name: payload.lastName,
          organization_id: payload.organizationId
        },
      })
      .then((res) => {
        this.login()
        this.registerEmail = ''
        this.registerPassword = ''
        this.registerOrganization = ''
        this.registerFirstName = ''
        this.registerLastName = ''
      })
      .catch((err) => {
        console.log(err)
        this.showError(err.response.data.err)
      })
    },
    changePassword: function(payload) {
      axios({
        url: BASE_URL + '/users/login',
        method: 'PUT',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((res) => {
          this.isForgotPassword = false
          this.emailLoginF = ''
          this.passwordLoginF = ''
        })
        .catch((err) => {
          console.log(err.response)
          this.showError(err.response.data.err)
        })
    },
    addCategory: function() {
      this.isAddCategory = true
      this.$nextTick(() => this.$refs.category.focus())
    },
    handleAddCategory: function() {

    },
    closeCreateTask: function() {
      this.isCreateTask = false
    },
    handleCreateTask: function(payload) {
      axios({
        url: BASE_URL + '/tasks',
        method: 'POST',
        headers: { access_token: localStorage.access_token },
        data: {
          title: payload.createTaskTitle,
          category_id: payload.createTaskCategory,
          organization_id: this.organization_id,
          user_id: this.user_id,
        },
      })
      .then(taskRes => {
        this.categories.forEach((category) => {
          if (category.id === taskRes.data.task.category_id) {
            category.Tasks.push(taskRes.data.task)
          }
        })

        this.isCreateTask = false
        this.createTaskCategory = ''
        this.createTaskTitle = ''
      })
      .catch(err => {
        this.showError('Please try again')
      })
    },
    handleDeleteTask: function(task_id) {
      axios({
        url: BASE_URL + '/tasks/' + task_id,
        method: 'DELETE',
        headers: { access_token: localStorage.access_token },
      })
      .then(res => {
        this.categories.forEach((category) => {
          category.Tasks = category.Tasks.filter(task => task.id !== task_id)
        })
      })
      .catch(err => {
        this.showError(err.response.data.err)
      })
    }
  },
}
</script>
