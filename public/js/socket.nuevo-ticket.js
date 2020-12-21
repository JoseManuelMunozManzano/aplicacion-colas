// Comando para establecer la conexión
var socket = io();

var label = document.getElementById('lblNuevoTicket');

socket.on('connect', function () {
  console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
  console.log('Desconectado del servidor');
});

socket.on('estadoActual', function (resp) {
  label.textContent = resp.actual;
});

document.querySelector('button').addEventListener('click', function () {
  socket.emit('siguienteTicket', null, function (siguienteTicket) {
    label.textContent = siguienteTicket;
  });
});
