const ControlTickets = require("../models/controlTickets");
// const {Socket} = require('socket.io');

// const socket = new Socket();

const controlTickets = new ControlTickets();

const socketController = (socket) => {

  // Events emits when a user online
  socket.emit('last-ticket', controlTickets.lastTicket);
  socket.emit('current-state', controlTickets.arrayLastTickets);
  socket.emit('pendient-ticket', controlTickets.arrayTickets.length);

  
  socket.on('next-ticket', (payload, callback) => {
    const nextTicket = controlTickets.nextTicket();

    callback(nextTicket);
    
    socket.broadcast.emit('pendient-ticket', controlTickets.arrayTickets.length);
    socket.broadcast.emit('next-ticket', payload)
  });
  
  // socket.on('pendient-ticket', (payload, cal))
  socket.on('listen-ticket', (payload, callback) => {
    const { desk } = payload;
    
    socket.broadcast.emit('current-state', controlTickets.arrayLastTickets);
    socket.broadcast.emit('pendient-ticket', controlTickets.arrayTickets.length);
    
    // Check if it isn't a desk
    if(!desk){
      return callback({
        ok:false,
        msg: 'Desk required'
      });
    };
    
    // Take a ticket
    const ticket = controlTickets.assistClients(desk);
    
    // Check if it isn't a ticket a queue
    if(!ticket){
      return callback({
        ok:false,
        msg: 'There is not more ticket in queue',
      })
    }

    // Send callback with assigned ticket
    callback({
      ok: true,
      msg: ticket
    });
  });
};

module.exports = {
  socketController,
}