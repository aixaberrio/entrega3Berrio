document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const formulario = document.getElementById("form");

  const renderProducts = (arrayProducts) => {
    const containerProducts = document.getElementById("containerProducts");

    if (containerProducts) {
      containerProducts.innerHTML = "";
      arrayProducts.forEach((product) => {
        let productCard = document.createElement("div");
        productCard.innerHTML = `
          <img src="${product.image}" alt="Product Image" />
          <h2>${product.title}</h2>
          <h3>${product.price} USD</h3>
          <button onclick="agregarAlCarrito('${product.id}')">Agregar al Carrito</button>`;
        productCard.className = "card";
        containerProducts.appendChild(productCard);
      });
    } else {
      console.error('No se encontró el elemento con id "containerProducts"');
    }
  };

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let productTitle = document.getElementById("title").value;
    let productCategory = document.getElementById("category").value;
    let productPrice = document.getElementById("price").value;

    if (productTitle && productCategory && productPrice) {
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
      renderProducts(products);
      formulario.reset();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });

  renderProducts(products);
});

function agregarAlCarrito(productId) {
  console.log(`Producto con ID ${productId} agregado al carrito.`);
}
