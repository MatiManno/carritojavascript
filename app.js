// Variables globales
let productosCarrito = [];
let total = 0;
let productos = []; // Variable global para almacenar la información de los productos

// Función para cargar los productos desde un archivo JSON usando fetch()
function cargarProductos() {
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      productos = data; // Guardar la información de los productos en la variable global
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
  const productoSeleccionado = productos.find(p => p.nombre === producto);

  // Validar que se ingresó una cantidad válida
  if (isNaN(cantidad) || cantidad <= 0) {
    alert('Ingrese una cantidad válida.');
    return;
  }

  // Validar que hay suficientes existencias del producto
  if (cantidad > productoSeleccionado.stock) {
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
  const precio = productoSeleccionado.precio;
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
  const productoSeleccionado = productos.find(p => p.nombre === productoEliminado.producto);
  const precio = productoSeleccionado.precio;
  const cantidad = productoEliminado.cantidad;
  total -= precio * cantidad;
  calcularTotal();
}

// Función para calcular el total del carrito
function calcularTotal() {
  const totalElement = document.getElementById('total');
  totalElement.innerHTML = `${total.toFixed(2)}`;
  }
  
  // Función para vaciar el carrito
  function vaciarCarrito() {
  // Vaciar el arreglo de productos del carrito y resetear el total
  productosCarrito = [];
  total = 0;
  
  // Actualizar el HTML
  const carrito = document.getElementById('carrito');
  carrito.innerHTML = '';
  calcularTotal();
  }
  
  // Llamada a la función para cargar los productos al cargar la página
  cargarProductos();
