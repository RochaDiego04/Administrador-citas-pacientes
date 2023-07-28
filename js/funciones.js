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

/******************************** BD ************/
export let DB;

export function baseDatos() {
    window.onload = () => {
        crearDB();
    }
}

function crearDB() {
    // Crear base de datos version 1.0
    const crearDB = window.indexedDB.open('citas',1);

    // Si hay error
    crearDB.onerror = function(){
        console.log('Hubo un error');
    };

    // Si sale todo bien
    crearDB.onsuccess = function(){
        console.log('Base de datos creada');

        DB = crearDB.result;
        // mostrar citas en el HTML cuando indexDB está listo
        ui.imprimirCitas(); 
    };

    // Definir el schema
    crearDB.onupgradeneeded = function(e){
        const db = e.target.result;
        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        // Definir las columnas
        objectStore.createIndex('mascota','mascota', {unique: false});
        objectStore.createIndex('propietario','propietario', {unique: false});
        objectStore.createIndex('telefono','telefono', {unique: false});
        objectStore.createIndex('fecha','fecha', {unique: false});
        objectStore.createIndex('hora','hora', {unique: false});
        objectStore.createIndex('sintomas','sintomas', {unique: false});
        objectStore.createIndex('id','id', {unique: true});

        console.log('Database creada y lista');
    }
}

/******************************** FIN DE BD ************/


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
        // Nuevo Registro

        // Generar id único
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Insertar registro en IndexDb
        const transaction = DB.transaction(['citas'], 'readwrite');
        
        // Habilitar el objectstore
        const objectStore = transaction.objectStore('citas');

        // Insertar en la base de datos
        objectStore.add(citaObj);

        transaction.oncomplete = function() {
            console.log('Cita agregada');
            
            // Mensaje de agregado correctamente
            ui.imprimirAlerta('Se agregó la cita correctamente');
        }
    }
    // Reiniciando el objeto
    reiniciarObjeto();

    // Limpiar campos del formulario
    formulario.reset();

    ui.imprimirCitas();
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
    ui.imprimirCitas();
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