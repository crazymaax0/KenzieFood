import { API } from "./API.js";

export class Vitrine {

    static async createCartProducts() {
        const products = await API.cart()

        for (let i = 0; i < products.length; i++) {
            this.createCartCard(products[i])
        }

    }

    static createCartCard(product) {
        const ul = document.getElementById("cartUl")
        const {categoria, imagem, nome, preco } = product.products

        function categories() {

            const subcategories = categoria.split(" ")
            let result = ""

            for (let i = 0; i < subcategories.length; i++) {
                result += `<p>${subcategories[i]}</p>`
            }

            return result

        }

        let priceString = preco.toString()
        let price = priceString.replace(".", ",")

        const li = document.createElement("li")
        li.innerHTML = `
            <div>
                <img src="${imagem}" alt="${nome}">
            </div>
    
            <div class="dados" > 
                                
                <div class="dados-line" >
                    <h4>${nome}</h4>

                    <div class="trash-can-background" >
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>

                ${categories()}
    
                <div class="dadosTotalValor" >
                    <h5>R$</h5><span>${price}</span>
                </div>

            </div>
            `
        ul.appendChild(li)
    }

}