import { API } from "./model/API.js";
import { Vitrine } from "./model/Vitrine.js";
import { FiltrosDash } from "./model/Vitrine.js";
import { Adm } from "./model/Adm.js"

Vitrine.createAdminPageProducts()

const add                   = document.getElementById("add")
const cadastroProdutoModal  = document.getElementById("cadastroProduto")
const fecharCadastroButton  = document.getElementById("fecharCadastro")

add.addEventListener("click", () => {
    cadastroProdutoModal.classList.remove("displayNone")
})

fecharCadastroButton.addEventListener("click", () => {
    cadastroProdutoModal.classList.add("displayNone")
})


const campoBuscaNome = document.querySelector("#pesqNome")
campoBuscaNome.addEventListener("keyup", function(){

    const value = campoBuscaNome.value
        
    let resposta = FiltrosDash.filtrarNome(value)

    return resposta
})

const btnPanificadora = document.getElementById('Panificadora');

btnPanificadora.addEventListener('click', function(){

    const value = btnPanificadora.id
        
    let resposta = FiltrosDash.filtrarCategoria(value)

    return resposta
})

const btnFrutas = document.getElementById('Frutas');

btnFrutas.addEventListener('click', function(){

    const value = btnFrutas.id
        
    let resposta = FiltrosDash.filtrarCategoria(value)

    return resposta
})

const btnBebidas = document.getElementById('Bebidas');

btnBebidas.addEventListener('click', function(){

    const value = btnBebidas.id
        
    let resposta = FiltrosDash.filtrarCategoria(value)

    return resposta
})

const btnAddNewProduct = document.getElementById('add');

btnAddNewProduct.addEventListener('click', () => Adm.getInfosNewProduct());
