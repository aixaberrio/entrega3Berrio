document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let contador = products.length + 1;
  const formulario = document.getElementById("form");

  let inputTitle = document.getElementById("title");
  let productTitle = "";
  inputTitle.addEventListener("input", () => {
    productTitle = inputTitle.value;
  });

  let inputCategory = document.getElementById("category");
  let productCategory = "";
  inputCategory.addEventListener("input", () => {
    productCategory = inputCategory.value;
  });

  let inputPrice = document.getElementById("price");
  let productPrice = "";
  inputPrice.addEventListener("input", () => {
    productPrice = inputPrice.value;
  });

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

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    let product = {
      id: (products.length + 1).toString(),
      title: productTitle,
      price: Number(productPrice),
      category: productCategory,
      image: "resources/auto.jpg",
      description: "-",
      rating: { rate: 0, count: 0 },
    };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    formulario.reset();
    renderProducts(products);
  });
  renderProducts(products);
});
