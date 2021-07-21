import Vue from 'vue'
import App from './src/App.vue'
import './build.css'

// const BASE_URL = 'http://localhost:3009'
new Vue({
  render: h => h(App)
}).$mount('#app')

// const app = new Vue({
//   el: '#app',
//   data: {
//     // LOGIN STATE
//     isLoggedIn: false,
//     isRegistered: true,
//     isForgotPassword: false,
//     emailLogin: '',
//     passwordLogin: '',
//     emailLoginF: '',
//     passwordLoginF: '',
//     access_token: null,
//     organizations: [],
//     isTokenAvailable: localStorage.access_token ? true : false,

//     // REGISTER FORM STATE
//     registerFirstName: '',
//     registerLastName: '',
//     registerOrganization: '',
//     registerEmail: '',
//     registerPassword: '',

//     // ERROR STATE
//     error: false,
//     errorMessage: '',
    
//     // INFO STATE
//     name: null,
//     avatarLink: '',
//     organization_id: null,
//     organization: null,
//     user_id: null,
//     showProfile: false,

//     // TASKS STATE
//     tasks: [],

//     // CATEGORY STATE
//     categories: [],
//     isAddCategory: false,
//     addCategoryInput: '',

//     // CREATE STATE STATE
//     isCreateTask: false,
//     createTaskTitle: '',
//     createTaskCategory: ''
//   },

//   mounted() {
//     this.getOrganizations()
//   },

//   computed: {
//     capitalize: function() {
//       let fname = this.name.split(' ')[0]
//       let lname = this.name.split(' ')[1]
//       return fname[0].toUpperCase() + fname.substring(1) 
//         + ' ' + lname[0].toUpperCase() + lname.substring(1)
//     }
//   },

//   methods: {
//     getOrganizations: function() {
//       axios
//       .get(BASE_URL + '/organizations')
//       .then(res => this.organizations = res.data)
//       .catch(err => {
//         console.log(err)
//       })
//     },
//     getOrganization: function(id) {
//       axios
//       .get(BASE_URL + '/organizations/' + this.organization_id)
//       .then(res => this.organization = res.data)
//       .catch(err => {
//         console.log(err)
//       })
//     },
//     showError: function(msg) {
//       this.error = true
//       this.errorMessage = msg;
//       setTimeout(() => {
//         this.error = false
//       }, 3000)
//     },
//     signIn: async function() {
//       try {
//         const userRes = await axios({
//           url: BASE_URL + '/users/login',
//           method: 'POST',
//           data: {
//             email: this.emailLogin,
//             password: this.passwordLogin
//           }
//         })

//         let { user, access_token } = userRes.data
//         let randomColor = Math.floor(Math.random()*16777215).toString(16)
//         this.access_token = access_token
//         localStorage.setItem('access_token', access_token)
//         this.name = user.name
//         this.user_id = user.id
//         this.organization_id = user.organization_id
//         this.error = false
//         this.isLoggedIn = true
//         this.emailLogin = ''
//         this.passwordLogin = ''
//         this.avatarLink = `https://ui-avatars.com/api/?background=${randomColor}&color=fff&name=${this.name}`
//         this.organization = this.getOrganization(user.organization_id)
//         this.showProfile = false

//         const categoryRes = await axios.get(BASE_URL + '/categories')
//         this.categories = categoryRes.data
//         // Filter tasks with certain organization id
//         this.categories.forEach(category => {
//           category.Tasks = category.Tasks.filter(task => task.organization_id === user.organization_id)
//         })

//       } catch (err) {
//         this.error = true
//         this.showError(err.response.data.err)
//       }
//     },
//     logout: function() {
//       this.access_token = null
//       this.isLoggedIn = false
//       this.name = ''
//       this.organization_id = null
//       this.avatarLink = ''
//       localStorage.removeItem('access_token')
//     },
//     forgotPassword: function() {
//       this.emailLogin = ''
//       this.passwordLogin = ''
//       this.isForgotPassword = true
//     },
//     login: function() {
//       this.isForgotPassword = false
//       this.isRegistered = true
//     },
//     register: function() {
//       this.isRegistered = false
//       this.isForgotPassword = false
//     },
//     handleRegister: function() {
//       axios({
//         url: BASE_URL + '/users/register',
//         method: 'POST',
//         data: {
//           email: this.registerEmail,
//           password: this.registerPassword,
//           first_name: this.registerFirstName,
//           last_name: this.registerLastName,
//           organization_id: this.registerOrganization,
//         }
//       })
//       .then(res => {
//         this.login()
//         this.clearRegisterForm()
//       })
//       .catch(err => {
//         console.log(err)
//         this.showError(err.response.data.err)
//       })
//     },
//     clearRegisterForm: function() {
//       this.registerEmail = ''
//       this.registerPassword = ''
//       this.registerOrganization = ''
//       this.registerFirstName = ''
//       this.registerLastName = ''
//     },
//     changePassword: function() {
//       if (this.passwordLoginF.trim() === '') {
//         let msg = 'Password must not be empty'
//         this.showError(msg)
//         throw Error(msg)
//       }

//       axios({
//         url: BASE_URL + '/users/login',
//         method: 'PUT',
//         data: {
//           email: this.emailLoginF,
//           password: this.passwordLoginF
//         }
//       })
//       .then(res => {
//         this.isForgotPassword = false
//         this.emailLoginF = ''
//         this.passwordLoginF = ''
//       })
//       .catch(err => {
//         console.log(err)
//         this.showError(err.response.data.err)
//       })
//     },
//     addCategory: function() {
//       this.isAddCategory = true
//       this.$nextTick(() => this.$refs.category.focus())
//     },
//     handleCreateTask: async function() {
//       try {
//         const task = await axios({
//           url: BASE_URL + '/tasks',
//           method: 'POST',
//           headers: { access_token: localStorage.access_token },
//           data: {
//             title: this.createTaskTitle,
//             category_id: this.createTaskCategory,
//             organization_id: this.organization_id,
//             user_id: this.user_id
//           }
//         })

//         this.categories.forEach(category => {
//           if (category.id === task.data.task.category_id) {
//             category.Tasks.push(task.data.task)
//           }
//         })
        
//         this.isCreateTask = false
//         this.createTaskCategory = ''
//         this.createTaskTitle = ''
        
//       } catch (err) {
//         console.log(err)
//         this.showError('Please try again')
//       }
//     }
//   }
// })