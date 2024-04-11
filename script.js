import {obtenerUsuarios} from './ajax.js';

const ready = () => {
    console.log('DOM is ready');
}

document.addEventListener("DOMContentLoaded", ready);

const body = document.getElementById("body");
const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("fname");
const inputEdad = document.getElementById("lnumber");
const botonEnviar = document.getElementById("enviar");
const botonBorrar = document.getElementById("borrar");
const botonColor = document.getElementById("cambiarColor");
const contenidoUsuarios = document.getElementById("usuarios");

const enviar = async () => {
    hayNumero();
    mayorEdad();
    // Obtener usuarios solo si el formulario es válido
    if (inputNombre.value.trim() && inputEdad.value >= 18) {
        try {
            const usuarios = await obtenerUsuarios();
            const usuarioBuscado = usuarios.find(
                usuario => usuario.nombre.toLowerCase() === inputNombre.value.trim().toLowerCase()
            );
            if (usuarioBuscado) {
                mostrarUsuario(usuarioBuscado);
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    }
}

const mayorEdad = () => {
    if (inputEdad.value < 18 && inputEdad.value != "") {
        inputEdad.value = "";
        inputEdad.style.border = '1px solid red';
        const p = document.createElement('p');
        p.innerText = 'Pon una edad mayor a 18';
        p.style.color = 'red';
        formulario.appendChild(p);
        console.log(inputEdad);
    } else {
        console.log(inputEdad.value);
    }
}

const hayNumero = () => {
    const nombre = inputNombre
        .value
        .toString();
    let tieneNumero = false;

    for (let i = 0; i < nombre.length; i++) {
        if (!isNaN(parseInt(nombre[i]))) {
            tieneNumero = true;
            break;
        }
    }
    if (tieneNumero) {
        inputNombre.value = "";
        inputNombre.style.border = '1px solid red';
        const p = document.createElement('p');
        p.innerText = 'Pon un nombre real';
        p.style.color = 'red';
        formulario.appendChild(p);
    } else {
        console.log(nombre);
    }
}

const mostrarUsuario = (usuario) => {
    contenidoUsuarios.innerHTML = '';
    const usuarioElement = document.createElement('div');
    usuarioElement.innerHTML = `<p>${usuario.nombre}, ${usuario.edad}, ${usuario.email}</p>`;
    contenidoUsuarios.appendChild(usuarioElement);
}

// Boton Enviar
botonEnviar.addEventListener("click", () => {
    enviar();
});

//Boton Borrar
const borrar = () => {
    inputNombre.value = "";
    inputEdad.value = "";
    contenidoUsuarios.innerHTML = '';

}
botonBorrar.addEventListener("click", () => {
    borrar();
});

//Boton Color
const cambiarColor = () => {
    if (body.style.backgroundColor == "red") {
        body.style.backgroundColor = "green";
    } else {
        body.style.backgroundColor = "red";
    }
}
botonColor.addEventListener("click", () => {
    cambiarColor();
});
