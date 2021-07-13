const socket = new WebSocket("ws://localhost:3000");

function sendMessageUpdate() {
  socket.send("update");
}

function submitLogin(event) {
  event.preventDefault();

  let email = $("#loginEmail").val();
  let password = $("#loginPassword").val();
  localStorage.setItem("username", email.split("@")[0]);

  $.ajax({
    url: "http://localhost:3000/user/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      localStorage.setItem("access_token", data.access_token);
    })
    .fail((error) => {
      console.log(error);
    })
    .always((_) => {
      $("#loginEmail").val("");
      $("#loginPassword").val("");
    });
}

function submitTask(event) {
  event.preventDefault();

  let title = $("#title").val();
  let description = $("#description").val();
  let priority = $("#priority").val();
  let category = $("#category").val();
  let due_date = $("#due_date").val().replace("T", " ") + ":00";

  $.ajax({
    url: "http://localhost:3000/task",
    method: "POST",
    headers: {
      access_token: localStorage.access_token,
    },
    data: {
      title,
      description,
      priority,
      category,
      due_date,
    },
  })
    .done(() => {
      $("#title").val("");
      $("#description").val("");
      $("#priority").val("");
      $("#category").val("");
      $("#due_date").val("");
      sendMessageUpdate();
      getTasks();
    })
    .fail((error) => {
      console.log(error);
    });
}

function getTasks() {
  if (localStorage.access_token) {
    $.ajax({
      url: "http://localhost:3000/task",
      method: "GET",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .done((results) => {
        $("#tasks").empty();
        results.forEach((result) => {
          $("#tasks").append(`
            <div>
                <h5>${result.title}</h3>
            </div>     
            `);
        });
      })
      .fail((err) => {});
  }
}

$(document).ready(() => {
  socket.addEventListener("open", function (event) {
    console.log("connected to server");
  });
  socket.addEventListener("message", function (event) {
    if (event.data === "update") {
      getTasks();
    }
  });
  $("#form-login").submit(submitLogin);
  $("#form-add").submit(submitTask);

  getTasks();
});
