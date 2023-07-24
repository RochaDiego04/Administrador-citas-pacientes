import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario
} from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando;

const citaObj = { // Necesitan la propiedad name='' en el HTML.
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e) { // Asignar valor del input a la propiedad del ObjCita
    citaObj[e.target.name] = e.target.value.trim(); 
}


// Valida y agrega nueva cita a la clase Citas
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion de citaObj
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        // Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj});
        
        // Regresar texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando = false;
    }
    else {
        // Generar id único
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agregó la cita correctamente');
    }
    // Reiniciando el objeto
    reiniciarObjeto();

    // Limpiar campos del formulario
    formulario.reset();

    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Mostrar un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar citas
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value  = propietario;
    telefonoInput.value  = telefono;
    fechaInput.value  = fecha;
    horaInput.value  = hora;
    sintomasInput.value  = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}