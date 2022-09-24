const newTicket    = document.querySelector('#newTicket');
const buttonCreate = document.querySelector('#new-ticket'); 

const socket = io();

socket.on('connect', () => {
  newTicket.style.display = 'none';
  newTicket.style.display = '';
  buttonCreate.disabled = false;
});


socket.on('disconnect', () => {
  newTicket.style.display = 'none';
  newTicket.style.display = '';
  buttonCreate.disabled = true;

});


socket.on('last-ticket', (ticket) => {
  newTicket.textContent = `Ticket: ${ticket}`
});


buttonCreate.addEventListener('click', () => {
  
  socket.emit('next-ticket', null, (ticket) => {
    newTicket.textContent = ticket;
  });
});