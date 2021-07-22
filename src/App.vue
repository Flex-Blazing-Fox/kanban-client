<template>
  <div>
    <!-- Navbar -->
    <div
      v-if="isLogin && !isAddingTask && !isEditingTask"
      class="
        flex
        justify-between
        bg-primarycolor
        text-white
        py-2
        text-xl
        font-semibold
      "
    >
      <div class="flex">
        <div class="pl-10 cursor-pointer">
          <a @click.prevent="backToHome">Home</a>
        </div>
        <div class="pl-10 cursor-pointer" @click="showAddForm">Add</div>
      </div>
      <div class="pr-10 cursor-pointer" @click="logout">Logout</div>
    </div>

    <!-- Registration Form -->
    <div
      class="
        w-screen
        h-screen
        flex flex-col
        justify-center
        items-center
        bg-primarycolor
      "
      v-if="isRegistering"
    >
      <div class="w-1/2 mb-7">
        <h2 class="text-4xl text-white font-display font-bold">
          Register Your Account
        </h2>
      </div>
      <div
        :class="{
          'bg-white h-screen/3+ rounded-md shadow-2xl w-1/2': errorMessage,
          'bg-white h-screen/3 rounded-md shadow-2xl w-1/2': !errorMessage,
        }"
      >
        <form id="form-register" @submit.prevent="submitRegister">
          <div class="relative flex flex-col">
            <label
              for="login-email"
              class="text-gray-600 text-2xl font-display mt-6 ml-3 inline-block"
              >Email</label
            >
            <div class="flex items-center">
              <i class="fa fa-user text-primarycolor text-2xl ml-3"></i>
              <input
                class="
                  w-11/12
                  text-lg
                  my-2
                  ml-3
                  border-b-2
                  focus:border-primarycolor
                  outline-none
                  transition-all
                  duration-500
                "
                type="text"
                placeholder="Enter your email here, ex: user1@gmail.com"
                id="login-email"
                v-model="user.email"
              />
            </div>
          </div>
          <div class="relative flex flex-col">
            <label
              for="login-email"
              class="text-gray-600 text-2xl font-display mt-6 ml-3 inline-block"
              >Password</label
            >
            <div class="flex items-center">
              <i class="fa fa-lock text-primarycolor text-2xl ml-3"></i>
              <input
                class="
                  w-11/12
                  text-lg
                  my-2
                  ml-3
                  border-b-2
                  focus:border-primarycolor
                  outline-none
                  transition-all
                  duration-500
                "
                type="password"
                placeholder="Enter your password here"
                id="login-password"
                v-model="user.password"
              />
            </div>
          </div>
          <div
            class="relative mt-4 ml-3 text-sm text-red-400"
            id="register-error-message"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </div>
          <div class="mt-4 ml-3">
            <div>
              <input
                class="
                  p-2
                  pl-5
                  pr-5
                  rounded-lg
                  text-white
                  bg-primarycolor
                  cursor-pointer
                  transform
                  hover:translate-y-1
                  transition-all
                  duration-500
                "
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="w-1/2 mt-4">
        <a
          class="text-white cursor-pointer justify-self-start font-medium"
          @click.prevent="backToLogin"
          >Back To Login Page</a
        >
      </div>
    </div>

    <!-- Login Form -->
    <div
      class="w-screen h-screen flex flex-col justify-center items-center"
      v-if="isLogin === false && isRegistering === false"
    >
      <form
        class="w-full flex flex-col justify-center items-center"
        id="form-login"
        @submit.prevent="submitLogin"
      >
        <img src="assets/avatar.svg" class="w-32" />
        <h2 class="text-3xl my-8 font-semibold font-display text-gray-700">
          Welcome
        </h2>
        <div>
          <i class="fa fa-user text-primarycolor text-xl"></i>
          <input
            class="
              border-b-2
              outline-none
              focus:border-primarycolor
              text-md
              transition-all
              duration-500
              text-lg
              ml-3
            "
            type="text"
            placeholder="Email"
            id="login-email"
            v-model="user.email"
          />
        </div>
        <div class="mt-8">
          <i class="fa fa-lock text-primarycolor text-xl"></i>
          <input
            class="
              border-b-2
              outline-none
              focus:border-primarycolor
              text-md
              transition-all
              duration-500
              text-lg
              ml-3
            "
            type="password"
            placeholder="Password"
            id="login-password"
            v-model="user.password"
          />
        </div>
        <div
          class="mt-8 w-50 text-sm text-red-400"
          id="login-error-message"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </div>
        <div class="mt-8">
          <div>
            <input
              class="
                bg-primarycolor
                text-white
                rounded-full
                px-20
                py-3
                text-lg
                font-bold
                uppercase
                transform
                hover:translate-y-1
                transition-all
                duration-500
                cursor-pointer
              "
              type="submit"
              value="Login"
            />
          </div>
        </div>
      </form>
      <div class="mt-8 flex">
        <div class="text-gray-700 font-medium pr-1">
          Didn't have an account?
        </div>
        <a
          class="text-blue-500 cursor-pointer"
          @click.prevent="showRegisterForm"
          >Register here</a
        >
      </div>
      <div class="mt-8 flex items-center">
        <GoogleLogin
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccessGoogleLogin"
        ></GoogleLogin>
      </div>
    </div>

    <!-- Task Board -->
    <div class="p-10" v-if="isLogin && !isAddingTask && !isEditingTask">
      <div
        class="mb-2 text-sm text-red-400"
        id="login-error-message"
        v-if="errorMessage"
      >
        {{ errorMessage }}
      </div>
      <div class="grid grid-cols-4 gap-2 font-display">
        <Category
          :tasks="backlogTasks"
          @showEditForm="showEditForm"
          @deleteTask="deleteTask"
        ></Category>
        <Category
          :tasks="todoTasks"
          @showEditForm="showEditForm"
          @deleteTask="deleteTask"
        ></Category>
        <Category
          :tasks="inProgressTasks"
          @showEditForm="showEditForm"
          @deleteTask="deleteTask"
        ></Category>
        <Category
          :tasks="doneTasks"
          @showEditForm="showEditForm"
          @deleteTask="deleteTask"
        ></Category>
      </div>
    </div>

    <!-- Add Task -->
    <div
      class="
        w-screen
        h-screen
        flex flex-col
        justify-center
        items-center
        bg-primarycolor
      "
      v-if="isLogin && isAddingTask"
    >
      <div class="w-1/2 mb-7">
        <h2 class="text-4xl text-white font-display font-bold">
          Add Your Task
        </h2>
      </div>
      <div
        :class="{
          'w-1/2 h-screen/2++ bg-white rounded-md shadow-2xl text-gray-600':
            !errorMessage,
          'w-1/2 h-screen3/4 bg-white rounded-md shadow-2xl text-gray-600':
            errorMessage,
        }"
      >
        <form id="form-add" @submit.prevent="submitTask">
          <div>
            <label
              class="text-2xl font-display mt-6 ml-7 inline-block"
              for="title"
              >Title</label
            ><br />
            <input
              class="
                w-11/12
                text-lg
                my-2
                ml-7
                border-b-2
                focus:border-primarycolor
                outline-none
                transition-all
                duration-500
              "
              id="title"
              type="text"
              name="title"
              v-model="task.title"
            />
          </div>
          <div>
            <label
              class="text-gray-600 text-2xl font-display mt-6 ml-7 inline-block"
              for="description"
              >Description</label
            ><br />
            <textarea
              class="
                w-11/12
                my-2
                ml-7
                border-2
                focus:outline-none
                focus:border-primarycolor
              "
              name="description"
              id="description"
              cols="30"
              rows="10"
              v-model="task.description"
            ></textarea>
          </div>
          <div class="flex items-center justify-evenly">
            <div>
              <label for="priority">Priority</label><br />
              <select
                class="w-48"
                name="priority"
                id="priority"
                v-model="task.priority"
              >
                <option value="" selected>-----</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label for="category">Category</label><br />
              <select
                class="w-48"
                name="category"
                id="category"
                v-model="task.category"
              >
                <option value="" selected>-----</option>
                <option value="backlog">Backlog</option>
                <option value="todo">Todo</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label for="due_date">Due Date</label><br />
              <input
                id="due_date"
                name="due_date"
                type="datetime-local"
                :value="task.due_date"
                @change="adjustDateForSubmission"
              />
            </div>
          </div>
          <div class="text-sm text-red-400 ml-8 mt-6" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          <input
            class="
              ml-8
              mt-8
              bg-primarycolor
              px-4
              py-1
              rounded-md
              text-white
              cursor-pointer
              transform
              hover:translate-y-1
              transition-all
              duration-500
            "
            type="submit"
          />
        </form>
      </div>
      <div class="w-1/2 mt-4">
        <a
          class="text-white cursor-pointer justify-self-start font-medium"
          @click.prevent="backToHome"
        >
          Back To Home Page</a
        >
      </div>
    </div>

    <!-- Edit Task -->
    <div
      class="
        w-screen
        h-screen
        flex flex-col
        justify-center
        items-center
        bg-primarycolor
      "
      v-if="isLogin && isEditingTask"
    >
      <div class="w-1/2 mb-7">
        <h2 class="text-4xl text-white font-display font-bold">
          Edit Your Task
        </h2>
      </div>
      <div
        :class="{
          'w-1/2 h-screen/2++ bg-white rounded-md shadow-2xl text-gray-600':
            !errorMessage,
          'w-1/2 h-screen3/4 bg-white rounded-md shadow-2xl text-gray-600':
            errorMessage,
        }"
      >
        <form id="form-add" @submit.prevent="submitEditTask(task.id)">
          <div>
            <label
              class="text-2xl font-display mt-6 ml-7 inline-block"
              for="editTitle"
              >Title</label
            ><br />
            <input
              class="
                w-11/12
                text-lg
                my-2
                ml-7
                border-b-2
                focus:border-primarycolor
                outline-none
                transition-all
                duration-500
              "
              id="editTitle"
              type="text"
              name="title"
              v-model="task.title"
            />
          </div>
          <div>
            <label
              class="text-gray-600 text-2xl font-display mt-6 ml-7 inline-block"
              for="editDescription"
              >Description</label
            ><br />
            <textarea
              class="
                w-11/12
                my-2
                ml-7
                border-2
                focus:outline-none
                focus:border-primarycolor
              "
              name="description"
              id="editDescription"
              cols="30"
              rows="10"
              v-model="task.description"
            ></textarea>
          </div>
          <div class="flex items-center justify-evenly">
            <div>
              <label for="editPriority">Priority</label><br />
              <select
                class="w-48"
                name="priority"
                id="editPriority"
                v-model="task.priority"
              >
                <option value="" selected>-----</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label for="editCategory">Category</label><br />
              <select
                class="w-48"
                name="category"
                id="editCategory"
                v-model="task.category"
              >
                <option value="" selected>-----</option>
                <option value="backlog">Backlog</option>
                <option value="todo">Todo</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label for="editDueDate">Due Date</label><br />
              <input
                id="editDueDate"
                name="due_date"
                type="datetime-local"
                :value="task.due_date"
                @change="adjustDateForSubmission"
              />
            </div>
          </div>
          <div class="text-sm text-red-400 ml-8 mt-6" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          <input
            class="
              ml-8
              mt-8
              bg-primarycolor
              px-4
              py-1
              rounded-md
              text-white
              cursor-pointer
              transform
              hover:translate-y-1
              transition-all
              duration-500
            "
            type="submit"
          />
        </form>
      </div>
      <div class="w-1/2 mt-4">
        <a
          class="text-white cursor-pointer justify-self-start font-medium"
          @click.prevent="backToHome"
          >Back To Home Page</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Category from "./Category.vue";
