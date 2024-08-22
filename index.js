document.addEventListener("DOMContentLoaded", () => {
  let predefinedProducts = [];
  let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let products = [];

  const renderProducts = (arrayProducts) => {
    const containerProducts = document.getElementById("containerProducts");
    containerProducts.innerHTML = "";
    arrayProducts.forEach((product) => {
      let productCard = document.createElement("div");
      productCard.innerHTML = `
          <img src="${product.image}" />
          <h2>${product.title}</h2>
          <h3>${product.price} USD</h3>
          <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>`;
      productCard.className = "card";
      containerProducts.appendChild(productCard);
    });

    // Agregar los event listeners para todos los botones de "Agregar al Carrito"
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        agregarAlCarrito(button.dataset.id);
      });
    });
  };

  const agregarAlCarrito = (id) => {
    let product = products.find((elemento) => elemento.id === id);
    let productEnElCarrito = carrito.find((elemento) => elemento.id === id);
    if (productEnElCarrito) {
      productEnElCarrito.quanty += 1;
      Toastify({
        text: "Agregaste 1 más al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, black, grey)",
        },
      }).showToast();
    } else {
      carrito.push({ ...product, quanty: 1 });
      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, black, grey)",
        },
      }).showToast();
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const inputSearch = document.getElementById("search");
  if (inputSearch) {
    inputSearch.addEventListener("input", (event) => {
      let value = event.target.value.toLowerCase();
      let arrayFiltrado = products.filter((product) =>
        product.title.toLowerCase().includes(value)
      );
      renderProducts(arrayFiltrado);
    });
  }

  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      predefinedProducts = data;
      products = [...predefinedProducts, ...storedProducts];
      renderProducts(products);
    })
    .catch((error) => console.error("Error al cargar los productos:", error));
});
