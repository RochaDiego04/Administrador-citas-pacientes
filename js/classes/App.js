import { datosCita, nuevaCita, baseDatos } from '../funciones.js'

import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario
} from '../selectores.js';


class App {
    constructor(){
        this.initApp();
    }

    initApp(){
        baseDatos();

        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);
    
        formulario.addEventListener('submit', nuevaCita);
    }

}

export default App;