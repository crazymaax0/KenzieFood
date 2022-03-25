import { API } from "./API.js";

export class Adm {

    static dataRegisterProducts = {
        nome: '',
        preco: '',
        categoria: '',
        imagem: '',
        descricao: ''
    };

    static getUserInfo(){
        const colectInfo = window.localStorage.getItem("userInfo") 
        return JSON.parse(colectInfo)
    }

    static setUserInfo(value){
        const dataJSON = JSON.stringify(value)
        window.localStorage.setItem("userInfo", dataJSON)
    }

    static async login(e){
        e.preventDefault()

        let loginForm = e.target.parentNode

        const userInfos = {}

        for(let i = 0; i < loginForm.length -1; i++){
            if(loginForm[i].name){

                const name = loginForm[i].name
                const value = loginForm[i].value

                userInfos[name] = value
            }

            loginForm[i].value = ""
        }

        const loginToken = await API.login(userInfos)


        if(loginToken === 404 || loginToken === 401){
        }else{

            Adm.setUserInfo(loginToken)

            if(userInfos.email === 'equipe4@gmail.com'){

                const dataAdmin = {
                    email: 'equipe4@gmail.com',
                    senha: 123
                }

                localStorage.setItem('infosAdmin', JSON.stringify(dataAdmin))

                window.location = "../../../api-kenziefood-m2-mucasliranda/index.html"
            }else{
                window.location = "../../../api-kenziefood-m2-mucasliranda/index.html"
            }
        }
        
    }

    static async register(e){
        e.preventDefault()

        let registerForm = e.target.parentNode
        const userInfos = {}

        for(let i = 0; i < registerForm.length -1; i++){
            if(registerForm[i].name){
                console.log(registerForm[i].name)
                const name = registerForm[i].name
                const value = registerForm[i].value

                userInfos[name] = value
            }

            registerForm[i].value = ""
        }
        const registerToken = await API.register(userInfos)

        if(registerToken === 404){
        }else{
            Adm.setUserInfo(registerToken)
        }
        
    }

    static getInfosNewProduct(){

        const form = document.getElementById('cadastroProduto');

        form.children[0].addEventListener('submit', (event) => {

            event.preventDefault();

            for(let i = 0; i < event.target.children[1].children.length; i++){
                if(event.target.children[1].children[i].tagName === 'INPUT'){
                    const key   = event.target.children[1].children[i].name;
                    const value = event.target.children[1].children[i].value;
                    this.dataRegisterProducts[key] = value;
                }
            }
            API.newProduct(this.dataRegisterProducts);
        });

        const prodCateg = document.getElementsByClassName('containerCategorias');

        prodCateg[0].addEventListener('click', (event) => {

            if(event.target.tagName === 'LABEL'){
                const value = event.target.innerHTML;
                this.dataRegisterProducts.categoria = value;
            }
        })
    };

    static productID = ""

    static async editProduct(id){
        const adminproducts = await API.adminProducts()
        const product = adminproducts.find((item) => item.id === Number(id))
        this.productID = product.id

        const {categoria, descricao, imagem, nome, preco} = product

        this.dataRegisterProducts = {
            nome: nome,
            preco: preco,
            categoria: categoria,
            imagem: imagem,
            descricao: descricao
        };

        const formDisplay = document.getElementById('edicaoProduto');
        formDisplay.classList.remove("displayNone")

        const form = formDisplay.children[0].children[1]
        const prodCateg = document.getElementsByClassName('containerCategorias');

        prodCateg[0].addEventListener('click', (event) => {
            if(event.target.tagName === 'LABEL'){
                const value = event.target.innerHTML;
                this.dataRegisterProducts.categoria = value;
            }
        })


        for(let i = 0; i < form.children.length; i++){
            if(form.children[i].tagName === 'INPUT'){
                const key   = form.children[i].name;
                form.children[i].value = this.dataRegisterProducts[key]
            }
            
            
            if(form.children[i].tagName === 'DIV'){
                for(let j = 0; j < form.children[i].children.length; j++){
                    if(form.children[i].children[j].tagName === 'INPUT'){
                        const key   = form.children[i].children[j];
                        let sliced = key.id.slice(0,-2)
                        if(sliced === this.dataRegisterProducts.categoria){
                            key.checked = true
                        }
                    }
                }
            }
        }

        const prodCategEdit = document.getElementsByClassName('containerCategorias');
        prodCategEdit[1].addEventListener('click', (event) => {

            if(event.target.tagName === 'LABEL'){
                const value = event.target.innerHTML;
                Adm.dataRegisterProducts.categoria = value;
            }
        })

    }
    
    static async editComplete(e){
        e.preventDefault()

        const form = e.target.parentNode.parentNode.parentNode.children[1].children
        for(let i = 0; i < form.length; i++){
            if(form[i].tagName === 'INPUT'){
                const key   = form[i].name;
                const value = form[i].value;
                Adm.dataRegisterProducts[key] = value;
            }
        }

        const product = Adm.dataRegisterProducts
        await API.editProduct(Adm.productID,product)
        
        Adm.showAlerts(202)
    }
    static showAlerts(aviso) {

        const criado  = document.getElementById("alert")
        const erro    = document.getElementById("erro")

        const cadastroProdutoModal  = document.getElementById("cadastroProduto")
        const loginErrado           = document.getElementById("errado")
        const produtoAlterado       = document.getElementById("alterado")
        const produtoApagado        = document.getElementById("apagado")
        

        if(aviso == 201) {
            criado.classList.add("show")
            criado.classList.remove("displayNone")
            criado.classList.add("showAlert")
                setTimeout( () => {
                    criado.classList.remove("show")
                    criado.classList.add("displayNone")
                    window.location = "../../../dashboard.html"
                }, 1500)
        }

        else if(aviso == 202) {
            produtoAlterado.classList.add("show")
            produtoAlterado.classList.remove("displayNone")
            produtoAlterado.classList.add("showAlert")
                setTimeout( () => {
                    produtoAlterado.classList.remove("show")
                    produtoAlterado.classList.add("displayNone")
                    window.location = "../../../dashboard.html"
                }, 1500)
        }

        else if(aviso == 204) {
            produtoApagado.classList.add("show")
            produtoApagado.classList.remove("displayNone")
            produtoApagado.classList.add("showAlert")
                setTimeout( () => {
                    produtoApagado.classList.remove("show")
                    produtoApagado.classList.add("displayNone")
                    window.location = "../../../dashboard.html"
                }, 1500)  
        }

        else if(aviso == 400) {
            erro.classList.add("show")
            erro.classList.remove("displayNone")
            erro.classList.add("showAlert")
            setTimeout( () => {
                erro.classList.remove("show")
                erro.classList.add("displayNone")
            }, 3000)
            cadastroProdutoModal.classList.add("displayNone")
        }
        
        else if(aviso == 404) {
            loginErrado.classList.add("show")
            loginErrado.classList.remove("displayNone")
            loginErrado.classList.add("showAlert")
            setTimeout( () => {
                loginErrado.classList.remove("show")
                loginErrado.classList.add("displayNone")
            }, 3000)
        }
    }

    static async remove(e){
        const removeToken = await API.deleteProduct(e)

        Adm.showAlerts(removeToken)
    }
}