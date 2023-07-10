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

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crear div
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Agregar clase al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }
        else{
            divMensaje.classList.add('alert-success');
        }

        // Agregar texto al div
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        
        // Eliminar despues de cierto tiempo
        setTimeout(() => {
            divMensaje.remove();
        }, 2500);
    }
}

ui = new UI();
const administrarCitas = new Citas();

// Event Listeners
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

const citaObj = { // Necesitan la propiedad name='' en el HTML.
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Funciones
function datosCita(e) { // Asignar valor del input a la propiedad del ObjCita
    citaObj[e.target.name] = e.target.value.trim(); 
}

// Valida y agrega nueva cita a la clase Citas
function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion de citaObj
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    // Generar id único
    citaObj.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});

    // Reiniciando el objeto
    reiniciarObjeto();

    // Limpiar campos del formulario
    formulario.reset();
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}