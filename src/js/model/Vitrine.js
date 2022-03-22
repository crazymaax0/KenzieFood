import { API } from "./API.js";

export class Vitrine {

    static async createHomePageProducts(){
        const products = await API.products()
        const adminproducts = await API.adminProducts()

        this.createCard(products)
        this.createCard(adminproducts)     
    }

    static createCard(productArray) {
        const ul = document.querySelector(".cont-products")
        
        productArray.forEach(({categoria, descricao, imagem, nome, preco}) => {

            function categories(){

                const subcategories = categoria.split(" ")
                let result = ""

                for(let i = 0; i < subcategories.length; i++){
                    result+= `<li>${subcategories[i]}</li>`
                }

                return result

            }

            let priceString = preco.toString()
            let price = priceString.replace("." , ",")

            const li = document.createElement("li")
            li.classList.add("card-product")
            li.innerHTML = `
                <img src="${imagem}" alt="${nome}">

                
                <h3>${nome}</h3>
                
                <p>${descricao}</p>

                <ul class="categories">
                    ${categories()}
                </ul>

                

                <div class="buy">
                    <span>R$ ${price}</span>
                    
                    <div class="cont-icon-add-to-cart">
                        
                    </div>
                </div>
                
            `
            ul.appendChild(li)
        })
    }
}