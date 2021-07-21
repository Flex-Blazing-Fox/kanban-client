const bgColors = [
    "linear-gradient(to right, #00b09b, #96c93d)",
    "linear-gradient(to right, #ff5f6d, #ffc371)",
]

const notif = Toastify({
    text: "I am a toast",
    duration: 3000,
    close: true,
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
})

module.exports = notif