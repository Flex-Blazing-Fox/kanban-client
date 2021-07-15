const BASE_URL = 'http://localhost:3009'

const app = new Vue({
  el: '#app',
  data: {
    isLoggedIn: false,
    isRegistered: true,
    isForgotPassword: false,
    emailLogin: '',
    passwordLogin: '',
    error: false,
    access_token: null,
    organization_id: null,
    name: null
  },
  methods: {
    showError: function() {
      setTimeout(() => {
        this.error = false
      }, 2000)
    },

    signIn: function() {
      axios({
        url: BASE_URL + '/users/login',
        method: 'POST',
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
      .then(res => {
        let { user, access_token } = res.data
        this.access_token = access_token
        this.name = user.name
        this.organization_id = user.organization_id
        this.error = false
        this.isLoggedIn = true
        this.emailLogin = ''
        this.passwordLogin = ''
      })
      .catch(err => {
        this.error = true
        this.showError()
      })
    },

    logout: function() {
      this.access_token = null
      this.isLoggedIn = false
      this.name = ''
      this.organization_id = null

    }
  }
})