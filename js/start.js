

//declaro los productos//
function recupero() {
    let recuperar= JSON.parse(localStorage.getItem('products'))
    if(recuperar){
        recuperar.forEach(el => {
            products.push(el)
        });
    }
}

let products = []

$.getJSON('productos.json', function (data) {
if (!localStorage.getItem("products")){
    //Si no tengo productos en localStorage, los seteo, sino directamente los agarro sin setear
    localStorage.setItem('products', JSON.stringify(data))
     }
    recupero()
})

//llamo a los botones del carrito a través del query//
let carts = document.querySelectorAll('.btn');


//loop que encasilla a todos los productos y los añade al carrito//
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener("click", () => {
        event.preventDefault()
        cartNumbers(products[i])
        totalCost(products[i])
    })
}


//función de carga//

function loadcartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if(productNumbers){
        document.querySelector(".cartn").textContent = productNumbers;     
    }
}

//función almacenadora de números (localstorage) //

function cartNumbers(product){
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem("cartNumbers", productNumbers + 1)
        document.querySelector(".cartn").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers",1);
        document.querySelector(".cartn").textContent = 1;
    }

    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
console.log(cartItems)
    if(cartItems != null){

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart =1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//calculo el costo final, luego se verá en la consola.

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price)
    }
}

function removeElementFromCart(tag){
//  localStorage solo admite datos de tipo string, por lo tanto, para manipularlos en JS necesito "parsearlos" a objetos (JSON.parse)
   let productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
// mediante delete borramos propiedades del objeto productsInCart, usando bracket notation, accedemos dinámicamente a las propiedades del objeto. productsInCart.tag intentaría buscar una propiedad "tag" dentro del objeto
   delete productsInCart[tag] 
// seteamos el localStorage, el objeto actualizado sin la propiedad que coincide con el parámetro de la función (tag) pasándolo a string mediante JSON.stringify
   localStorage.setItem("productsInCart",JSON.stringify(productsInCart))
//seteamos el localStorage correspondiente a la cantidad de objetos en el carrito que coincide con el largo de entradas del objeto productsInCart. Para esto, procedemos a transformar el objeto del localStorage con JSON.parse mediante Object.entries a un array y luego obtenemos el largo mediante lenght.    
   localStorage.setItem("cartNumbers", `${Object.entries(JSON.parse(localStorage.getItem("productsInCart"))).length}`)
 // Mediante Jquery selecciono el nodo con "id=tag" y lo remuevo del DOM.  
   $(`#${tag}`).remove()

 //actualizo el nodo correspondiente a los items en el carrito   

   loadcartNumbers();
}

//Carrito: Display de imágenes, precio, cantidad y total//
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
    }
    let productContainer = document.querySelector(".almacenamiento");
    let cartCost = localStorage.getItem("totalCost");

    if(cartItems && productContainer){
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
            
            <div class="propductos" id="${item.tag}">
            <i class="far fa-times-circle remove-button" id="${item.tag}"></i>
            <img class="tees" src="img/${item.tag}.jpg">
            <span>${item.name}</span>
            <div class="pricePP" id="marginflex">${item.price}</div>
            <i class="fas fa-bahai" id="marginflex"></i>
            <span id="marginflex">${item.inCart}</span>
            <div class="total" id="marginflex">$${item.inCart * item.price}</div>
            </div>
            `
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer>
            <h4 class="basketTotalTitle>
                Cart Total:
            </h4>
            <h4 class="basketTotal">
            $${cartCost}
            </h4>
        `

    }else if(productContainer) productContainer.innerHTML = "";
}

loadcartNumbers();
displayCart();



//Agrego event listeners a cada uno de los botones definidos por el id "remove" y llamo a la función que los remueve pasandole como parámetro el id correspondiente al nodo. 
const removeButtonlist = Array.from(document.querySelectorAll(".remove-button")) 
removeButtonlist.forEach((button)=>button.addEventListener("click",()=>{removeElementFromCart(button.getAttribute("id"))}))



//constructora objeto del día//
class ProductoDelDia {
    constructor(name, tag) {
        this.name = name;
        this.tag = tag;
    }
}
function createProductofTheDay (producto) {
    if(!producto)return
    const item = new ProductoDelDia(producto.name, producto.tag);
    document.getElementById("rowunique").innerHTML=`
    <h3 id="product-of-the-day">El objeto del día de hoy es:</h3>
    <h4>${item.name}</h4>
    <img class="tees" id="tees" src="img/${item.tag}.jpg">

    `


}

createProductofTheDay($.getJSON('productos.json'))
const random = Math.round(Math.random()*10)

$.getJSON( "productos.json", function( json ) {
    const randomProduct = json[random]
    createProductofTheDay(randomProduct);
 
   });