import { eliminarCita, cargarEdicion, DB} from "../funciones.js";
import { listadoCitas, heading } from "../selectores.js"

class UI {

    constructor({citas}){
        this.textoHeading(citas);
    }

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

    imprimirCitas() {
        
        this.limpiarHTML();

        // Leer contenido de la base de datos
        const objectStore = DB.transaction('citas').objectStore('citas');

        const fnTextoHeading = this.textoHeading; // Almacenar la funcion en una variable
        
        const total = objectStore.count()
        total.onsuccess = function(){
            fnTextoHeading(total.result); // Cambiar el texto del h2 si hay citas en la bd
        }
        
        objectStore.openCursor().onsuccess = function(e){ // OpenCursor itera sobre los elementos de la bd
            
            const cursor = e.target.result;
            
            if(cursor) {
                const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;
                const divCita = document.createElement('DIV');
                divCita.classList.add('cita', 'p-3');
                divCita.dataset.id = id;
    
                // Scripting de los elementos de la cita
                const mascotaParrafo = document.createElement('H2');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.textContent = mascota;
    
                const propietarioParrafo = document.createElement('P');
                propietarioParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Propietario: </span>${propietario}
                `;
                const telefonoParrafo = document.createElement('P');
                telefonoParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Teléfono: </span>${telefono}
                `;
                const fechaParrafo = document.createElement('P');
                fechaParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Fecha: </span>${fecha}
                `;
                const horaParrafo = document.createElement('P');
                horaParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Hora: </span>${hora}
                `;
                const sintomasParrafo = document.createElement('P');
                sintomasParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Síntomas: </span>${sintomas}
                `;
    
                // Boton para eliminar la cita
                const btnEliminar = document.createElement('BUTTON');
                btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
                btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    
                btnEliminar.onclick = () => eliminarCita(id);
    
                // Boton para editar la cita
                const btnEditar = document.createElement('BUTTON');
                btnEditar.classList.add('btn', 'btn-info');
                btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>';
    
                btnEditar.onclick = () => cargarEdicion(cita);
    
                // Agregar los parrafos al divCita
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);
                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnEditar);
    
                // Agregar al HTML
                listadoCitas.appendChild(divCita);

                // Ve al siguiente elemento
                cursor.continue();
            }
        }
    }

    textoHeading(resultado) {
        if(resultado > 0){
            heading.textContent = "Administra tus Citas";
        }
        else {
            heading.textContent = "No hay Citas, comienza creando una";
        }
    }

    limpiarHTML() {
        while(listadoCitas.firstChild) {
            listadoCitas.removeChild(listadoCitas.firstChild);
        }
    }
}

export default UI;