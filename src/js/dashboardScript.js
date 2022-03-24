import { API } from "./model/API.js";
import { FiltrosVitrine, Vitrine } from "./model/Vitrine.js";
// import { FiltrosDash } from "./model/Vitrine.js";
import { Adm } from "./model/Adm.js"

const products = await API.adminProducts()
Vitrine.createAdminPageProducts(products)

const add                   = document.getElementById("add")
const cadastroProdutoModal  = document.getElementById("cadastroProduto")
const edicaoProdutoModal  = document.getElementById("edicaoProduto")
const fecharCadastroButton  = document.getElementById("fecharCadastro")
const fecharEdicaoButton  = document.getElementById("fecharEdicaoButton")

add.addEventListener("click", () => {
    cadastroProdutoModal.classList.remove("displayNone")
})

fecharCadastroButton.addEventListener("click", () => {
    cadastroProdutoModal.classList.add("displayNone")
})


fecharEdicaoButton.addEventListener("click", () => {
    edicaoProdutoModal.classList.add("displayNone")
})


const btnTodos = document.getElementById('Todos');

btnTodos.addEventListener('click', async () => {

    const products = await API.adminProducts()
    Vitrine.createAdminPageProducts(products)
  
})

const campoBuscaNome = document.querySelector("#pesqNome")

campoBuscaNome.addEventListener("keyup", function(){

    const value = campoBuscaNome.value
    
    let resposta = FiltrosVitrine.filtrarPesquisaDashBoard(value)

    return resposta
})


const btnPanificadora = document.getElementById('Panificadora');

btnPanificadora.addEventListener('click', function(){

    const value = btnPanificadora.id
        
    let resposta = FiltrosVitrine.filtrarCategoriaDashBoard(value)

    return resposta
})

const btnFrutas = document.getElementById('Frutas');

btnFrutas.addEventListener('click', function(){

    const value = btnFrutas.id
        
    let resposta = FiltrosVitrine.filtrarCategoriaDashBoard(value)

    return resposta
})

const btnBebidas = document.getElementById('Bebidas');

btnBebidas.addEventListener('click', function(){

    const value = btnBebidas.id
        
    let resposta = FiltrosVitrine.filtrarCategoriaDashBoard(value)

    return resposta
})

const btnAddNewProduct = document.getElementById('add');

btnAddNewProduct.addEventListener('click', () => Adm.getInfosNewProduct());
