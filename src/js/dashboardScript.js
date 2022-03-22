import { API } from "./model/API.js";

console.log(API.products())

export class Filtros {

    static async filtrarNome(input){
        
        const produtos = await API.products()

        let pesquisa = paises.filter(produto=>produto.name == input.value)

        return pesquisa
    }
    
}