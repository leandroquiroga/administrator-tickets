const searchParams = new URLSearchParams(window.location.search);

// Checkeamos si el escrorio existe
if(!searchParams.has('escritorio')){
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
};

const desk = searchParams.get('escritorio');
const socket = io();

let titleDesk       = document.getElementById('desk');
let numberTikect    = document.getElementById('number_ticket');
let callTicket      = document.getElementById('call_ticket');
let alertMessage    = document.getElementById('alert_message')
let ticketMessage   = document.getElementById('ticket_text');
let pendientTicket = document.getElementById('pendients_ticket');

//  Hidden alert
alertMessage.style.display = 'none'

socket.on('connect', () => {
  callTicket.disabled = false;
});


socket.on('disconnect', () => {
  callTicket.disabled = true;
});


socket.on('last-ticket', (ticket) => {
  // numberTikect.textContent = `Ticket: ${ticket}`
});

socket.on('pendient-ticket', (pendientsTickets) => {
  if(pendientsTickets === 0){
    pendientTicket.style.display = 'none';
    alertMessage.style.display = '';
    return
  }
  pendientTicket.style.display = '';
  pendientTicket.textContent = pendientsTickets
});

callTicket.addEventListener('click', () => {
  socket.emit('pendient-ticket', (pendientsTickets) => {
    if(pendientsTickets === 0){
      pendientTicket.style.display = 'none';
      alertMessage.style.display = '';
      return
    };
    pendientTicket.style.display = '';
    pendientTicket.textContent = pendientsTickets
  });
  socket.emit('listen-ticket', {desk}, (payload) => {
    const { msg:{number} } = payload;
    const { ok } = payload;

    // Capture a error
    if(!ok) {
      ticketMessage.textContent = 'Todos los tikects atendidos'
      alertMessage.style.display = '';
      return
    }

    ticketMessage.textContent = `Ticket: ${number}`;
  });
});