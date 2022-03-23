import { API } from "./model/API.js";

const login        = document.getElementById("login")
const register     = document.getElementById("register")

const loginForm    = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

login.addEventListener("click", () => {
  register.classList.remove("color")
  login.classList.add("color")

  loginForm.classList.remove("displayNone")
  registerForm.classList.add("displayNone")
})

register.addEventListener("click", () => {
  login.classList.remove("color")
  register.classList.add("color")

  registerForm.classList.remove("displayNone")
  loginForm.classList.add("displayNone")
})