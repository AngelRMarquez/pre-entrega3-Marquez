document.addEventListener('DOMContentLoaded', function () {
  const productos = [
    { id: 1, nombre: 'Funda 11 pro', precio: 3.000, imagen: 'img/11-pro.jpg' },
    { id: 2, nombre: 'Funda 12 pro max', precio: 3.500, imagen: 'img/12-pro-max.jpeg' },
    { id: 3, nombre: 'Funda 13 pro', precio: 3.800, imagen: 'img/13-pro.jpeg' },
    { id: 4, nombre: 'Funda 14 pro', precio: 4.000, imagen: 'img/14-pro.png' },
    { id: 5, nombre: 'Funda 15 pro max', precio: 4.800, imagen: 'img/15-pro-max.avif' },
    { id: 6, nombre: 'Airpord 2da Generacion', precio: 20.000, imagen: 'img/airp-2da-gen.jpg' },
    { id: 7, nombre: 'Airpord 3ra Generacion', precio: 30.000, imagen: 'img/airp-3ra-gen.jpg' },
    { id: 8, nombre: 'Cargador Original 5w', precio: 15.000, imagen: 'img/cargador-original-iphone-5w-5v.jpg' },
    { id: 9, nombre: 'Cargador Original 20w', precio: 20.000, imagen: 'img/cargador-original-iphone-20.jpg' },
  ];

  const carrito = [];

  function mostrarProductos() {
    const productList = document.getElementById('product-list');

    productos.forEach(producto => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 100px; max-height: 100px;">
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;

      productList.appendChild(productElement);
    });
  }

  window.agregarAlCarrito = function (id) {
    const selectedProduct = productos.find(producto => producto.id === id);

  
    const existingItem = carrito.find(item => item.id === id);

    if (existingItem) {
      existingItem.cantidad++;
    } else {
      carrito.push({ ...selectedProduct, cantidad: 1 });
    }

    actualizarCarrito();
    calcularTotal();
    console.log(`Producto agregado al carrito: ${selectedProduct.nombre}`);
  };

  function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    carrito.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
      cartItems.appendChild(listItem);
    });
  }

  function calcularTotal() {
    const totalElement = document.getElementById('total');
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalElement.textContent = `Total a pagar: $${total.toFixed(2)}`;
  }

  function realizarPago() {
    const paymentForm = document.getElementById('payment-form');
  paymentForm.style.display = 'block';
  }

  function confirmarPago() {
    const nombre = document.getElementById('nombre').value;
    const tarjeta = document.getElementById('tarjeta').value;
    const vencimiento = document.getElementById('vencimiento').value;
    const cvv = document.getElementById('cvv').value;
  
    console.log('Datos de pago:', nombre, tarjeta, vencimiento, cvv);
  
    const datosPago = {
      nombre,
      tarjeta,
      vencimiento,
      cvv,
      carrito,
    };
  
    localStorage.setItem('datosPago', JSON.stringify(datosPago));
  
    alert('Pago realizado con éxito. Datos guardados localmente.');
    reiniciarCompra();
  }
  

  function reiniciarCompra() {
    carrito.length = 0;
    actualizarCarrito();
    calcularTotal();

    // Ocultar el formulario de pago
    const paymentForm = document.getElementById('payment-form');
    paymentForm.style.display = 'none';
  }

  mostrarProductos();
});