import GoogleLogin from "vue-google-login";
axios.defaults.baseURL = "https://kanban-server-staging.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:3000";
let socket = new WebSocket("wss://kanban-server-staging.herokuapp.com");
// let socket = new WebSocket("ws://localhost:3000");
export default {
  name: "App",
  components: { Category, GoogleLogin },
  data() {
    return {
      title: "App.vue",
      params: {
        client_id:
          "585170277469-uvcusf135ti8n297a9tt7d7krr90c9a4.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      categories: ["backlog", "todo", "in progress", "done"],
      isLogin: localStorage.access_token ? true : false,
      isRegistering: false,
      isAddingTask: false,
      isEditingTask: false,
      errorMessage: "",
      tasks: [],
      user: {
        email: "",
        password: "",
      },
      task: {
        id: 0,
        title: "",
        description: "",
        priority: "",
        category: "",
        due_date: "",
      },
    };
  },
  methods: {
    sendMessageUpdate() {
      socket.send("update");
    },
    submitLogin() {
      axios({
        method: "POST",
        url: "/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: this.user,
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token;
          this.isLogin = true;
          this.errorMessage = "";
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
    onSuccessGoogleLogin(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "/user/googlelogin",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          idToken: id_token,
        },
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token;
          this.isLogin = true;
          this.getTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitRegister() {
      axios({
        method: "POST",
        url: "/user/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: this.user,
      })
        .then(({ data }) => {
          this.isRegistering = false;
        })
        .catch((err) => {
          if (
            err.response.status === 400 &&
            err.response.data.error[0] === "Email is not unique"
          ) {
            this.errorMessage =
              "The email you registering has already been used";
          } else if (err.response.status === 400) {
            this.errorMessage = "Invalid Email or Password";
          }
        })
        .finally(() => {
          this.user.email = "";
          this.user.password = "";
          if (!this.isRegistering) {
            this.errorMessage = "";
          }
        });
    },
    getTasks() {
      if (this.isLogin) {
        axios({
          method: "GET",
          url: "/task",
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
      }
    },
    spawnNewSocket() {
      socket = new WebSocket("wss://kanban-server-staging.herokuapp.com");
    },
    checkSocket() {
      let that = this;
      socket.addEventListener("open", function (event) {
        console.log("connected to server");
      });
      socket.addEventListener("message", function (event) {
        if (event.data === "update") {
          that.getTasks();
        }
      });
      socket.addEventListener("close", function (event) {
        socket = null;
        that.spawnNewSocket();
      });
    },
    sendReqRegularly() {
      if (this.isLogin) {
        this.getTasks();
        setTimeout(this.sendReqRegularly, 40000);
      }
    },
    submitTask() {
      axios({
        method: "POST",
        url: "/task",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        data: this.task,
      })
        .then(({ data }) => {
          this.errorMessage = "";
          this.isAddingTask = false;
          this.sendMessageUpdate();
          this.getTasks();
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error[0];
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
    submitEditTask(id) {
      axios({
        method: "PUT",
        url: `/task/${id}`,
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        data: this.task,
      })
        .then(({ data }) => {
          this.errorMessage = "";
          this.isEditingTask = false;
          this.sendMessageUpdate();
          this.getTasks();
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error[0];
        });
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `/task/${id}`,
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          this.errorMessage = "";
          this.sendMessageUpdate();
          this.getTasks();
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error[0];
        });
    },
    showRegisterForm() {
      if (!this.isRegistering) {
        this.errorMessage = "";
      }
      this.isRegistering = true;
    },
    showAddForm() {
      if (!this.isAddingTask) {
        this.errorMessage = "";
        this.task.id = "";
        this.task.title = "";
        this.task.description = "";
        this.task.priority = "";
        this.task.category = "";
        this.task.due_date = "";
      }
      this.isAddingTask = true;
    },
    showEditForm(id) {
      axios({
        method: "GET",
        url: `/task/${id}`,
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      }).then((result) => {
        result = result.data;
        this.task.id = result.id;
        this.task.title = result.title;
        this.task.description = result.description;
        this.task.priority = result.priority;
        this.task.category = result.category;
        this.task.due_date = this.adjustDateForEditForm(result.due_date);
        this.isEditingTask = true;
      });
    },
    backToLogin() {
      this.isRegistering = false;
    },
    backToHome() {
      this.errorMessage = "";
      this.task.id = 0;
      this.task.title = "";
      this.description = "";
      this.priority = "";
      this.category = "";
      this.due_date = "";
      this.isAddingTask = false;
      this.isEditingTask = false;
    },
    logout() {
      localStorage.removeItem("access_token");
      this.isLogin = false;
    },
    adjustDateForSubmission(e) {
      this.task.due_date = e.target.value.replace("T", " ") + ":00";
    },
    adjustDateForEditForm(date) {
      let dateEdited = String(date).split("T")[0];
      let timeEdited = String(date).split("T")[1].slice(0, 5);
      return dateEdited + "T" + timeEdited;
    },
  },
  computed: {
    backlogTasks: function () {
      let backlogs = this.tasks.filter((task) => task.category === "backlog");
      backlogs = backlogs.map((backlog) => {
        switch (backlog.priority) {
          case "low":
            backlog.priority = 1;
            break;
          case "medium":
            backlog.priority = 2;
            break;
          case "high":
            backlog.priority = 3;
            break;
        }
        return backlog;
      });
      backlogs.sort(function (a, b) {
        return (
          String(a.due_date).localeCompare(String(b.due_date)) ||
          b.priority - a.priority
        );
      });
      backlogs = backlogs.map((backlog) => {
        switch (backlog.priority) {
          case 1:
            backlog.priority = "low";
            break;
          case 2:
            backlog.priority = "medium";
            break;
          case 3:
            backlog.priority = "high";
            break;
        }
        return backlog;
      });
      return backlogs;
    },
    todoTasks: function () {
      let todos = this.tasks.filter((task) => task.category === "todo");
      todos = todos.map((todo) => {
        switch (todo.priority) {
          case "low":
            todo.priority = 1;
            break;
          case "medium":
            todo.priority = 2;
            break;
          case "high":
            todo.priority = 3;
            break;
        }
        return todo;
      });
      todos.sort(function (a, b) {
        return (
          String(a.due_date).localeCompare(String(b.due_date)) ||
          b.priority - a.priority
        );
      });
      todos = todos.map((todo) => {
        switch (todo.priority) {
          case 1:
            todo.priority = "low";
            break;
          case 2:
            todo.priority = "medium";
            break;
          case 3:
            todo.priority = "high";
            break;
        }
        return todo;
      });
      return todos;
    },
    inProgressTasks: function () {
      let tasks = this.tasks.filter((task) => task.category === "in progress");
      tasks = tasks.map((task) => {
        switch (task.priority) {
          case "low":
            task.priority = 1;
            break;
          case "medium":
            task.priority = 2;
            break;
          case "high":
            task.priority = 3;
            break;
        }
        return task;
      });
      tasks.sort(function (a, b) {
        return (
          String(a.due_date).localeCompare(String(b.due_date)) ||
          b.priority - a.priority
        );
      });
      tasks = tasks.map((task) => {
        switch (task.priority) {
          case 1:
            task.priority = "low";
            break;
          case 2:
            task.priority = "medium";
            break;
          case 3:
            task.priority = "high";
            break;
        }
        return task;
      });
      return tasks;
    },
    doneTasks: function () {
      let tasks = this.tasks.filter((task) => task.category === "done");
      tasks = tasks.map((task) => {
        switch (task.priority) {
          case "low":
            task.priority = 1;
            break;
          case "medium":
            task.priority = 2;
            break;
          case "high":
            task.priority = 3;
            break;
        }
        return task;
      });
      tasks.sort(function (a, b) {
        return (
          String(a.due_date).localeCompare(String(b.due_date)) ||
          b.priority - a.priority
        );
      });
      tasks = tasks.map((task) => {
        switch (task.priority) {
          case 1:
            task.priority = "low";
            break;
          case 2:
            task.priority = "medium";
            break;
          case 3:
            task.priority = "high";
            break;
        }
        return task;
      });
      return tasks;
    },
  },
  created() {
    this.getTasks();
    this.checkSocket();
    this.sendReqRegularly();
  },
};
</script>

<style>
</style>