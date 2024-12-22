document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get('productoId')); 
    const reseñasContainer = document.getElementById('reseñasContainer');
  
    fetch('./js/resenas.json')
      .then(response => response.json())
      .then(data => {
        const productoReseñas = data.find(reseña => reseña.productoId === productoId);
  
        if (productoReseñas) {
          productoReseñas.reseñas.forEach(reseña => {
            const reseñaDiv = document.createElement('div');
            reseñaDiv.classList.add('reseña');
            reseñaDiv.innerHTML = `
              <h3>${reseña.nombre}</h3>
              <p>${reseña.comentario}</p>
              <p>${reseña.fecha}</p>
            `;
            reseñasContainer.appendChild(reseñaDiv);
          });
        } else {
          reseñasContainer.innerHTML = "<p>No hay reseñas para el producto seleccionado.</p>";
        }
      })
      .catch(error => {
        console.error('Error al cargar las reseñas:', error);
      });
  });
  