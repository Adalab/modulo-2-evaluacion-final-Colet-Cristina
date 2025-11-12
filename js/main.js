"use strict";

// SECCIÓN DE QUERY-SELECTOR

const productsList = document.querySelector(".js_productsList");
const filterInput = document.querySelector(".js_filterInput");
const filterBtn = document.querySelector(".js_filterBtn");

//SECCIÓN DE DATOS

let products = [];

// SECCIÓN DE FUNCIONES

function renderProductsList(item) {
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
    html += renderProductsList(oneProductsList);
  }

  productsList.innerHTML = html;
}

function renderFilteredProducts(filteredList) {
  let html = "";
  for (const product of filteredList) {
    html += renderProductsList(product);
  }
  productsList.innerHTML = html;
}

// SECCIÓN DE FUNCIONES DE EVENTOS

const handleFilterClick = (ev) => {
  ev.preventDefault();
  const nameFilter = filterInput.value;
  console.log(nameFilter);

  if (nameFilter === "") {
    renderProducts(products);
    return;
  }

  const filterProducts = products.filter((productObj) => {
    return (
      productObj.title.toLowerCase().includes(nameFilter) ||
      productObj.category.toLowerCase().includes(nameFilter) ||
      productObj.description.toLowerCase().includes(nameFilter)
    );
  });

  renderFilteredProducts(filterProducts);
};

// SECCIÓN DE EVENTOS

filterBtn.addEventListener("click", handleFilterClick);

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA

const dataInLS = JSON.parse(localStorage.getItem("productsBackup"));
console.log("dataInSL", dataInLS);

if (dataInLS === null) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      products = data;

      localStorage.setItem("productsBackup", JSON.stringify(products));

      renderProducts(products);
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
    });
} else {
  products = dataInLS;
  renderProducts(products);
}
