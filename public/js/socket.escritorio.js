// Comando para establecer la conexión
var socket = io();

// Obtener todos los parámetros opcionales que vienen en la barra del URL
var searchParams = new URLSearchParams(window.location.search);
//console.log(searchParams.has('escritorio'));

// El throw sería como un return, pero no estoy en ninguna función, de ahí el throw
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
//console.log(escritorio);

var label = document.querySelector('small');
document.querySelector('h1').textContent = 'Escritorio ' + escritorio;

document.querySelector('button').addEventListener('click', function () {
  socket.emit('atenderTicket', { escritorio: escritorio }, function (resp) {
    if (resp === 'No hay tickets') {
      label.textContent = resp;
      alert(resp);
      return;
    }

    label.textContent = 'Ticket ' + resp.numero;
  });
});

socket.on('connect', function () {
  console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
  console.log('Desconectado del servidor');
});
