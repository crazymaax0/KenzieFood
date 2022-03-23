import { API } from "./model/API.js";
import { Vitrine } from "./model/Vitrine.js";

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

const botao = document.getElementById("bebida")
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







class Filtros {

    static async filtrarNome(input){
        
        const produtos = await API.products()

        let pesquisa = produtos.filter(produto=>produto.name == input)

        return pesquisa
    }
    
}

console.log(Filtros.filtrarNome())

const campoBuscaNome = document.querySelector("#pesqNome")
campoBuscaNome.addEventListener("keyup", function(){

    const value = campoBuscaNome.value
    console.log(value)
    
    let resposta = Filtros.filtrarNome(value)

    console.log(resposta)
})