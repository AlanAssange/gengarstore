//navbar responsive//
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

//objeto del día//

let constructorObject = document.querySelector("#rawunique");




constructorObject.innerHTML +=`
            
<p>${mewtwotee.name}</p>

`
