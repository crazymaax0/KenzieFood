import { API } from "./API.js";

export class Vitrine {

    static userProducts = []

    static getUserData(){
        const colectInfo = window.localStorage.getItem("userData") 
        return JSON.parse(colectInfo)
    }

    static setUserData(value){
        const dataJSON = JSON.stringify(value)
        window.localStorage.setItem("userData", dataJSON)
    }

    static async createHomePageProducts(){

        const adminproducts = await API.adminProducts()
       
        this.createCard(adminproducts)     
    }

    static createCard(productArray) {
        const ul = document.querySelector(".cont-products")
        
        productArray.forEach(({categoria, descricao, id, imagem, nome, preco}) => {

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
                    
                    <div class="cont-icon-add-to-cart" id="${id}">
                        
                    </div>
                </div>
                
            `

            
            ul.appendChild(li)
        })

        const buyButtons = document.querySelectorAll(".cont-icon-add-to-cart")
        buyButtons.forEach((button) => {

            button.addEventListener( "click", Vitrine.addToCart)
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

    static async addToCart(e){
        
        const id = Number(e.target.id)

        const products = await API.adminProducts()
        Vitrine.userProducts = Vitrine.getUserData()

        if(Vitrine.userProducts == null){
            Vitrine.userProducts = [] 
        }
            
        const product = products.find(product => product.id === id)
        const exists  = Vitrine.userProducts.find( element => element.id == product.id)

        if(exists){
            exists.quantity += 1
        }
        else {
            product.quantity = 1
            Vitrine.userProducts.push(product)
        }

        Vitrine.setUserData(Vitrine.userProducts)

        Vitrine.createCartCard()
    }

    static createCartCard() {

        let cartProducts = Vitrine.getUserData()

        const ul = document.getElementById("cartUl")
        ul.innerHTML = ""
        cartProducts.forEach((product) => {

            const {categoria, id, imagem, nome, preco} = product
            if(id){

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
                            <div class="trash-can-background" id="${id}" >
                                <i class="fa-solid fa-trash-can" ></i>
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
        })

        const deleteButtons = document.querySelectorAll(".trash-can-background")
        deleteButtons.forEach((button) => {

            button.addEventListener( "click", Vitrine.removeItem)
        })

        Vitrine.cartInfos(cartProducts)
    }

    static cartInfos(cartProducts){
        const quantity = document.querySelector(".cartPopupQntTotal")
        const cash = document.querySelector(".cartPopupTotalValor")

        let totalItens = 0
        let totalCash = 0
        cartProducts.forEach((product) => {
            
            totalItens += product.quantity
            totalCash += product.preco * product.quantity
        })

        let priceString = totalCash.toString()
        let price = priceString.replace(".", ",")

        quantity.innerHTML = `<span>${totalItens}</span>`
        cash.innerHTML = `<p class="sifrao" >R$</p><span>${price}</span>`
    }

    static removeItem(e){

        let id = Number(e.target.id)
        if(id === 0){
            id = Number(e.target.parentNode.id)
        }
        Vitrine.userProducts = Vitrine.getUserData()

        const product = Vitrine.userProducts.find(product => product.id === id)

        if(product.quantity > 1){
            product.quantity--
            Vitrine.setUserData(Vitrine.userProducts)
        }else{
            for(let i = 0; i < Vitrine.userProducts.length; i++){
                if(Vitrine.userProducts[i] === product){
                    Vitrine.userProducts.splice(i, 1);
                }
            }
    
            Vitrine.setUserData(Vitrine.userProducts)
            const li = e.target.closest("li")
            li.remove()
        }

        Vitrine.cartInfos(Vitrine.userProducts)
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