const ControlTickets = require("../models/controlTickets");
// const {Socket} = require('socket.io');

// const socket = new Socket();

const controlTickets = new ControlTickets();

const socketController = (socket) => {
  console.log('Client Online', socket.id);

  socket.on('disconnect', () => {
    console.log('Client Offline', socket.id);
  });

  socket.on('next-ticket', (payload, callback) => {

    const nextTicket = controlTickets.nextTicket();

    callback(nextTicket);

    socket.broadcast.emit('next-ticket', payload)
  });
};

module.exports = {
  socketController,
}