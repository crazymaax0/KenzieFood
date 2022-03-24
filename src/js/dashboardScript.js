import { API } from "./model/API.js";
import { FiltrosVitrine, Vitrine } from "./model/Vitrine.js";
import { Adm } from "./model/Adm.js"

const products = await API.adminProducts()
Vitrine.createAdminPageProducts(products)

const add                   = document.getElementById("add")
const cadastroProdutoModal  = document.getElementById("cadastroProduto")
const edicaoProdutoModal  = document.getElementById("edicaoProduto")
const fecharCadastroButton  = document.getElementById("fecharCadastro")
const editButton            = document.querySelectorAll("#editar")


for(let i of editButton){
    i.addEventListener('click', (e) => {
        const productID = e.target.parentNode.id
        Adm.editProduct(productID)
    })
  }
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


const btnPanificadora = document.getElementById('Hamburguers');

btnPanificadora.addEventListener('click', function(){

    const value = btnPanificadora.id
        
    let resposta = FiltrosVitrine.filtrarCategoriaDashBoard(value)

    return resposta
})

const btnFrutas = document.getElementById('Acompanhamentos');

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

const btnRemoveProduct = document.querySelectorAll('#deletar')
const btnConfirmRemove = document.querySelector('.deleteBtt--sim')

let idRemocao = 0

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

        const value = btnRemoveProduct[i].parentElement.id

        idRemocao = value
    }


)}

btnConfirmRemove.addEventListener("click", () => Adm.remove(idRemocao))