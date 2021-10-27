//VENTANA POP UP GRACIAS POR SU COMPRA//

const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

modal_container.addEventListener('click', () => {
    //vacío el localStorage y seteo "cartNumbers" a 0 (siempre string)
    localStorage.setItem("productsInCart", "");
    localStorage.setItem("cartNumbers", "0")
    //actualizo el DOM
    loadcartNumbers();

    displayCart();


  });

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});
