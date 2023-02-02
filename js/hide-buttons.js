/* Hide all buttons when user is inactive */
let app = document.querySelector(".app");

let inactiveTime = 10000;
let mouseLastMovedTime = new Date();

document.addEventListener("mousemove", () => {
  mouseLastMovedTime = new Date();
  app.classList.remove("inactive");
  document.body.style.cursor = "auto";
});

function deactivateApp() {
  let now = new Date();
  let difTime = now - mouseLastMovedTime;

  if (difTime >= inactiveTime) {
    app.classList.add("inactive");
    document.body.style.cursor = "none";
  }

  requestAnimationFrame(deactivateApp);
}
deactivateApp();
