const jsonUrl = './js/productos.json';
const productosContainer = document.querySelector('.productos');
const filtroTipo = document.getElementById('filtroTipo');
const carritoCantidad = document.getElementById('carritoCantidad');
const carritoBtn = document.getElementById('verCarritoBtn');

document.addEventListener('DOMContentLoaded', () => {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
        function actualizarStock() {
          carrito.forEach(item => {
            const productoIndex = data.findIndex(p => p.id === item.id);
            if (productoIndex !== -1) {
              data[productoIndex].stock -= item.cantidad;
            }
          });
        }
  
        function mostrarProductos(filtro = 'all') {
          productosContainer.innerHTML = '';

          const productosFiltrados = filtro === 'all' ? data : data.filter(producto => producto.tipo === filtro);
  
          //Crear un ciclo que genere dinámicamente una
          //lista de productos disponibles y los muestre en la consola
          console.log({productosFiltrados});

          productosFiltrados.forEach(producto => {
            const productoEnCarrito = carrito.find(item => item.id === producto.id);
            const stockDisponible = producto.stock - (productoEnCarrito ? productoEnCarrito.cantidad : 0);
            const botonAgregar = stockDisponible > 0 ? `<button class="agregarCarrito" data-id="${producto.id}" data-stock="${stockDisponible}" data-precio="${producto.precio}" data-titulo="${producto.titulo}">Agregar al carrito</button>` : `<button class="agotado" disabled>Producto agotado</button>`;
            const botonReseñas = `<button class="verResenas" data-id="${producto.id}">Ver reseñas</button>`;

            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
              <img src="${producto.imagen}" alt="${producto.titulo}">
              <h2>${producto.titulo}</h2>
              <p>${producto.descripcion}</p>
              <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
              <p><strong>Stock:</strong> ${stockDisponible}</p>
              ${botonAgregar}
              ${botonReseñas}
            `;
                        
            productosContainer.appendChild(productoDiv);

            const verReseñasBtn = productoDiv.querySelector('.verResenas');
            verReseñasBtn.addEventListener('click', (e) => {
                const idProducto = e.target.dataset.id;
                window.location.href = `./resenas.html?productoId=${idProducto}`;
            });            
          });
  
          const botonesAgregar = document.querySelectorAll('.agregarCarrito');
          botonesAgregar.forEach(boton => {
            boton.addEventListener('click', (e) => {
              const id = e.target.dataset.id;
              const titulo = e.target.dataset.titulo;
              const stock = parseInt(e.target.dataset.stock);
              const precio = parseFloat(e.target.dataset.precio);
              const boton = e.target;
  
              if (stock > 0) {
                const productoEnCarrito = carrito.find(item => item.id === id);
                if (productoEnCarrito) {
                  if (productoEnCarrito.cantidad < stock) {
                    productoEnCarrito.cantidad++;
                  } else {
                    alert("No hay suficiente stock de este producto.");
                  }
                } else {
                  carrito.push({
                    id: id,
                    titulo: titulo,
                    cantidad: 1,
                    precio: precio,
                    stock: stock
                  });
                }
  
                localStorage.setItem('carrito', JSON.stringify(carrito));
  
                const productoIndex = data.findIndex(p => p.id === id);
                if (productoIndex !== -1) {
                  data[productoIndex].stock--; // Restamos 1 al stock
                }
  
                mostrarProductos(filtro);
                actualizarCantidadCarrito();
              } else {
                boton.textContent = 'Producto agotado';
                boton.disabled = true;
                setTimeout(() => {
                  boton.textContent = 'Agregar al carrito';
                  boton.disabled = false;
                }, 3000);
              }
            });
          });
        }
  
          mostrarProductos();
  
        filtroTipo.addEventListener('change', (e) => {
          mostrarProductos(e.target.value);
        });
  
        function actualizarCantidadCarrito() {
          const cantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
          carritoCantidad.textContent = cantidad;
        }
  
        const carritoBtn = document.getElementById('carritoBtn');
        carritoBtn.addEventListener('click', () => {
          window.location.href = './carrito.html';
        });
  
        function vaciarCarrito() {
          carrito = [];
          localStorage.setItem('carrito', JSON.stringify(carrito));
          alert('El carrito ha sido vaciado.');
          actualizarCantidadCarrito();
          mostrarProductos();
        }
    
        actualizarCantidadCarrito();
        actualizarStock();
      })
      .catch(error => {
        console.error('Error al cargar los productos:', error);
      });
  });
  