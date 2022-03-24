export class API {

    static url = "https://kenzie-food-api.herokuapp.com"
    static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjQ3ODkwNDA1LCJleHAiOjE2NDg3NTQ0MDUsInN1YiI6IltvYmplY3QgVW5kZWZpbmVkXSJ9.dPq0EN6CllF95M5ccSzDimblxOvFl795L6Rp4NkfGNE"

    static async register(user) {

        const response = await fetch(this.url + "/auth/register", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(user)
        })

        if(response.status === 404){
            return response.status
        }

        const data = await response.json()
        
        return data
    }

    static async login(user) {

        const response = await fetch(this.url + "/auth/login", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(user)
        })

        if(response.status === 404){
            return response.status
        }

        const data = await response.json()

        return data
    }

    static async products() {

        const response = await fetch(this.url + "/products", {
            "headers": {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        
        return data
    }

    static async adminProducts() {

        const response = await fetch(this.url + "/my/products", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })

        const data = await response.json()
        
        return data
    }

    static async newProduct(product) {

        const response = await fetch(this.url + "/my/products", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            "body": JSON.stringify(product)
        })

        const data = await response.json()
        
        return data
    }

    static async editProduct(id, product) {

        const response = await fetch(this.url + "/my/products/" + `${id}`, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            "body": JSON.stringify(product)
        })

        const data = await response.json()
        
        return data
    }

    static async deleteProduct(id) {

        const response = await fetch(this.url + "/my/products/" + `${id}`, {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })

        const data = await response.json()
        
        return data
    }

    static async cart() {

        const response = await fetch(this.url + "/cart", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        })

        const data = await response.json()
        
        return data
    }

    static async addToCart(id) {

        const response = await fetch(this.url + "/cart/add", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            "body": JSON.stringify({
                "product_id": `${id}`
            })
        })

        const data = await response.json()
        
        return data
    }

    // static async removeFromCart(id) {

    //     const response = await fetch(this.url + "/cart/remove/" + `${id}`,{
    //         "method": "DELETE",
    //         "headers": {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${this.token}`
    //         }
    //     })

    //     const data = await response.json()
        
    //     return data
    // }

}