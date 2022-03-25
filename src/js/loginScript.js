import { Adm } from "./model/Adm.js";

const login        = document.getElementById("login")
const register     = document.getElementById("register")

const loginForm    = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

const loginButton  = loginForm.children[2]
const registerButton = registerForm.children[3]

loginButton.addEventListener("click", Adm.login)
registerButton.addEventListener("click", Adm.register)


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