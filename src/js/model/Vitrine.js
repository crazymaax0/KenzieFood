import { API } from "./API.js";

export class Vitrine {

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