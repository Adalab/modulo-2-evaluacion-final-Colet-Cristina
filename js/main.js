"use strict";

// SECCIÓN DE QUERY-SELECTOR  =================================================

const productsList = document.querySelector(".js_productsList");
const filterInput = document.querySelector(".js_filterInput");
const filterBtn = document.querySelector(".js_filterBtn");
const cartList = document.querySelector(".js_cartList");
const cartDeleteBtn = document.querySelector(".js_cartDelete");
const numberProducts = document.querySelector(".js_numberProducts");
const scrollTopBtn = document.querySelector(".js_scrollTop");

// SECCIÓN DE DATOS  ==========================================================
// Variables que creamos para almacenar información

let products = []; // Guarda los productos del servidor
let cart = []; // Guarda los  productos del carrito

// SECCIÓN DE FUNCIONES DE PINTADO (RENDER)  ======================================================

function updateCartCounter() {
  if (numberProducts) {
    numberProducts.innerHTML = cart.length;
  }
}

// Esta función recibe un producto y devuelve el HTML que lo representa( interpolación)
function renderProductsList(item) {
  const productImage = item.image || "./images/undefined.png";

  // Usamos .find() para ver si el id del producto existe en nuestro array 'cart'
  const isSelected = cart.find((cartItem) => cartItem.id === item.id);

  // Definimos la clase y el texto
  // Si existe (isSelected no es undefined), ponemos la clase roja y el texto 'delete'
  const buttonClass = isSelected ? "add add--red" : "add";
  const buttonText = isSelected ? "delete" : "add";

  const html = `
 <li class="product-item">
  <p> ${item.title}</p>
  <div class="product-img js_productImg">
      <img src="${productImage}" alt="Imagen de ${item.title}">
  </div>
  <p class= "category js_category"> ${item.category}</p>
  <p> ${item.price}€</p>
   <button class="${buttonClass} js_add" data-id="${item.id}">${buttonText}</button>
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
<li class="cart-item">
      <div class="cart-item-info">
        <p>${item.title}</p>
        <div class="product-img js_productImg">
          <img src="${item.image || "./images/undefined.png"}" alt="${item.title}">
        </div>
        <p>${item.price}€</p>
      </div>
      <button class="cart-item-remove js_removeSingle" data-id="${item.id}">X</button>
    </li>`;
  }
  cartList.innerHTML = html;
}

// SECCIÓN DE FUNCIONES MANEJADORAS (HANDLERS)  ==================================================

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

// SECCIÓN DE EVENTOS (LISTENERS)  ==================================================

// Filtramos productos
filterBtn.addEventListener("click", handleFilterClick);

// Añadimos productos al carrito
productsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("js_add")) {
    const productId = parseInt(event.target.dataset.id);

    // Buscamos si el producto está en el carrito
    const indexInCart = cart.findIndex((item) => item.id === productId);

    if (indexInCart === -1) {
      // SI NO ESTÁ: Lo buscamos en la lista original y lo añadimos
      const selectedProduct = products.find((p) => p.id === productId);
      cart.push(selectedProduct);
    } else {
      // SI YA ESTÁ: Lo quitamos del array usando su índice
      cart.splice(indexInCart, 1);
    }
    // Guardamos el carrito actualizado
    localStorage.setItem("cartData", JSON.stringify(cart));

    // Re-pintar productos, la función renderProductsList
    renderProducts();
    renderCart();
    updateCartCounter();
  }
});
// Borrar producto individual con la "X"
cartList.addEventListener("click", (event) => {
  // Comprobamos si el clic fue en el botón de la "X"
  if (event.target.classList.contains("js_removeSingle")) {
    const productId = parseInt(event.target.dataset.id);

    // Filtramos el carrito: nos quedamos con todo MENOS con el ID clicado
    cart = cart.filter((item) => item.id !== productId);

    // Actualizamos LocalStorage y volvemos a pintar
    localStorage.setItem("cartData", JSON.stringify(cart));

    renderCart();
    renderProducts(); // Importante para que el botón de la lista principal vuelva a decir "add"
    updateCartCounter();
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
  renderProducts();
  updateCartCounter();
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Desplazamiento suave
  });
});

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA ==================================================

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
  updateCartCounter();
}
