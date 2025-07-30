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

function sortear() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';

  const indice = Math.floor(Math.random() * lista.length);
  const ganador = lista[indice];

  resultado.innerHTML = `<li class="success">🎉 ${ganador} ha sido sorteado como tu amigo secreto 🎁</li>`;

  document.getElementById('btnReiniciar').disabled = false;
  document.getElementById('btnSortear').disabled = true;
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
}

function actualizarBotones() {
  const sortearBtn = document.getElementById('btnSortear');
  sortearBtn.disabled = lista.length < 2;
}
