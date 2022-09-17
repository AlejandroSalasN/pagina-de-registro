let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let telefono = document.getElementById("telefono");

document.querySelector('.confirmar').addEventListener('click', () => {
    if (nombre.value.length > 0 && apellido.value.length > 0 && telefono.value.length === 8) {
        document.getElementById('1').classList.add('mostrar');
        document.getElementById('2').classList.remove('mostrar');
    } else {
        alert('Introducir número de celular válido.');
    }

});