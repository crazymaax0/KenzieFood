import { Vitrine } from "./model/Vitrine.js";

document.getElementById("abrirCarrinho").addEventListener( "click", () => {
  document.getElementById("cartPopupBackGround").classList.remove("displayNone")
})

document.getElementById("fecharCarrinho").addEventListener( "click", () => {
  document.getElementById("cartPopupBackGround").classList.add("displayNone")
})

Vitrine.createHomePageProducts()
Vitrine.createCartCard()