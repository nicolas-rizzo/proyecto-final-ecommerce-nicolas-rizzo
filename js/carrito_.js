document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoCantidad = document.getElementById('carritoCantidad');
    
    function actualizarCantidadCarrito() {
        const cantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        carritoCantidad.textContent = cantidad;
    }

    actualizarCantidadCarrito();

    const carritoBtn = document.getElementById('carritoBtn');
    carritoBtn.addEventListener('click', () => {
      window.location.href = './carrito.html';
    });
});
