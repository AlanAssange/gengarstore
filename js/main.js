//navbar responsive//
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

//objeto del día//

let constructorObject = document.querySelector("#rawunique");


class Pokemon {
    constructor(name, price, inCarts) {
        this.name = name;
        this.price = parseFloat(price);
        this.inCart = inCarts;
    }
}

const mewtwotee = new Pokemon ("Mewtwo Tee", 20.99, "Scroll debajo para comprar!")

constructorObject.innerHTML +=`
            
<p>${mewtwotee.name}</p>

`
