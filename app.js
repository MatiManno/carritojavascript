// Variables globales
let productosCarrito = [];
let total = 0;

// Función para cargar los productos desde un archivo JSON usando fetch()
function cargarProductos() {
  fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
      // Crear las opciones para el select de productos
      const selectProducto = document.getElementById('producto');
      productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.nombre;
        option.text = producto.nombre;
        selectProducto.add(option);
      });
    });
}

// Función para agregar un producto al carrito
function agregarProducto() {
  const producto = document.getElementById('producto').value;
  const cantidad = Number(document.getElementById('cantidad').value);
  const productos = productosCarrito.filter(p => p.producto === producto);

  // Validar que se ingresó una cantidad válida
  if (isNaN(cantidad) || cantidad <= 0) {
    alert('Ingrese una cantidad válida.');
    return;
  }

  // Validar que hay suficientes existencias del producto
  const stock = productos.length > 0 ? productos[0].stock : 0;
  if (cantidad > stock) {
    alert(`No hay suficientes existencias de ${producto}.`);
    return;
  }

  // Agregar el producto al carrito
  const productoCarrito = {producto, cantidad};
  productosCarrito.push(productoCarrito);

  // Actualizar el HTML
  const carrito = document.getElementById('carrito');
  const li = document.createElement('li');
  li.innerHTML = `${productoCarrito.producto} - ${productoCarrito.cantidad}`;
  carrito.appendChild(li);

  // Calcular el total
  const precio = productos[0].precio;
  total += precio * cantidad;
  calcularTotal();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  // Eliminar el producto del carrito
  const productoEliminado = productosCarrito.splice(index, 1)[0];

  // Actualizar el HTML
  const carrito = document.getElementById('carrito');
  const li = carrito.getElementsByTagName('li')[index];
  carrito.removeChild(li);

  // Restar el precio del producto eliminado del total
  const productos = productosCarrito.filter(p => p.producto === productoEliminado.producto);
  const precio = productos[0].precio;
  const cantidad = productoEliminado.cantidad;
  total -= precio * cantidad;
  calcularTotal();
}

// Función para calcular el total de la compra
function calcularTotal() {
  const totalElement = document.getElementById('total');
  totalElement.innerHTML = `$${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function vaciarCarrito() {
  // Vaciar el arreglo de productos
  productosCarrito = [];

  // Actualizar el HTML
  const carrito = document.getElementById('carrito');
  while (carrito.firstChild) {
    carrito.removeChild(carrito.firstChild);
  }

  // Reiniciar el total
  total = 0;
  calcularTotal();
}

// Cargar los productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductos);
