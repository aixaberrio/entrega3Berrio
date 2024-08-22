let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

let containerCarrito = document.getElementById("containerCarrito");

const renderProducts = (products) => {
  containerCarrito.innerHTML = "";
  products.forEach((product) => {
    let productCard = document.createElement("div");
    productCard.innerHTML = `
      <img src="${product.image}" />
      <h2>${product.title}</h2>
      <h3>${product.price} USD</h3>
      <div class="containerButtonCarrito"><button onclick="restarDelCarrito('${product.id}')">-</button>
      <p>Cantidad = ${product.quanty}</p>
      <button onclick="sumarDelCarrito('${product.id}')">+</button></div>
      <button onclick="eliminarDelCarrito('${product.id}')">Eliminar</button>`;
    productCard.className = "card";
    containerCarrito.appendChild(productCard);
  });
};

renderProducts(carrito);

const eliminarDelCarrito = (id) => {
  Swal.fire({
    title: "Estas seguro de eliminar el producto del carrito?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Eliminar",
    denyButtonText: "No eliminar",
    icon: "warning",
  }).then((res) => {
    if (res.isConfirmed) {
      carrito = carrito.filter((elemento) => elemento.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderProducts(carrito);
      Swal.fire({ title: "Eliminado", timer: 3000, icon: "success" });
    } else if (res.isDenied) {
      Swal.fire({ title: "No se elimino", timer: 3000, icon: "info" });
    }
  });
};

const restarDelCarrito = (id) => {
  let productEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productEncontrado && productEncontrado.quanty > 1) {
    productEncontrado.quanty -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
  } else if (productEncontrado && productEncontrado.quanty === 1) {
    eliminarDelCarrito(productEncontrado.id);
  }
};
const sumarDelCarrito = (id) => {
  let productEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productEncontrado) {
    productEncontrado.quanty += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
  }
};

renderProducts(carrito);
