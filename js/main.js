"use strict";

"use strict";

// SECCIÓN DE QUERY-SELECTOR

const productsList = document.querySelector(".js_productsList");

//SECCIÓN DE DATOS

let products = [];

// SECCIÓN DE FUNCIONES

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
function renderProducts() {
  let html = "";
  for (const oneProductsList of products) {
    html += remderProductsList(oneProductsList);
  }

  productsList.innerHTML = html;
}

// SECCIÓN DE EVENTOS

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    renderProducts();
  })
  .catch((error) => {
    console.error("Error al cargar productos:", error);
  });

renderProducts(products);
console.log("Página y JS cargados!");
