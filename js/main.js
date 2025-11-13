"use strict";

// SECCIÓN DE QUERY-SELECTOR

const productsList = document.querySelector(".js_productsList");
const filterInput = document.querySelector(".js_filterInput");
const filterBtn = document.querySelector(".js_filterBtn");
const cartList = document.querySelector(".js_cartList");
const cartDeleteBtn = document.querySelector(".js_cartDelete");

//SECCIÓN DE DATOS
//variables que creamos para almacenan información

let products = []; // estan guardados los productos del servidor
let cart = []; // se guardados los productos del carrito

// SECCIÓN DE FUNCIONES

// Función que recibe un producto y devuelve el HTML que lo representa
function renderProductsList(item) {
  const html = `
 <li class="product-item">
  <p> ${item.title}</p>
  <div class="product-img js_productImg">
      <img src="${item.image}" alt="Imagen de ${item.title}">
  </div>
  <p> ${item.price}€</p>
   <button class="add js_add"data-id="${item.id}">add</button>
  </li>`;
  return html;
}

// Función que recorre todos los productos y los pinta en la página
function renderProducts() {
  let html = "";
  for (const oneProductsList of products) {
    html += renderProductsList(oneProductsList);
  } //genera el html y lo devuelve

  productsList.innerHTML = html;
}

// Esta función pinta los productos filtrados
function renderFilteredProducts(filteredList) {
  let html = "";
  for (const product of filteredList) {
    html += renderProductsList(product);
  }
  productsList.innerHTML = html;
}

// Pintar carrito
function renderCart() {
  let html = "";
  for (const item of cart) {
    html += `
<p> ${item.title}</p>
  <div class="product-img js_productImg">
      <img src="${item.image}" alt="Imagen de ${item.title}">
  </div>
  <p> ${item.price}€</p>`;
  }
  cartList.innerHTML = html;
}

// SECCIÓN DE FUNCIONES DE EVENTOS
// Funciones handler/manejadoras de eventos

const handleFilterClick = (ev) => {
  ev.preventDefault();
  const nameFilter = filterInput.value.toLowerCase().trim();

  //Si el campo esta vacio, todos los productos
  if (nameFilter === "") {
    renderProducts(products);
    return;
  }

  const filterProducts = products.filter((productObj) => {
    // Devolvemos solo los productos que contengan el texto escrito
    return (
      productObj.title.toLowerCase().includes(nameFilter) ||
      productObj.description.toLowerCase().includes(nameFilter)
    );
  });

  renderFilteredProducts(filterProducts);
};

// SECCIÓN DE EVENTOS

//filtramos productos
filterBtn.addEventListener("click", handleFilterClick);

//Añadimos productos al carrito
productsList.addEventListener("click", (event) => {
  //Si pulsa el botón se genera el código
  if (event.target.classList.contains("js_add")) {
    const productId = parseInt(event.target.dataset.id);
    const selectedProduct = products.find((p) => p.id === productId); // Lo buscamos en "products"

    // Añadimos el producto al carrito
    cart.push(selectedProduct);

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem("cartData", JSON.stringify(cart));

    // Mostramos el carrito actualizado
    renderCart();
  }
});

// Borrar productos del carrito
cartDeleteBtn.addEventListener("click", (ev) => {
  // Vaciamos el array del carrito
  cart = [];
  //Borramos de LS
  localStorage.removeItem("cartData");
  // Mostramos el carrito actualizado
  renderCart();
});

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA

// Sacamos info del LS:
const dataInLS = JSON.parse(localStorage.getItem("productsBackup"));

if (dataInLS === null) {
  // Pedir los datos al servidor
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      // Guarda los productos en la variable
      products = data;

      //Guardamos en localstorage:
      localStorage.setItem("productsBackup", JSON.stringify(products));

      // Llama a la función que pinta los productos
      renderProducts(products);
    })
    .catch((error) => {});
} else {
  products = dataInLS;
  renderProducts(products);
}
// Cuando cargas la pagina sige el carrito guadado en LS
const cartInLS = JSON.parse(localStorage.getItem("cartData"));
if (cartInLS !== null) {
  cart = cartInLS;
  renderCart();
}
