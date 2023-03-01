// Declaración de variables
let carrito = [];

// Función para cargar los productos desde un archivo JSON
async function cargarProductos() {
  const response = await fetch('products.json');
  const productos = await response.json();
  mostrarProductos(productos);
}

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
  const productosContainer = document.getElementById('productos-container');
  productosContainer.innerHTML = '';
  productos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
      <img src="${producto.foto}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="precio">$${producto.precio}</p>
      <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    productosContainer.appendChild(div);
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ id: id, cantidad: 1 });
  }
  actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
  const carritoContainer = document.getElementById('carrito-container');
  const carritoItems = document.getElementById('carrito-items');
  const carritoPrecioTotal = document.getElementById('carrito-precio-total');
  carritoItems.innerHTML = '';
  carrito.forEach((producto) => {
    const productoEnCarrito = document.createElement('div');
    productoEnCarrito.classList.add('producto-en-carrito');
    const productoEnLista = productos.find((p) => p.id === producto.id);
    productoEnCarrito.innerHTML = `
      <p>${productoEnLista.nombre} x ${producto.cantidad}</p>
      <p class="precio">$${productoEnLista.precio * producto.cantidad}</p>
      <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${producto.id})">x</button>
    `;
    carritoItems.appendChild(productoEnCarrito);
  });
  carritoPrecioTotal.innerHTML = `$${calcularPrecioTotal()}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  actualizarCarrito();
}

// Función para calcular el precio total del carrito
function calcularPrecioTotal() {
  let precioTotal = 0;
  carrito.forEach((producto) => {
    const productoEnLista = productos.find((p) => p.id === producto.id);
    precioTotal += productoEnLista.precio * producto.cantidad;
  });
  return precioTotal;
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// Función para simular un pedido exitoso
function simularPedido() {
  vaciarCarrito();
  Toastify({
    text: '¡Gracias por tu compra!',
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'bottom',
    position: 'right',
    style: {
      background: '#4CAF50'
    },
    stopOnFocus: true,
  }).showToast();
}

// Carga los productos al cargar la página
window.addEventListener("load", () => {
    loadProducts();
  });
  
  // Función para cargar los productos desde el archivo JSON
  function loadProducts() {
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => {
        showProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // Función para mostrar los productos en el HTML
  function showProducts(data) {
    const productsContainer = document.querySelector(".products-container");
    let output = "";
    data.forEach((product) => {
      output += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="price">$${product.price}</p>
          <button class="btn-add-to-cart" data-id="${product.id}">Agregar al carrito</button>
        </div>
      `;
    });
    productsContainer.innerHTML = output;
  
    // Agregar un listener al botón "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", addToCartClicked);
    });
  }
  
