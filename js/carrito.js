document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContenido = document.getElementById('carritoContenido');
    const totalCarritoMonto = document.getElementById('totalCarritoMonto');
    const pagarBtn = document.getElementById('pagarBtn');
    const datosPago = document.getElementById("datosPago");
    
    const vaciarCarritoBtn = document.getElementById('vaciarCarritoBtn');
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>No tienes productos en el carrito.</p>';
        pagarBtn.disabled = true;
        datosPago.style.display = 'none';
        return;
    }

    function vaciarCarrito() {
        let carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('El carrito ha sido vaciado.');
        carritoContenido.innerHTML = '<p>No tienes productos en el carrito.</p>';
        totalCarritoMonto.textContent = '0.00';
        pagarBtn.disabled = true;
        datosPago.style.display = 'none';        
    }

    window.eliminarProducto = function (index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        if (carrito.length == 0) {
            vaciarCarrito();
        } else {
            mostrarCarrito();
        }
    };

    window.actualizarCantidad = function (index, nuevaCantidad) {
        const producto = carrito[index];
        nuevaCantidad = parseInt(nuevaCantidad);

        if (nuevaCantidad < 1) {
            alert('La cantidad mínima es 1.');
            mostrarCarrito();
            return;
        }

        console.log(nuevaCantidad, producto.stock);

        if (nuevaCantidad > producto.stock) {
            alert(`No puedes agregar más de ${producto.stock} unidades. Stock disponible: ${producto.stock}`);
            mostrarCarrito();
            return;
        }

        producto.cantidad = nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    };

    function mostrarCarrito() {
        carritoContenido.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            total += producto.precio * producto.cantidad;

            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
                <p>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <div>
                    <label for="cantidad-${index}">Cantidad:</label>
                    <input type="number" id="cantidad-${index}" value="${producto.cantidad}" min="1" 
                        onchange="actualizarCantidad(${index}, this.value)">
                </div>                
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            carritoContenido.appendChild(productoDiv);
        });

        totalCarritoMonto.textContent = total.toFixed(2);
    }

    mostrarCarrito();

    pagarBtn.addEventListener('click', () => {
        const total = parseFloat(totalCarritoMonto.textContent);
        if (total > 0) {
            alert(`Total a pagar: $${total.toFixed(2)}\nGracias por tu compra!`);
            localStorage.removeItem('carrito');
            carritoContenido.innerHTML = '<p>Tu compra ha sido realizada con exito.</p>';
            totalCarritoMonto.textContent = '0.00';
            pagarBtn.disabled = true;
            datosPago.style.display = 'none';
        }
    });
});
