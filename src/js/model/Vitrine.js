import { Adm } from "./Adm.js";
import { API } from "./API.js";

export class Vitrine {

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

        const token = Adm.getUserInfo()

        if(token === API.token){
            /* CRIAR O ELEMENTO "PARA DASHBOARD" NO HEADER, QUE SOMENTE APARECE QUANDO O TOKEN É O DO ADM */
        }

        Vitrine.createCard(adminproducts)     
    }

    static createCard(productArray) {
        const ul = document.querySelector(".cont-products")
        ul.innerHTML=""
        productArray.forEach(({categoria, descricao, id, imagem, nome, preco}) => {

            let priceString = preco.toString()
            let price = priceString.replace("." , ",")

            const li = document.createElement("li")
            li.classList.add("card-product")
            li.innerHTML = `
                <img src="${imagem}" alt="${nome}">
                
                <h3>${nome}</h3>
                
                <p>${descricao}</p>

                <ul class="categories">
                    <li>${categoria}</li>
                </ul>

                

                <div class="buy">
                    <span>R$ ${price}</span>
                    
                    <div class="cont-icon-add-to-cart" id="${id}">
                        <img src="src/img/Cart.png" alt="Adicionar produto ao carrinho">
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

    static async createAdminPageProducts(products) {
        // const products = await API.adminProducts()
        const tbody = document.querySelector("tbody")
        tbody.innerHTML = ""
        products.forEach(({ id, categoria, descricao, imagem, nome}) => {

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
                    <td class="produto">
                        <figure>
                            <img src="${imagem}" alt="${nome}">
                            <figcaption>${nome}</figcaption>
                        </figure>
                        
                    </td>
                    <td class="elemento-tabela"><span class="categoria--td">${categoria}</span></td>
                    <td class="elemento-tabela">${description()}</td>
                    <td class="btts--td" id="${id}"> 
                        <button id="editar"></button> <button id="deletar"></button>
                    </td>
            </tr>
            `
            tbody.appendChild(tr)
        })
    }

    static adicionado = false

    static async addToCart(e){
        
        let id = Number(e.target.id)
        if(id === 0){
            id = Number(e.target.parentNode.id)
        }

        Vitrine.adicionado = true
        await API.addToCart(id)
        
        const cartItens = await API.cart()

        Vitrine.setUserData(cartItens)

        Vitrine.createCartCard()
    }

    static createCartCard() {

        let cartProducts = Vitrine.getUserData()

        const ul = document.getElementById("cartUl")
        console.log(ul.children.length)

        ul.innerHTML = ""

        if(Vitrine.adicionado === true){
            
            cartProducts.forEach((product) => {
                /* ver se coloca quantity no html, para mostrar a quantidade de itens no carrinho */
                const {quantity, products:{categoria, id, imagem, nome, preco}} = product
                if(id){
            
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
                            <p>${categoria}</p>
                
                            <div class="dadosTotalValor" >
                                <div id="itemQuantidade"><span>${quantity}</span><h5>X</h5></div> <div><h5>R$</h5><span>${price}</span></div> 
                            </div>
                        </div>
                        `
                    ul.appendChild(li)
                }
            })
        }else{
            ul.innerHTML = `
            <div class="boxEmpty">
            <img src="../../../src/img/carrinhoVazio.png" alt="Carrinho Vazio">
            <p>Por enquanto não temos produtos no carrinho</p>
            </div>
            `
            
            console.log(ul.children.length)
        }
        
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
            totalCash += product.products.preco * product.quantity
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
        let userProducts = Vitrine.getUserData()

        const product = userProducts.find(product => product.products.id === id)

        let itemQuantidade = ""

        if(e.target.tagName === "DIV"){

            itemQuantidade = e.target.parentNode.parentNode.children[2].children[0]

        }else{
            itemQuantidade = e.target.parentNode.parentNode.parentNode.children[2].children[0]

        }
        
        if(product.quantity > 1){
            product.quantity--
            itemQuantidade.innerHTML = `<span>${product.quantity}</span><h5>X</h5>`
            Vitrine.setUserData(userProducts)
        }else{
            for(let i = 0; i < userProducts.length; i++){
                if(userProducts[i] === product){
                    userProducts.splice(i, 1);
                }
            }
    
            Vitrine.setUserData(userProducts)
            const li = e.target.closest("li")
            li.remove()
            API.removeFromCart(id)

        }

        const ul = document.getElementById("cartUl")

        if(ul.children.length === 0){
            ul.innerHTML = `
            <div class="boxEmpty">
            <img src="../../../src/img/carrinhoVazio.png" alt="Carrinho Vazio">
            <p>Por enquanto não temos produtos no carrinho</p>
            </div>
            `
        }
        
        Vitrine.cartInfos(userProducts)
    }
}

export class FiltrosVitrine {

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
    
    static async filtrarPesquisaHomePage(input) {
        const array = await this.filtrarNome(input)
        
        Vitrine.createCard(array)
    }

    static async filtrarPesquisaDashBoard(input) {
        const array = await this.filtrarNome(input)
        
        Vitrine.createAdminPageProducts(array)
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

    static async filtrarCategoriaHomePage(input) {
        const array = await this.filtrarCategoria(input)
        
        Vitrine.createCard(array)
    }

    static async filtrarCategoriaDashBoard(input) {
        const array = await this.filtrarCategoria(input)
        
        Vitrine.createAdminPageProducts(array)
    }
    
}