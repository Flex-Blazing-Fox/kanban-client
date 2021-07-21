const option = {
    text: '',
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor: '', //'linear-gradient(to right, #00b09b, #96c93d)',
}

const app = new Vue({
    el: '#app',
    data:{
        baseURL: 'http://localhost:3000', 
        form: {
            login: localStorage.access_token ? true : false,
            register: false,
            edit: {
                id: '',
                title: '',
                category: ''
            }
        },
        user: {
            email: '',
            password: '',
            rePassword:''
        },
        categories: ['Backlog', 'Todo', 'OnProgres', 'Done'],
        tasks: []
        
    },
    methods: {
        //hide&show form
        registerForm(){
            this.form.register = true
        },
        loginForm(){
            this.form.register = false
        },
        logout(){
            localStorage.removeItem('access_token')
            this.form.login = false
        },
        editTask(task){
            this.form.edit.id = task.id
            this.form.edit.title = task.title
            this.form.edit.category = task.category
        },
        //axios
        login(){
            axios({
                method: 'POST',
                url: `${this.baseURL}/user/login`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(result=>{
                localStorage.setItem('access_token', result.data.access_token)
                this.getTasks()
                this.form.login = true
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
            .finally(()=>{
                this.user.email = ''
                this.user.password = ''
            })
        },
        register(){
            axios({
                method: 'POST',
                url: `${this.baseURL}/user/register`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                },
            })
            .then(()=>{
                this.form.register = false
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
            .finally(()=>{
                this.user.email = ''
                this.user.password = ''
                this.user.rePassword = ''
            })
        },
        getTasks(){     
            axios({
                method: 'GET',
                url: `${this.baseURL}/tasks`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                this.tasks = result.data
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
        },
        submitEdit(id){
            axios({
                method: 'PATCH',
                url: `${this.baseURL}/tasks/title/${id}`,
                data: {
                    title : this.form.edit.title
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                option.text = `Success update ${result.data.title}`
                option.backgroundColor = 'green'
                Toastify(option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                option.text = err.response.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
            })
            .finally(()=>{
                this.form.edit = ''
            })
        },
        deleteTask(id){
            axios({
                method: 'DELETE',
                url: `${this.baseURL}/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(result=>{
                option.text = result.data.message
                option.backgroundColor = 'red'
                Toastify(option).showToast()
                this.getTasks()
            })
            .catch(err=>{
                console.log(err.response);
            })
        },
    },
    created(){
        if(this.form.login){
            this.getTasks()
        }
    }
})