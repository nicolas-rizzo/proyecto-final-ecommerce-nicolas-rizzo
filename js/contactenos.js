function validateEmail(email) {
     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombres');
        if (!nombre.value.trim()) {
            alert('El campo nombre es obligatorio');
            return;
        }

        const apellido = document.getElementById('apellido');
        if (!apellido.value.trim()) {
            alert('El campo apellido es obligatorio');
            return;
        }

        const email = document.getElementById('email');
        if (!email.value.trim() || !validateEmail(email.value)) {
            alert('El campo email es obligatorio y debe ser un email valido');
            return;
        }

        const mensaje = document.getElementById('mensaje');
        if (!mensaje.value.trim()) {
            alert('El campo mensaje es obligatorio');
            return;
        }

        //Implementar una función que verifique si todos los
        //campos del formulario de contacto están
        //completos, mostrando un mensaje en la consola
        console.log('todos los campos estan llenos');

        alert('Mensaje enviado con exito!');
        form.submit();
    });
});
