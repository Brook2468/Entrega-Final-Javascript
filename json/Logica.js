// Simulador de creacion de PJ //
let palaMin = 8;
let palaMax = 11;
let druidaMin = 6;
let druidaMax = 8;
let magoMin = 5;
let magoMax = 7;
let promedioPala = 9.5;
let promedioDruida = 7;
let promedioMago = 6;
let personajesCreados = [];

let mejorPaladinNombre = ""
let mejorPaladinPromedio = ""
let mejorDruidaNombre = ""
let mejorDruidaPromedio = ""
let mejorMagoNombre = ""
let mejorMagoPromedio = ""



cargarMejoresPersonajes();



function personaje(nombre, clase, nivel) {
    this.nombre = nombre;
    this.clase = clase;
    this.nivel = nivel;
    this.promedio = 0;

    if(nivel > 47){
        this.nivel = 47;
    }


    this.vida = calcularVida(this.clase, this.nivel);

    if(clase == 1){
        this.promedio = promedioPala;
    }
    else if(clase == 2){
        this.promedio = promedioDruida;
    }
    else{
        this.promedio = promedioMago;
    }

}


function crearPersonaje(){
    let nombre =  document.getElementById("nombre").value;
    let clase = document.getElementById("clases").value;
    let nivel = document.getElementById("nivel").value;
    actualizarNombre(nombre);

    let pj = new personaje(nombre,clase,nivel);
    personajesCreados.push(pj);

    guardarMejorPersonaje(pj);
}


// Flujo de aplicacion: Entrada de datos del usuario invocada desde HTML //
// Flujo de aplicacion: Procesamiento y calculo de datos //

function calcularVida(clase, nivel) {
    let vidaFinal = 0;

    if (clase == 1) {
        for (let index = 0; index < nivel; index++) {
            vidaFinal += Math.floor(Math.random() * (palaMax + 1 - palaMin) + palaMin);
        }
    } else if (clase == 2) {
        for (let index = 0; index < nivel; index++) {
            vidaFinal += Math.floor(Math.random() * (druidaMax + 1 - druidaMin) + druidaMin);
        }
    } else {
        for (let index = 0; index < nivel; index++) {
            vidaFinal += Math.floor(Math.random() * (magoMax + 1 - magoMin) + magoMin);
        }
    }
    // Flujo de aplicacion: Notificacion de resultados en forma de salida.
    cambiarVida(vidaFinal);

    notificacionCreacion()

    return vidaFinal;
}
function cambiarVida(vidaTotal) {
    document.getElementById("vidaTotal").innerHTML = vidaTotal;
    
}
// Flujo de aplicacion: Procesamiento y calculo de datos //
function actualizarNombre(nombre) {
    
    document.getElementById("nombrePj").innerHTML = nombre;
    
}


function cargarMejoresPersonajes(){
    if (typeof(Storage) !== "undefined") {
    
        mejorPaladinNombre = localStorage.getItem("palaNombre");
        mejorPaladinPromedio = localStorage.getItem("palaPromedio");
        mejorDruidaNombre = localStorage.getItem("druidaNombre");
        mejorDruidaPromedio = localStorage.getItem("druidaPromedio");
        mejorMagoNombre = localStorage.getItem("magoNombre");
        mejorMagoPromedio = localStorage.getItem("magoPromedio");


    } 
    else {
    console.log("El Storage no esta disponible en esta version del Navegador");
    }
}



function guardarMejorPersonaje(personaje){
    if (typeof(Storage) !== "undefined") {
        
        vida = personaje.vida;
        nombre = personaje.nombre;
        clase = personaje.clase;
        nivel = personaje.nivel;
        promedio = vida / nivel;

        if (clase == 1) {
           if(promedio > Number(mejorPaladinPromedio)){
            localStorage.setItem("palaNombre",nombre);
            localStorage.setItem("palaPromedio",promedio.toString());

            mejorPaladinNombre = nombre;
            mejorPaladinPromedio = promedio;
           }
        } else if (clase == 2) {
            if(promedio > Number(mejorDruidaPromedio)){
                localStorage.setItem("druidaNombre",nombre);
                localStorage.setItem("druidaPromedio",promedio.toString());
    
                mejorDruidaNombre = nombre;
                mejorDruidaPromedio = promedio;
               }
        } else {
            if(promedio > Number(mejorMagoPromedio)){
                localStorage.setItem("magoNombre",nombre);
                localStorage.setItem("magoPromedio",promedio.toString());
    
                mejorMagoNombre = nombre;
                mejorMagoPromedio = promedio;
            }
        }
    } 
    else {
    console.log("El Storage no esta disponible en esta version del Navegador");
    }
}


function personajeConMasVida(){

    if(personajesCreados.length == 0){ return;}

    let maxVida = 0;
    let pjMaxVida = null
   personajesCreados.forEach(pj => {
       if(pj.vida > maxVida){
           maxVida = pj.vida;
           pjMaxVida = pj;
       }
   });

   document.getElementById("pjMaxVida").innerHTML = maxVida;
   document.getElementById("pjMaxVidaNivel").innerHTML = pjMaxVida.nivel;
   
}

function MejoresPjsGuardados(){
    
    document.getElementById("mejorPaladinNombre").innerHTML = mejorPaladinNombre;
    document.getElementById("mejorPaladinPromedio").innerHTML = mejorPaladinPromedio; 
    document.getElementById("mejorDruidaNombre").innerHTML = mejorDruidaNombre;
    document.getElementById("mejorDruidaPromedio").innerHTML = mejorDruidaPromedio; 
    document.getElementById("mejorMagoNombre").innerHTML = mejorMagoNombre;
    document.getElementById("mejorMagoPromedio").innerHTML = mejorMagoPromedio; 
}
  
function notificacionCreacion(){
    Toastify({
        text: "Personaje creado!",
        duration: 2000,
        gravity:"top",
        position: "right"

    }).showToast();
}

//Formulario-Login//
const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});