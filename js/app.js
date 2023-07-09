// Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput  = document.querySelector('#propietario');
const telefonoInput  = document.querySelector('#telefono');
const fechaInput  = document.querySelector('#fecha');
const horaInput  = document.querySelector('#hora');
const sintomasInput  = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const listadoCitas = document.querySelector('#listado-citas');


// Event Listeners
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
}

const CitaObj = { // Necesitan la propiedad name='' en el HTML.
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Funciones
function datosCita(e) { // Asignar valor del input a la propiedad del ObjCita
    CitaObj[e.target.name] = e.target.value; 
    console.log(CitaObj);
}