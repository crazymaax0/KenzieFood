import { API } from "./model/API.js";
import { FiltrosVitrine, Vitrine } from "./model/Vitrine.js";
import { Adm } from "./model/Adm.js"

const products = await API.adminProducts()
Vitrine.createAdminPageProducts(products)

const add                   = document.getElementById("add")
const cadastroProdutoModal  = document.getElementById("cadastroProduto")
const fecharCadastroButton  = document.getElementById("fecharCadastro")

add.addEventListener("click", () => {
    cadastroProdutoModal.classList.remove("displayNone")
})

fecharCadastroButton.addEventListener("click", () => {
    cadastroProdutoModal.classList.add("displayNone")
})


const botao = document.getElementById("Bebidas")
const div    = document.getElementById("alert")

botao.addEventListener("click", () => {
    div.classList.add("show")
    div.classList.remove("displayNone")
    div.classList.add("showAlert")
    setTimeout( () => {
        div.classList.remove("show")
        div.classList.add("displayNone")
    }, 3000)
})

// FILTROS //

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

// adicionar, editar e excluir produtos //

const btnAddNewProduct = document.getElementById('add');

btnAddNewProduct.addEventListener('click', () => Adm.getInfosNewProduct());


const excluirProdutoModal  = document.getElementById("excluirProduto")
const fecharExcluirButton  = document.getElementById("fecharExcluir")
const fecharNãoButton      = document.querySelector(".deleteBtt--nao")

const btnRemoveProduct = document.querySelectorAll('.btts--td')

fecharExcluirButton.addEventListener("click", () => {
    excluirProdutoModal.classList.add("displayNone")
})

fecharNãoButton.addEventListener("click", () => {

    excluirProdutoModal.classList.add("displayNone")
})

for (let i = 0; i < btnRemoveProduct.length; i++){

    btnRemoveProduct[i].addEventListener("click", () => {
        excluirProdutoModal.classList.remove("displayNone")
    })
    
    btnRemoveProduct[i].addEventListener('click', function(){

        const value = btnRemoveProduct[i].id

        return value
    
    }

    
)}