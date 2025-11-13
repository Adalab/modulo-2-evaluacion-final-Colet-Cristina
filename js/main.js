"use strict";

// SECCIÓN DE QUERY-SELECTOR  ----------------------------------------------------

const productsList = document.querySelector(".js_productsList");
const filterInput = document.querySelector(".js_filterInput");
const filterBtn = document.querySelector(".js_filterBtn");
const cartList = document.querySelector(".js_cartList");
const cartDeleteBtn = document.querySelector(".js_cartDelete");

// SECCIÓN DE DATOS  ----------------------------------------------------
// Variables que creamos para almacenar información

let products = []; // Están guardados los productos del servidor
let cart = []; // Se guardan los productos del carrito

// SECCIÓN DE FUNCIONES  ----------------------------------------------------

// Esta función recibe un producto y devuelve el HTML que lo representa
function renderProductsList(item) {
  const html = `
 <li class="product-item">
  <p> ${item.title}</p>
  <div class="product-img js_productImg">
      <img src="${item.image}" alt="Imagen de ${item.title}">
  </div>
  <p> ${item.price}€</p>
   <button class="add js_add" data-id="${item.id}">add</button>
  </li>`;
  return html;
}

// Esta función recorre TODOS los productos y los pinta en la página
function renderProducts() {
  let html = "";
  //For, recorre el array products
  for (const oneProductsList of products) {
    html += renderProductsList(oneProductsList);
  } // genera el HTML y lo devuelve

  productsList.innerHTML = html; // Muestra todos los productos en la página
}

// Esta función recive la lista FILTRADA
function renderFilteredProducts(filteredList) {
  let html = "";
  for (const product of filteredList) {
    html += renderProductsList(product);
  }
  productsList.innerHTML = html;
}

//  Esta función pinta carrito
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

// SECCIÓN DE FUNCIONES DE EVENTOS  ----------------------------------------------------
// Funciones handler/manejadoras de eventos

//Filtra los productos
const handleFilterClick = (ev) => {
  ev.preventDefault();
  const nameFilter = filterInput.value.toLowerCase().trim();

  // Si el campo está vacío, todos los productos
  if (nameFilter === "") {
    renderProducts(products);
    return;
  }
  // Crea la lista de los productos filtrados
  const filterProducts = products.filter((productObj) => {
    // Devolvemos solo los productos que contengan el texto escrito
    return (
      productObj.title.toLowerCase().includes(nameFilter) ||
      productObj.description.toLowerCase().includes(nameFilter)
    );
  });

  renderFilteredProducts(filterProducts); //Los muestra en la página
};

// SECCIÓN DE EVENTOS  ----------------------------------------------------

// Filtramos productos
filterBtn.addEventListener("click", handleFilterClick);

// Añadimos productos al carrito
productsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("js_add")) {
    const productId = parseInt(event.target.dataset.id);
    const selectedProduct = products.filter((p) => p.id === productId);
    // Busca el producto en la lista principal

    // Añadimos el producto al array del carrito
    cart.push(selectedProduct);

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem("cartData", JSON.stringify(cart));

    // Mostramos el carrito actualizado
    renderCart();
  }
});

// Cambiamos color al botón add
document.addEventListener("click", (event) => {
  // Solo actúa si el clic viene de un botón con clase js_add
  if (event.target.classList.contains("js_add")) {
    const button = event.target;

    // Alterna la clase roja
    button.classList.toggle("add--red");

    //Cambia el texto
    if (button.textContent === "add") {
      button.textContent = "delete";
    } else {
      button.textContent = "add";
    }
  }
});

// Borrar productos del carrito
cartDeleteBtn.addEventListener("click", (ev) => {
  // Vaciamos el array del carrito
  cart = [];
  // Borramos de LS
  localStorage.removeItem("cartData");
  // Mostramos el carrito actualizado
  renderCart();
});

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA ----------------------------------------------------

// Sacamos info del LS:
const dataInLS = JSON.parse(localStorage.getItem("productsBackup"));

if (dataInLS === null) {
  // Pide los datos al servidor si no los trae LS
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      // Guarda los productos en la variable
      products = data;

      // Guardamos en localStorage:
      localStorage.setItem("productsBackup", JSON.stringify(products));

      // Llama a la función que pinta los productos
      renderProducts(products);
    })
    .catch((error) => {}); // Podemos manejar un error si la API falla
} else {
  products = dataInLS;
  renderProducts(products); //Si hay productos guardados se cargan
}
// Cuando cargas la página sigue el carrito guardado en LS
const cartInLS = JSON.parse(localStorage.getItem("cartData"));
if (cartInLS !== null) {
  cart = cartInLS; // Recupera el carrito
  renderCart(); // Lo muestra en la página
}
