import { API } from "./model/API.js";
import { Vitrine } from "./model/Vitrine.js";

// console.log(API.products())
Vitrine.createAdminPageProducts()
export class Filtros {

    static async filtrarNome(input){
        
        const produtos = await API.products()

        let pesquisa = paises.filter(produto=>produto.name == input.value)

        return pesquisa
    }
    
}