const BASE_URL = 'http://localhost:3009'

const app = new Vue({
  el: '#app',
  data: {
    isLoggedIn: false,
    isRegistered: true,
    isForgotPassword: false,
    emailLogin: '',
    passwordLogin: '',
    emailLoginF: '',
    passwordLoginF: '',
    error: false,
    errorMessage: '',
    access_token: null,
    organization_id: null,
    name: null,
    categories: [],
    avatarLink: '',
    isAddCategory: false,
    addCategoryInput: ''
  },
  computed: {
    capitalize: function() {
      let fname = this.name.split(' ')[0]
      let lname = this.name.split(' ')[1]
      return fname[0].toUpperCase() + fname.substring(1) 
        + ' ' + lname[0].toUpperCase() + lname.substring(1)
    }
  },
  methods: {
    showError: function(msg) {
      this.error = true
      this.errorMessage = msg;
      setTimeout(() => {
        this.error = false
      }, 3000)
    },
    signIn: async function() {
      try {
        const userRes = await axios({
          url: BASE_URL + '/users/login',
          method: 'POST',
          data: {
            email: this.emailLogin,
            password: this.passwordLogin
          }
        })

        let { user, access_token } = userRes.data
        let randomColor = Math.floor(Math.random()*16777215).toString(16)
        this.access_token = access_token
        this.name = user.name
        this.organization_id = user.organization_id
        this.error = false
        this.isLoggedIn = true
        this.emailLogin = ''
        this.passwordLogin = ''
        this.avatarLink = `https://ui-avatars.com/api/?background=${randomColor}&color=fff&name=${this.name}`

        const categoryRes = await axios.get(BASE_URL + '/categories')
        this.categories = categoryRes.data

      } catch (err) {
        this.error = true
        this.showError(err.response.data.err)
      }
    },
    logout: function() {
      this.access_token = null
      this.isLoggedIn = false
      this.name = ''
      this.organization_id = null
      this.avatarLink = ''
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
    },
    changePassword: function() {
      if (this.passwordLoginF.trim() === '') {
        let msg = 'Password must not be empty'
        this.showError(msg)
        throw Error(msg)
      }

      axios({
        url: BASE_URL + '/users/login',
        method: 'PUT',
        data: {
          email: this.emailLoginF,
          password: this.passwordLoginF
        }
      })
      .then(res => {
        this.isForgotPassword = false
        this.emailLoginF = ''
        this.passwordLoginF = ''
      })
      .catch(err => {
        console.log(err)
        this.showError(err.response.data.err)
      })
    },
    addCategory: function() {
      this.isAddCategory = true
      this.$nextTick(() => this.$refs.category.focus())
    }
  }
})