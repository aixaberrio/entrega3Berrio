document.addEventListener("DOMContentLoaded", () => {
  const predefinedProducts = [
    {
      id: "1",
      title: "BMW",
      price: 200,
      Category: "Autos",
      image: "./resources/auto.jpg",
      description: "-",
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: "2",
      title: "Nissan",
      price: 500,
      Category: "Camionetas",
      image: "./resources/auto.jpg",
      description: "-",
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: "3",
      title: "Taza",
      price: 100,
      Category: "Repuestos",
      image: "./resources/auto.jpg",
      description: "-",
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: "4",
      title: "Honda",
      price: 600,
      Category: "Autos",
      image: "./resources/auto.jpg",
      description: "-",
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: "5",
      title: "Amarok",
      price: 100,
      Category: "Camionetas",
      image: "./resources/auto.jpg",
      description: "-",
      rating: { rate: 4.5, count: 120 },
    },
    {
      id: "6",
      title: "faro",
      price: 150,
      Category: "Repuestos",
      image: "./resources/auto.jpg",
      description: "-",
      rating: { rate: 4.5, count: 120 },
    },
  ];

  let storedProducts = JSON.parse(localStorage.getItem("products")) || [];

  let products = [...predefinedProducts, ...storedProducts];

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderProducts = (arrayProducts) => {
    const containerProducts = document.getElementById("containerProducts");
    containerProducts.innerHTML = "";
    arrayProducts.forEach((product) => {
      let productCard = document.createElement("div");
      productCard.innerHTML = `
        <img src="${product.image}" />
        <h2>${product.title}</h2>
        <h3>${product.price} USD</h3>
        <button onclick="agregarAlCarrito('${product.id}')">Agregar al Carrito</button>`;
      productCard.className = "card";
      containerProducts.appendChild(productCard);
    });
  };

  renderProducts(products);

  const agregarAlCarrito = (id) => {
    let product = products.find((elemento) => elemento.id === id);
    let productEnElCarrito = carrito.find((elemento) => elemento.id === id);
    if (productEnElCarrito) {
      productEnElCarrito.quanty += 1;
    } else {
      carrito.push({ ...product, quanty: 1 });
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
});

const agregarAlCarrito = (id) => {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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
