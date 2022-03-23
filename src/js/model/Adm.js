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