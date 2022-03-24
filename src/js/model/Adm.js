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
                console.log(loginForm[i].name)
                const name = loginForm[i].name
                const value = loginForm[i].value

                userInfos[name] = value
            }

            loginForm[i].value = ""
        }
        console.log(userInfos)
        const loginToken = await API.login(userInfos)

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

                window.location = "../../../index.html"
            }else{
                window.location = "../../../index.html"

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

}