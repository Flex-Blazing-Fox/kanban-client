const app = new Vue({
  el: "#app",
  data: {
    isLogin: false,
    isRegistering: false,
    errorMessage: "",
    isAddingTask: false,
    tasks: [],
    user: {
      email: "",
      password: "",
    },
    task: {
      title: "",
      description: "",
      priority: "",
      category: "",
      due_date: "",
    },
  },
  methods: {
    submitLogin() {
      axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: this.user,
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token;
          this.isLogin = true;
          this.getTasks();
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error[0];
        })
        .finally(() => {
          this.user.email = "";
          this.user.password = "";
        });
    },
    submitRegister() {
      axios({
        method: "POST",
        url: "http://localhost:3000/user/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: this.user,
      })
        .then(({ data }) => {
          this.isRegistering = false;
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error[0];
        })
        .finally(() => {
          this.user.email = "";
          this.user.password = "";
          this.errorMessage = "";
        });
    },
    getTasks() {
      axios({
        method: "GET",
        url: "http://localhost:3000/task",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitTask() {
      axios({
        method: "POST",
        url: "http://localhost:3000/task",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        data: this.task,
      })
        .then(({ data }) => {
          this.errorMessage = "";
          this.isAddingTask = false;
          this.getTasks();
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => {
          this.task = {
            title: "",
            description: "",
            priority: "",
            category: "",
            due_date: "",
          };
        });
    },
    showRegisterForm() {
      this.isRegistering = true;
    },
    showAddForm() {
      this.isAddingTask = true;
    },
    logout() {
      localStorage.removeItem("access_token");
      this.isLogin = false;
    },
    adjustDate(e) {
      this.task.due_date = e.target.value.replace("T", " ") + ":00";
    },
  },
  computed: {
    backlogTasks: function () {
      return this.tasks.filter((task) => task.category === "backlog");
    },
    todoTasks: function () {
      return this.tasks.filter((task) => task.category === "todo");
    },
    inProgressTasks: function () {
      return this.tasks.filter((task) => task.category === "in progress");
    },
    doneTasks: function () {
      return this.tasks.filter((task) => task.category === "done");
    },
  },
});
