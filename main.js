// let socket = new WebSocket("ws://kanban-server-staging.herokuapp.com");
import Vue from "vue";
import App from "./src/App.vue";

new Vue({
  render: (h) => h(App),
}).$mount("#app");

// const app = new Vue({
//   el: "#app",
//   data: {
//     isLogin: localStorage.access_token ? true : false,
//     isRegistering: false,
//     isAddingTask: false,
//     isEditingTask: false,
//     errorMessage: "",
//     tasks: [],
//     user: {
//       email: "",
//       password: "",
//     },
//     task: {
//       id: 0,
//       title: "",
//       description: "",
//       priority: "",
//       category: "",
//       due_date: "",
//     },
//   },
//   methods: {
//     sendMessageUpdate() {
//       socket.send("update");
//     },
//     submitLogin() {
//       axios({
//         method: "POST",
//         url: "https://kanban-server-staging.herokuapp.com/user/login",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: this.user,
//       })
//         .then(({ data }) => {
//           localStorage.access_token = data.access_token;
//           this.isLogin = true;
//           this.getTasks();
//         })
//         .catch((err) => {
//           this.errorMessage = err.response.data.error[0];
//         })
//         .finally(() => {
//           this.user.email = "";
//           this.user.password = "";
//         });
//     },
//     submitRegister() {
//       axios({
//         method: "POST",
//         url: "https://kanban-server-staging.herokuapp.com/user/register",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: this.user,
//       })
//         .then(({ data }) => {
//           this.isRegistering = false;
//         })
//         .catch((err) => {
//           if (
//             err.response.status === 400 &&
//             err.response.data.error[0] === "Email is not unique"
//           ) {
//             this.errorMessage =
//               "The email you registering has already been used";
//           } else if (err.response.status === 400) {
//             this.errorMessage = "Invalid Email or Password";
//           }
//         })
//         .finally(() => {
//           this.user.email = "";
//           this.user.password = "";
//           if (!this.isRegistering) {
//             this.errorMessage = "";
//           }
//         });
//     },
//     getTasks() {
//       if (this.isLogin) {
//         axios({
//           method: "GET",
//           url: "https://kanban-server-staging.herokuapp.com/task",
//           headers: {
//             "Content-Type": "application/json",
//             access_token: localStorage.access_token,
//           },
//         })
//           .then(({ data }) => {
//             this.tasks = data;
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     },
//     spawnNewSocket() {
//       socket = new WebSocket("ws://kanban-server-staging.herokuapp.com");
//     },
//     checkSocket() {
//       socket.addEventListener("open", function (event) {
//         console.log("connected to server");
//       });
//       socket.addEventListener("message", function (event) {
//         if (event.data === "update") {
//           app.getTasks();
//         }
//       });
//       socket.addEventListener("close", function (event) {
//         socket = null;
//         app.spawnNewSocket();
//       });
//     },
//     sendReqRegularly() {
//       if (this.isLogin) {
//         this.getTasks();
//         setTimeout(this.sendReqRegularly, 40000);
//       }
//     },
//     submitTask() {
//       axios({
//         method: "POST",
//         url: "https://kanban-server-staging.herokuapp.com/task",
//         headers: {
//           "Content-Type": "application/json",
//           access_token: localStorage.access_token,
//         },
//         data: this.task,
//       })
//         .then(({ data }) => {
//           this.errorMessage = "";
//           this.isAddingTask = false;
//           this.sendMessageUpdate();
//           this.getTasks();
//         })
//         .catch((err) => {
//           this.errorMessage = err.response.data.error[0];
//         })
//         .finally(() => {
//           this.task = {
//             title: "",
//             description: "",
//             priority: "",
//             category: "",
//             due_date: "",
//           };
//         });
//     },
//     submitEditTask(id) {
//       axios({
//         method: "PUT",
//         url: `https://kanban-server-staging.herokuapp.com/task/${id}`,
//         headers: {
//           "Content-Type": "application/json",
//           access_token: localStorage.access_token,
//         },
//         data: this.task,
//       })
//         .then(({ data }) => {
//           this.errorMessage = "";
//           this.isEditingTask = false;
//           this.sendMessageUpdate();
//           this.getTasks();
//         })
//         .catch((err) => {
//           this.errorMessage = err.response.data.error[0];
//         });
//     },
//     deleteTask(id) {
//       axios({
//         method: "DELETE",
//         url: `https://kanban-server-staging.herokuapp.com/task/${id}`,
//         headers: {
//           "Content-Type": "application/json",
//           access_token: localStorage.access_token,
//         },
//       })
//         .then(() => {
//           this.errorMessage = "";
//           this.sendMessageUpdate();
//           this.getTasks();
//         })
//         .catch((err) => {
//           this.errorMessage = err.response.data.error[0];
//         });
//     },
//     showRegisterForm() {
//       if (!this.isRegistering) {
//         this.errorMessage = "";
//       }
//       this.isRegistering = true;
//     },
//     showAddForm() {
//       if (!this.isAddingTask) {
//         this.errorMessage = "";
//         this.task.id = "";
//         this.task.title = "";
//         this.task.description = "";
//         this.task.priority = "";
//         this.task.category = "";
//         this.task.due_date = "";
//       }
//       this.isAddingTask = true;
//     },
//     showEditForm(id) {
//       axios({
//         method: "GET",
//         url: `https://kanban-server-staging.herokuapp.com/task/${id}`,
//         headers: {
//           "Content-Type": "application/json",
//           access_token: localStorage.access_token,
//         },
//       }).then((result) => {
//         result = result.data;
//         this.task.id = result.id;
//         this.task.title = result.title;
//         this.task.description = result.description;
//         this.task.priority = result.priority;
//         this.task.category = result.category;
//         this.task.due_date = this.adjustDateForEditForm(result.due_date);
//         this.isEditingTask = true;
//       });
//     },
//     backToLogin() {
//       this.isRegistering = false;
//     },
//     backToHome() {
//       this.errorMessage = "";
//       this.task.id = 0;
//       this.task.title = "";
//       this.description = "";
//       this.priority = "";
//       this.category = "";
//       this.due_date = "";
//       this.isAddingTask = false;
//       this.isEditingTask = false;
//     },
//     logout() {
//       localStorage.removeItem("access_token");
//       this.isLogin = false;
//     },
//     adjustDateForSubmission(e) {
//       this.task.due_date = e.target.value.replace("T", " ") + ":00";
//     },
//     adjustDateForMainPage(date) {
//       let dateEdited = String(date).split("T")[0];
//       let timeEdited = String(date).split("T")[1].slice(0, 5);
//       return dateEdited + " " + timeEdited;
//     },
//     adjustDateForEditForm(date) {
//       let dateEdited = String(date).split("T")[0];
//       let timeEdited = String(date).split("T")[1].slice(0, 5);
//       return dateEdited + "T" + timeEdited;
//     },
//     getPriorityColor(priority) {
//       switch (priority) {
//         case "high":
//           return "bg-red-400 h-2";
//           break;
//         case "medium":
//           return "bg-yellow-400 h-2";
//           break;
//         case "low":
//           return "bg-green-400 h-2";
//           break;
//       }
//     },
//   },
//   computed: {
//     backlogTasks: function () {
//       let backlogs = this.tasks.filter((task) => task.category === "backlog");
//       backlogs = backlogs.map((backlog) => {
//         switch (backlog.priority) {
//           case "low":
//             backlog.priority = 1;
//             break;
//           case "medium":
//             backlog.priority = 2;
//             break;
//           case "high":
//             backlog.priority = 3;
//             break;
//         }
//         return backlog;
//       });
//       backlogs.sort(function (a, b) {
//         return (
//           String(a.due_date).localeCompare(String(b.due_date)) ||
//           b.priority - a.priority
//         );
//       });
//       backlogs = backlogs.map((backlog) => {
//         switch (backlog.priority) {
//           case 1:
//             backlog.priority = "low";
//             break;
//           case 2:
//             backlog.priority = "medium";
//             break;
//           case 3:
//             backlog.priority = "high";
//             break;
//         }
//         return backlog;
//       });
//       return backlogs;
//     },
//     todoTasks: function () {
//       let todos = this.tasks.filter((task) => task.category === "todo");
//       todos = todos.map((todo) => {
//         switch (todo.priority) {
//           case "low":
//             todo.priority = 1;
//             break;
//           case "medium":
//             todo.priority = 2;
//             break;
//           case "high":
//             todo.priority = 3;
//             break;
//         }
//         return todo;
//       });
//       todos.sort(function (a, b) {
//         return (
//           String(a.due_date).localeCompare(String(b.due_date)) ||
//           b.priority - a.priority
//         );
//       });
//       todos = todos.map((todo) => {
//         switch (todo.priority) {
//           case 1:
//             todo.priority = "low";
//             break;
//           case 2:
//             todo.priority = "medium";
//             break;
//           case 3:
//             todo.priority = "high";
//             break;
//         }
//         return todo;
//       });
//       return todos;
//     },
//     inProgressTasks: function () {
//       let tasks = this.tasks.filter((task) => task.category === "in progress");
//       tasks = tasks.map((task) => {
//         switch (task.priority) {
//           case "low":
//             task.priority = 1;
//             break;
//           case "medium":
//             task.priority = 2;
//             break;
//           case "high":
//             task.priority = 3;
//             break;
//         }
//         return task;
//       });
//       tasks.sort(function (a, b) {
//         return (
//           String(a.due_date).localeCompare(String(b.due_date)) ||
//           b.priority - a.priority
//         );
//       });
//       tasks = tasks.map((task) => {
//         switch (task.priority) {
//           case 1:
//             task.priority = "low";
//             break;
//           case 2:
//             task.priority = "medium";
//             break;
//           case 3:
//             task.priority = "high";
//             break;
//         }
//         return task;
//       });
//       return tasks;
//     },
//     doneTasks: function () {
//       let tasks = this.tasks.filter((task) => task.category === "done");
//       tasks = tasks.map((task) => {
//         switch (task.priority) {
//           case "low":
//             task.priority = 1;
//             break;
//           case "medium":
//             task.priority = 2;
//             break;
//           case "high":
//             task.priority = 3;
//             break;
//         }
//         return task;
//       });
//       tasks.sort(function (a, b) {
//         return (
//           String(a.due_date).localeCompare(String(b.due_date)) ||
//           b.priority - a.priority
//         );
//       });
//       tasks = tasks.map((task) => {
//         switch (task.priority) {
//           case 1:
//             task.priority = "low";
//             break;
//           case 2:
//             task.priority = "medium";
//             break;
//           case 3:
//             task.priority = "high";
//             break;
//         }
//         return task;
//       });
//       return tasks;
//     },
//   },
//   mounted() {
//     this.getTasks();
//     this.checkSocket();
//     this.sendReqRegularly();
//   },
// });
