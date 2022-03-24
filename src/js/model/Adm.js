import { API } from "./API.js";
import { Vitrine } from "./Vitrine.js";

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
                console.log(loginForm[i].name)
                const name = loginForm[i].name
                const value = loginForm[i].value

                userInfos[name] = value
            }

            loginForm[i].value = ""
        }
        console.log(userInfos)
        const loginToken = await API.login(userInfos)
        console.log(loginToken)

        if(loginToken === 404 || loginToken === 401){
            /* CRIAR VIA DOM UM POPUP OU MENSAGEM QUE DIZ QUE DEU RUIM */


        }else{

            Adm.setUserInfo(loginToken)

            if(userInfos.email === 'equipe4@gmail.com'){

                const dataAdmin = {
                    email: 'equipe4@gmail.com',
                    senha: 123
                }

                localStorage.setItem('infosAdmin', JSON.stringify(dataAdmin))

                // window.location = "../../../index.html"
            }else{
                // window.location = "../../../index.html"

                console.log(loginToken);
            }
        }
        
    }

    static async register(e){
        e.preventDefault()

        let registerForm = e.target.parentNode
        console.log(registerForm)
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
        console.log(userInfos)
        const registerToken = await API.register(userInfos)

        if(registerToken === 404){
            /* CRIAR VIA DOM UM POPUP OU MENSAGEM QUE DIZ QUE DEU RUIM */
        }else{

            Adm.setUserInfo(registerToken)
            /* O USUARIO FOI CRIADO, MOSTRAR MENSAGEM QUE FOI CRIADO E MUDAR O SELECIONADO PARA LOGIN */
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

            this.regNewProduct();
        });

        const prodCateg = document.getElementsByClassName('containerCategorias');

        prodCateg[0].addEventListener('click', (event) => {

            if(event.target.tagName === 'LABEL'){
                const value = event.target.innerHTML;

                this.dataRegisterProducts.categoria = value;
            }
        })

    };

    static regNewProduct(){

        API.newProduct(this.dataRegisterProducts);
        

    };

    static async editProduct(id){

        const adminproducts = await API.adminProducts()

        const product = adminproducts.find((item) => item.id === Number(id))
        
        const {categoria, descricao, imagem, nome, preco} = product

        const formDisplay = document.getElementById('edicaoProduto');
        formDisplay.classList.remove("displayNone")

        const form = formDisplay.children[0].children[1]
        
        const dataRegisterProducts = {
            nome: nome,
            preco: preco,
            categoria: categoria,
            imagem: imagem,
            descricao: descricao
        };
        const subcategories = categoria.split(" ")
        console.log(subcategories)

        for(let i = 0; i < form.children.length; i++){
            if(form.children[i].tagName === 'INPUT'){
                const key   = form.children[i].name;
                form.children[i].value = dataRegisterProducts[key]
            }
            if(form.children[i].tagName === 'DIV'){
                for(let j = 0; j < form.children[i].children.length; j++){
                    if(form.children[i].children[j].tagName === 'INPUT'){
                        const key   = form.children[i].children[j].name;

                        console.log(form.children[i].children[j].id)
                        console.log(dataRegisterProducts)

                        for(let k = 0; k < subcategories.length; k++){
                            if(subcategories[k] === form.children[i].children[j].id){
                                console.log(form.children[i].children[j])

                            }
                        }

                        /* if(subcategories[i] === form.children[i].children[j].id){
                            form.children[i].children[j].checked = true
                            
                        } */
                    }
                }

                
            }
        }
        


    }
    static showAlerts(aviso) {

        const criado  = document.getElementById("alert")
        const erro    = document.getElementById("erro")

        const cadastroProdutoModal  = document.getElementById("cadastroProduto")
        const fecharCadastroButton  = document.getElementById("fecharCadastro")
        
        if(aviso == 201) {
            criado.classList.add("show")
            criado.classList.remove("displayNone")
            criado.classList.add("showAlert")
            setTimeout( () => {
                criado.classList.remove("show")
                criado.classList.add("displayNone")
            }, 3000)

            cadastroProdutoModal.classList.add("displayNone")

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
    }

    static async remove(e){
               
        const removeToken = await API.deleteProduct(e)

        console.log(removeToken)

        if(removeToken === 204){

            window.location = "../../../dashboard.html"
        }

    }

}