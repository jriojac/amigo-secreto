// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let lista = [];

function agregar() {
  const input = document.getElementById('amigo');
  const mensaje = document.getElementById('mensaje');
  const nombre = input.value.trim();
  mensaje.textContent = '';

  if (nombre === '') {
    mensaje.textContent = 'Por favor, ingrese el nombre.';
    input.value = '';
    return;
  }

  
  const soloTexto = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
  if (!soloTexto.test(nombre)) {
    mensaje.textContent = 'Por favor, ingrese solo letras. No se permiten números ni símbolos.';
    input.value = '';
    return;
  }

  const nombreNormalizado = nombre.toLowerCase();

  const duplicado = lista.some(item => item.toLowerCase() === nombreNormalizado);
  if (duplicado) {
    mensaje.textContent = 'Nombre repetido, ingrese un nuevo nombre.';
    input.value = '';
    return;
  }

  lista.push(nombre);
  input.value = '';
  mostrar();
  actualizarBotones();
}

function mostrar() {
  const listaUl = document.getElementById('listaAmigos');
  const contador = document.getElementById('contador');
  listaUl.innerHTML = '';

  lista.forEach((nombre, index) => {
    const item = document.createElement('li');
    item.textContent = `${index + 1}. ${nombre}`;
    listaUl.appendChild(item);
  });

  contador.textContent = `Total de participantes: ${lista.length}`;
}


function reiniciarJuego() {
  lista = [];
  document.getElementById('listaAmigos').innerHTML = '';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('mensaje').textContent = '';
  document.getElementById('contador').textContent = '';
  document.getElementById('amigo').value = '';
  document.getElementById('amigo').focus();

  document.getElementById('btnReiniciar').disabled = true;
  document.getElementById('btnSortear').disabled = true;

  document.getElementById('estadoJuego').textContent = '';
  desbloquearInput();

    listaNombres.length = 0; // vaciar
    mostrarLista();
    btnSorteo.disabled = true;
    btnReiniciar.disabled = true;
    btnIniciar.disabled = true; // si lo usas después


}

function actualizarBotones() {
  const sortearBtn = document.getElementById('btnSortear');
  sortearBtn.disabled = lista.length < 2;
}
function bloquearInput() {
  document.getElementById('amigo').disabled = true;
  document.querySelector('.button-add').disabled = true;
}

function desbloquearInput() {
  document.getElementById('amigo').disabled = false;
  document.querySelector('.button-add').disabled = false;
}

function sortear() {
  const resultado = document.getElementById('resultado');
  const mensaje = document.getElementById('mensaje');
  resultado.innerHTML = '';
  mensaje.textContent = '';

  if (lista.length < 2) {
    mensaje.textContent = 'Debe haber al menos 2 participantes para sortear.';
    return;
  }

  // Crear una copia y mezclar los nombres
  let receptores = [...lista];
  let donantes = [...lista];

  // Algoritmo de mezcla para evitar que alguien se asigne a sí mismo
  do {
    receptores = receptores.sort(() => Math.random() - 0.5);
  } while (receptores.some((nombre, i) => nombre === donantes[i]));

  // Mostrar resultados
  for (let i = 0; i < donantes.length; i++) {
    const li = document.createElement('li');
    li.classList.add('success');
    li.textContent = `🎁 ${donantes[i]} → ${receptores[i]}`;
    resultado.appendChild(li);
  }

  document.getElementById('btnReiniciar').disabled = false;
  document.getElementById('btnSortear').disabled = true;

  document.getElementById('estadoJuego').textContent = 
    '🔒 Sorteo finalizado, clic en "Iniciar nuevo juego". 🔒';
  
  bloquearInput();
        
  // Después del sorteo: desactivar sorteo y activar reinicio
        
  btnSorteo.disabled = true;
  btnReiniciar.disabled = false;
       

}

// Obtener referencias a los botones
const btnSorteo = document.getElementById('btnSorteo');
const btnIniciar = document.getElementById('btnIniciar');
const btnReiniciar = document.getElementById('btnReiniciar');
const inputNombre = document.getElementById('nombre');
const listaNombres = [];


// Estado inicial
btnSorteo.disabled = true;
btnIniciar.disabled = true;
btnReiniciar.disabled = true;


// Función para agregar nombre
function agregarNombre() {
    const nombre = inputNombre.value.trim();
    if (nombre) {
        listaNombres.push(nombre);
        mostrarLista();

        // Si hay 2 nombres o más, habilitar sorteo
        if (listaNombres.length >= 2) {
            btnSorteo.disabled = false;
        }
    }
    inputNombre.value = '';
}


// Función para mostrar lista en pantalla (adaptar a tu HTML)
function mostrarLista() {
    const lista = document.getElementById('listaNombres');
    lista.innerHTML = '';
    listaNombres.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        lista.appendChild(li);
    });
}




