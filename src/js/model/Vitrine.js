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

    static async createAdminPageProducts() {
        const products = await API.adminProducts()
        const tbody = document.querySelector("tbody")

        products.forEach(({ categoria, descricao, imagem, nome}) => {

            function categories() {

                const subcategories = categoria.split(" ")
                let result = ""

                for (let i = 0; i < subcategories.length; i++) {
                    result += `${subcategories[i]} `
                }

                return result

            }

            function description(){

                if(descricao.length > 41){
                    return descricao.slice(0,41)
                }else{
                    return descricao
                }
            }

            const tr = document.createElement("tr")
            tr.innerHTML = `
            <tr>
                <td class="produto"><img src="${imagem}" alt="${nome}">${nome}</td>
                <td class="elemento-tabela">${categories()}</td>
                <td class="elemento-tabela">${description()}</td>
                <td> <button id="editar"></button> <button id="deletar"></button></td>
            </tr>
            `
            tbody.appendChild(tr)
        })
    }

}

export class FiltrosVitrine {

    static async filtrarNome(input){
        
        const products = await API.products()

        let search = products.filter(function(produto){

            const {nome} = produto
            const searchFormatada = input.toLowerCase().trim()
            const nomeProdutoFormatado = nome.toLowerCase()
            
            if(nomeProdutoFormatado.includes(searchFormatada)){
                return produto
            }
        })
        
        for(let i = 0; i < search.length; i++){
            console.log(search[i])
        }  

        return search
    }

    static async filtrarCategoria(id){
        
        const products = await API.products()


        let search = products.filter(function(produto){

            const {categoria} = produto
            const searchFormatada = id.toLowerCase().trim()
            const categoriaProdutoFormatado = categoria.toLowerCase()
            
            if(categoriaProdutoFormatado.includes(searchFormatada)){
                return produto
            }
        })

        return search
    }
    
}

export class FiltrosDash {

    static async filtrarNome(input){
        
        const products = await API.adminProducts()

        let search = products.filter(function(produto){

            const {nome} = produto
            const searchFormatada = input.toLowerCase().trim()
            const nomeProdutoFormatado = nome.toLowerCase()
            
            if(nomeProdutoFormatado.includes(searchFormatada)){
                return produto
            }
        })
            
        return search
    }

    static async filtrarCategoria(id){
        
        const products = await API.adminProducts()

        let search = products.filter(function(produto){

            const {categoria} = produto
            const searchFormatada = id.toLowerCase().trim()
            const categoriaProdutoFormatado = categoria.toLowerCase()
            
            if(categoriaProdutoFormatado.includes(searchFormatada)){
                return produto
            }
        })

        return search
    }
    
}