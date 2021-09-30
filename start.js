//navbar responsive//
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

//búsqueda//

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

//declaro los productos//
let products = [
    {
        name: "LUCARIO TEE",
        tag: "lucario",
        price: 15.99,
        inCart: 0
    },
    {
        name: "MEWTWO TEE",
        tag: "mewtwo",
        price: 15.99,
        inCart: 0
    },
    {
        name: "VENASAUR TEE",
        tag: "venasaur",
        price: 15.99,
        inCart: 0
    },
    {
        name: "ZAPDOS TEE",
        tag: "zapdos",
        price: 20.99,
        inCart: 0
    },
    {
        name: "BLASTOISE TEE",
        tag: "blastoise",
        price: 20.99,
        inCart: 0
    },
    {
        name: "GENGAR TEE",
        tag: "gengar",
        price: 20.99,
        inCart: 0
    },
    {
        name: "JIGLYPUFF TEE",
        tag: "jigly",
        price: 20.99,
        inCart: 0
    },
    {
        name: "HAUNTER TEE",
        tag: "haunter",
        price: 20.99,
        inCart: 0
    },
    {
        name: "MEOWTH TEE",
        tag: "meowth",
        price: 20.99,
        inCart: 0
    },
    {
        name: "PIKACHU TEE",
        tag: "pikachu",
        price: 20.99,
        inCart: 0
    }
];


//llamo a los botones del carrito a través del query//
let carts = document.querySelectorAll('.btn');


//loop que encasilla a todos los productos y los añade al carrito//
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener("click", () => {
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

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price)
    }
}


//Carrito: Display de imágenes, precio, cantidad y total//
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".almacenamiento");

    if(cartItems && productContainer){
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
            <div class="propductos">
            <i class="far fa-times-circle"></i>
            <img class="tees" src="img/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="pricePP">${item.price}</div>
            <div class="quantity>
            <i class="fas fa-arrow-alt-circle-left"></i>
            <span>${item.inCart}</span>
            <i class="fas fa-arrow-alt-circle-right"></i>
            </div>
            <div class="total">$${item.inCart * item.price}</div>
            `
        })

    }
}

loadcartNumbers();
displayCart();

//VENTANA POP UP GRACIAS POR SU COMPRA//

const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});