"use strict";

// SECCIÓN DE QUERY-SELECTOR
// Éstos son los elementos que nos traemos de la página HTML y usamos en el código
const productsList = document.querySelector(".js_productsList");

// SECCIÓN DE FUNCIONES
// Estos son funciones:
//   - con código auxiliar
//   - con código que usaremos en los eventos
//   - para pintar (render) en la página.

function remderProductsList(item) {
  const html = `
 <li class="product-item">
  <p> ${item.title}</p>
  <div class="product-img js_productImg">
      <img src="${item.image}" alt="Mochila azul para portatil">
  </div>
  <h3 class="product-category js_productCategory">${item.category}</h3>
  <p> ${item.price}</p>
  </li>`;
  return html;
}

// SECCIÓN DE EVENTOS
// Estos son los eventos a los que reacciona la página
// Los más comunes son: click (en botones, enlaces), input (en ídem) y submit (en form)

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
// Este código se ejecutará cuando se carga la página
// Lo más común es:
//   - Pedir datos al servidor
//   - Pintar (render) elementos en la página
const item = {
  title: " Mochila Fjallraven Foldsack No. 1, para portátiles de 15 pulgadas ",
  price: 109.95,
  category: " ropa de hombre ",
  image: " https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png ",
};

const html = remderProductsList(item);
productsList.innerHTML = html;

console.log("Página y JS cargados!");
