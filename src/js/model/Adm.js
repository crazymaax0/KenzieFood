import { API } from "./API.js";

export class Adm {

    static dataRegisterProducts = {
        nome: '',
        preco: '',
        categoria: '',
        imagem: '',
        descricao: ''
    };

    static dataRegisterAdmin = {
        name: '',
        email: '',
        password: ''
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

            console.log(event.target);

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

    static registerAdmin(){

        const formReg = document.getElementById('registerForm');

        formReg.addEventListener('submit', (event) => {
            event.preventDefault()

            for(let i = 0; i < event.target.children.length; i++){

                if(event.target.children[i].type !== 'submit'){

                    const key   = event.target.children[i].name;
                    const value = event.target.children[i].value;

                    this.dataRegisterAdmin[key] = value;
                }
            }

            this.regNewAdmin();
        })
    };

    static regNewAdmin(){

        API.register(this.dataRegisterAdmin);
    };
}