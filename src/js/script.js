import { Vitrine } from "./model/Vitrine.js";
import {FiltrosVitrine} from "./model/Vitrine.js"

Vitrine.createHomePageProducts()
Vitrine.createCartCard()

document.getElementById("abrirCarrinho").addEventListener( "click", () => {
  document.getElementById("cartPopupBackGround").classList.remove("displayNone")
})

document.getElementById("fecharCarrinho").addEventListener( "click", () => {
  document.getElementById("cartPopupBackGround").classList.add("displayNone")
})

const campoBuscaNome = document.getElementById("pesqNome")

campoBuscaNome.addEventListener("keyup", function(){

  const value = campoBuscaNome.value
        

  let search = FiltrosVitrine.filtrarPesquisaHomePage(value)   

  return search
})

const btnTodos = document.getElementById('Todos');

btnTodos.addEventListener('click', () => {

  Vitrine.createHomePageProducts()
  
})

const btnPanificadora = document.getElementById('Panificadora');

btnPanificadora.addEventListener('click', function(){

    const value = btnPanificadora.id
        
    let search = FiltrosVitrine.filtrarCategoriaHomePage(value)

    return search
})

const btnFrutas = document.getElementById('Frutas');

btnFrutas.addEventListener('click', function(){

    const value = btnFrutas.id
        
    let search = FiltrosVitrine.filtrarCategoriaHomePage(value)

    return search
})

const btnBebidas = document.getElementById('Bebidas');

btnBebidas.addEventListener('click', function(){

    const value = btnBebidas.id
        
    let search = FiltrosVitrine.filtrarCategoriaHomePage(value)

    return search
})
