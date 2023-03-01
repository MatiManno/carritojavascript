const productList = document.querySelector('.product-list');
const clearCartBtn = document.querySelector('.clear-cart');
const checkoutBtn = document.querySelector('.checkout');

let cart = [];

fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product');

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      div.appendChild(img);

      const name = document.createElement('h3');
      name.textContent = product.name;
      div.appendChild(name);

      const description = document.createElement('p');
      description.textContent = product.description;
      div.appendChild(description);

      const price = document.createElement('span');
      price.textContent = '$' + product.price;
      div.appendChild(price);

      const addBtn = document.createElement('button');
      addBtn.classList.add('add-to-cart');
      addBtn.textContent = 'Agregar al carrito';
      addBtn.addEventListener('click', () => {
        addToCart(product);
      });
      div.appendChild(addBtn);

      productList.appendChild(div);
    });
  });

function addToCart(product) {
  cart.push(product);
  Toastify({
    text: `El producto ${product.name} se ha agregado al carrito.`,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    backgroundColor: '#6c757d',
    stopOnFocus: true,
  }).showToast();
}

clearCartBtn.addEventListener('click', () => {
  cart = [];
  Toastify({
    text: 'El carrito ha sido vaciado.',
    duration: 3000,
    gravity: 'top',
    position: 'right',
    backgroundColor: '#6c757d',
    stopOnFocus: true,
  }).showToast();
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      Toastify({
        text: 'Pedido realizado con éxito.',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#28a745',
        stopOnFocus: true,
      }).showToast();
      cart = [];
    } else {
      Toastify({
        text: 'El carrito está vacío.',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#6c757d',
        stopOnFocus: true,
      }).showToast();
    }
  });
