document.addEventListener('DOMContentLoaded', function () {
  const productos = [
    { id: 1, nombre: 'Funda 11 pro', precio: 3000, imagen: 'img/11-pro.jpg' },
    { id: 2, nombre: 'Funda 12 pro max', precio: 3500, imagen: 'img/12-pro-max.jpeg' },
    { id: 3, nombre: 'Funda 13 pro', precio: 3800, imagen: 'img/13-pro.jpeg' },
    { id: 4, nombre: 'Funda 14 pro', precio: 4000, imagen: 'img/14-pro.png' },
    { id: 5, nombre: 'Funda 15 pro max', precio: 4800, imagen: 'img/15-pro-max.avif' },
    { id: 6, nombre: 'Airpods 2da Generación', precio: 20000, imagen: 'img/airp-2da-gen.jpg' },
    { id: 7, nombre: 'Airpods 3ra Generación', precio: 30000, imagen: 'img/airp-3ra-gen.jpg' },
    { id: 8, nombre: 'Cargador Original 5w', precio: 15000, imagen: 'img/cargador-original-iphone-5w-5v.jpg' },
    { id: 9, nombre: 'Cargador Original 20w', precio: 20000, imagen: 'img/cargador-original-iphone-20.jpg' },
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

    if (cartItems) {
      cartItems.innerHTML = '';

      carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
        cartItems.appendChild(listItem);
      });
    }
  }

  function calcularTotal() {
    const totalElement = document.getElementById('total');

    if (totalElement) {
      const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
      totalElement.textContent = `Total a pagar: $${total.toFixed(2)}`;
    }
  }
  document.getElementById('btnPagar').addEventListener('click', realizarPago);

  function realizarPago() {
    const paymentForm = document.getElementById('payment-form');
  
    if (paymentForm) {
      paymentForm.style.display = 'block';
    }
  }
  
  document.getElementById('btnConfirmarPago').addEventListener('click', confirmarPago);
  
  function confirmarPago() {
    const nombre = document.getElementById('nombre_pago').value;
    const tarjeta = document.getElementById('tarjeta_pago').value;
    const vencimiento = document.getElementById('vencimiento_pago').value;
    const cvv = document.getElementById('cvv_pago').value;
  
    // Validación básica
    if (!nombre || !tarjeta || !vencimiento || !cvv) {
      console.error('Por favor, complete todos los campos antes de confirmar el pago.');
      return;
    }
  
    // console.log('Datos de pago:', nombre, tarjeta, vencimiento, cvv);
  
    const datosPago = {
      nombre,
      tarjeta,
      vencimiento,
      cvv,
      carrito,
    };
  
    localStorage.setItem('datosPago', JSON.stringify(datosPago));
  
    // console.log(`Pago realizado con éxito. Los datos de ${nombre} han sido guardados localmente.`);
    reiniciarCompra();
  }
  

  function reiniciarCompra() {
    carrito.length = 0;
    actualizarCarrito();
    calcularTotal();

    // Ocultar el formulario de pago
    const paymentForm = document.getElementById('payment-form');

    if (paymentForm) {
      paymentForm.style.display = 'none';
    }

    // Mostrar datos almacenados en localStorage
    mostrarDatosGuardados();
  }

  function mostrarDatosGuardados() {
    const datosGuardados = localStorage.getItem('datosPago');

    if (datosGuardados) {
      console.log('Datos almacenados en localStorage:', JSON.parse(datosGuardados));
    }
  }

  // Mostrar productos al cargar la página
  mostrarProductos();
});
