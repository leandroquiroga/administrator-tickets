

const socket = io();

socket.on('current-state', (payload) => {

  let ticket_one    = document.getElementById('ticket_one');
  let ticket_two    = document.getElementById('ticket_two');
  let ticket_three  = document.getElementById('ticket_three');
  let ticket_four   = document.getElementById('ticket_four');
  let desk_one      = document.getElementById('desk_one');
  let desk_two      = document.getElementById('desk_two');
  let desk_three    = document.getElementById('desk_three');
  let desk_four     = document.getElementById('desk_four');

  // Check if exists tickets 
  if(payload.length === 0 ){
    if(ticket_one){
      ticket_one.textContent = 'No hay tickets'
      desk_one.textContent = '-'
    }
    if(ticket_two){
      ticket_two.textContent = 'No hay tickets'
      desk_two.textContent = '-'
    }
    if(ticket_three){
      ticket_three.textContent = 'No hay tickets'
      desk_three.textContent = '-'
    }
    if(ticket_four){
      ticket_four.textContent = 'No hay tickets'
      desk_four.textContent = '-'
    }
    return;
  };

  const [ticketOne, ticketTwo, ticketThree, ticketFour] = payload;

  // Check if it ticket exists
  if(ticket_one){
    ticket_one.textContent = `Ticket: ${ticketOne.number}`
    desk_one.textContent = ticketOne.desk
  }
  if(ticket_two){
    ticket_two.textContent = `Ticket: ${ticketTwo.number}`
    desk_two.textContent = ticketTwo.desk
  }
  if(ticket_three){
    ticket_three.textContent = `Ticket: ${ticketThree.number}`
    desk_three.textContent = ticketThree.desk
  }
  if(ticket_four){
    ticket_four.textContent = `Ticket: ${ticketFour.number}`
    desk_four.textContent = ticketFour.desk
  }
  
});